import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import {
  getCalendarDays,
  formatDate,
  getNextMonth,
  getPreviousMonth,
  getWeekDays,
  getNextDay,
  getPreviousDay,
  getNextWeek,
  getPreviousWeek
} from '../utils/dateUtils';
import CalendarDay from './CalendarDay';
import EventModal from './EventModal';
import ConflictModal from './ConflictModal';
import { getConflictingEvents } from '../utils/eventUtils';
import eventsData from '../data/events.json';
import ViewSwitcher from './ViewSwitcher';
import DayView from './DayView';
import WeekView from './WeekView';
import ScheduleView from './ScheduleView';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conflictingEvents, setConflictingEvents] = useState([]);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [direction, setDirection] = useState('next');
  const [currentView, setCurrentView] = useState('month');
  const [animationState, setAnimationState] = useState('idle');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const loadedEvents = eventsData;
    setEvents(loadedEvents);

    const conflicts = getConflictingEvents(loadedEvents);
    if (conflicts.length > 0) {
      setConflictingEvents(conflicts);
      setIsConflictModalOpen(true);
    }
  }, []);

  const calendarDays = getCalendarDays(currentDate);
  const weekDays = getWeekDays();

  const handlePrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('prev');
    setAnimationState('slide-out-top');
    
    setTimeout(() => {
      if (currentView === 'month') {
        setCurrentDate(getPreviousMonth(currentDate));
      } else if (currentView === 'week') {
        setCurrentDate(getPreviousWeek(currentDate));
      } else if (currentView === 'day') {
        setCurrentDate(getPreviousDay(currentDate));
      }
      setAnimationState('slide-in-bottom');
      
      setTimeout(() => {
        setAnimationState('idle');
        setIsAnimating(false);
      }, 600);
    }, 400);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('next');
    setAnimationState('slide-out-bottom');
    
    setTimeout(() => {
      if (currentView === 'month') {
        setCurrentDate(getNextMonth(currentDate));
      } else if (currentView === 'week') {
        setCurrentDate(getNextWeek(currentDate));
      } else if (currentView === 'day') {
        setCurrentDate(getNextDay(currentDate));
      }
      setAnimationState('slide-in-top');
      
      setTimeout(() => {
        setAnimationState('idle');
        setIsAnimating(false);
      }, 600);
    }, 400);
  };

  const handleGoToToday = () => {
    if (isAnimating) return;
    
    const today = new Date();
    const isFuture = today > currentDate;
    
    setIsAnimating(true);
    setDirection(isFuture ? 'next' : 'prev');
    setAnimationState(isFuture ? 'slide-out-bottom' : 'slide-out-top');
    
    setTimeout(() => {
      setCurrentDate(today);
      setAnimationState(isFuture ? 'slide-in-top' : 'slide-in-bottom');
      
      setTimeout(() => {
        setAnimationState('idle');
        setIsAnimating(false);
      }, 600);
    }, 400);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseConflictModal = () => {
    setIsConflictModalOpen(false);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const getAnimationClass = () => {
    switch (animationState) {
      case 'slide-in-bottom':
        return 'calendar-slide-in-bottom';
      case 'slide-in-top':
        return 'calendar-slide-in-top';
      case 'slide-out-top':
        return 'calendar-slide-out-top';
      case 'slide-out-bottom':
        return 'calendar-slide-out-bottom';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-screen flex flex-col gap-4 lg:gap-0 lg:flex-row">
        {/* Calendar section */}
        <section className="w-full flex flex-col min-h-0 bg-white p-2 sm:p-4 lg:w-[70%] lg:p-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex-shrink-0 rounded-lg   mb-2">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">
                  {formatDate(currentDate, 'MMMM yyyy')}
                </h1>
                <p className="text-blue-100 text-sm">
                  {formatDate(new Date(), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-3">
              <ViewSwitcher currentView={currentView} onViewChange={handleViewChange} />
              <button
                onClick={handlePrevious}
                disabled={isAnimating}
                className={`btn-advanced p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors custom-focus ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleGoToToday}
                disabled={isAnimating}
                className={`btn-advanced px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium custom-focus ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Go to today"
              >
                Today
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className={`btn-advanced p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors custom-focus ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className={`flex-1 flex flex-col min-h-0 relative overflow-hidden ${getAnimationClass()}`}>
            {currentView === 'month' && (
              <>
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 flex-shrink-0">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="p-4 text-center text-sm font-semibold text-gray-600 uppercase"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 flex-1 min-h-0">
                  {calendarDays.map((day, index) => (
                    <CalendarDay
                      key={day.toString()}
                      date={day}
                      currentMonth={currentDate}
                      events={events}
                      onEventClick={handleEventClick}
                      isFirstRow={index < 7}
                    />
                  ))}
                </div>
              </>
            )}
            {currentView === 'day' && <DayView currentDate={currentDate} events={events} onEventClick={handleEventClick} allEvents={events} />}
            {currentView === 'week' && <WeekView currentDate={currentDate} events={events} onEventClick={handleEventClick} allEvents={events} />}
          </div>

          {isModalOpen && selectedEvent && (
            <EventModal
              event={selectedEvent}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              allEvents={events}
            />
          )}
        </section>
        {/* Divider for desktop */}
        <div className="hidden lg:block h-full w-px bg-gray-200 shadow-md"></div>
        {/* Schedule section */}
        <section className="w-full flex flex-col bg-gray-50 h-[400px] lg:h-full overflow-y-auto p-2 sm:p-4 lg:w-[30%] lg:p-4">
          <ScheduleView events={events} onEventClick={handleEventClick} />
        </section>
      </div>

      <ConflictModal
        conflictingEvents={conflictingEvents}
        isOpen={isConflictModalOpen}
        onClose={handleCloseConflictModal}
      />
    </>
  );
};

export default Calendar;