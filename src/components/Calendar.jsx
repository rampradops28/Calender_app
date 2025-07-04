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
import CalendarCell from './CalendarDay';
import EventPopup from './EventModal';
import ViewSwitcher from './ViewSwitcher';
import DayPanel from './DayView';
import WeekPanel from './WeekView';
import ScheduleView from './ScheduleView';
import eventsData from '../data/events.json';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState('next');
  const [currentView, setCurrentView] = useState('month');
  const [animationState, setAnimationState] = useState('idle');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const loadedEvents = eventsData;
    setEvents(loadedEvents);
  }, []);

  const calendarDays = getCalendarDays(currentDate);
  const weekDays = getWeekDays();

  // Gradient colors for each day of the week
  const dayColors = [
    'from-purple-400 to-pink-400', // Monday
    'from-blue-400 to-cyan-400',   // Tuesday
    'from-green-400 to-emerald-400', // Wednesday
    'from-yellow-400 to-orange-400', // Thursday
    'from-red-400 to-pink-400',    // Friday
    'from-indigo-400 to-purple-400', // Saturday
    'from-teal-400 to-blue-400'    // Sunday
  ];

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
      }, 1400);
    }, 1100);
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
      }, 1400);
    }, 1100);
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
      }, 1400);
    }, 1100);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-screen flex flex-col gap-2 sm:gap-4 lg:gap-0 lg:flex-row">
        {/* Calendar section */}
        <section className="w-full flex flex-col min-h-0 bg-white p-2 sm:p-4 lg:w-[70%] lg:p-6 relative justify-between h-[60%] lg:h-full max-h-full">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 sm:p-4 flex-shrink-0 rounded-lg mb-2">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold">
                  {formatDate(currentDate, 'MMMM yyyy')}
                </h1>
                <p className="text-blue-100 text-xs sm:text-sm">
                  {formatDate(new Date(), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-2 sm:space-x-3 mt-2 sm:mt-0">
              <ViewSwitcher currentView={currentView} onViewChange={handleViewChange} />
              <button
                onClick={handlePrevious}
                disabled={isAnimating}
                className={`btn-advanced p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors custom-focus ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={handleGoToToday}
                disabled={isAnimating}
                className={`btn-advanced px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium custom-focus text-xs sm:text-sm ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Go to today"
              >
                Today
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className={`btn-advanced p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors custom-focus ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
          </div>
        </div>

          {/* Only animate the month view */}
          {currentView === 'month' ? (
        <div className={`flex-1 flex flex-col min-h-0 relative overflow-hidden ${getAnimationClass()} max-h-full`}>
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 flex-shrink-0">
                {weekDays.map((day, index) => {
                  const gradientClass = dayColors[index];
                  const isToday = day.toLowerCase() === formatDate(new Date(), 'EEE').toLowerCase();
                  
                  return (
                    <div
                      key={day}
                      className={`p-2 sm:p-4 text-center text-xs sm:text-sm font-semibold text-gray-600 uppercase relative group cursor-pointer transition-all duration-300 ${isToday ? 'text-blue-600' : ''}`}
                    >
                      {/* Background gradient on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-all duration-300 ease-out rounded-lg`}></div>
                      
                      {/* Text with hover effects */}
                      <span className={`relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:font-bold ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                        {day}
                      </span>
                      
                      {/* Subtle glow effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-5 transition-all duration-500 ease-out rounded-lg blur-sm`}></div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-7 flex-1 min-h-0 max-h-full">
                {calendarDays.map((day, index) => (
                  <CalendarCell
                    key={day.toString()}
                    date={day}
                    currentMonth={currentDate}
                    events={events}
                    onEventClick={handleEventClick}
                    isFirstRow={index < 7}
                  />
                ))}
              </div>
        </div>
          ) : currentView === 'day' ? (
            <DayPanel currentDate={currentDate} events={events} onEventClick={handleEventClick} allEvents={events} />
          ) : currentView === 'week' ? (
            <WeekPanel currentDate={currentDate} events={events} onEventClick={handleEventClick} allEvents={events} />
          ) : null}

        {isModalOpen && selectedEvent && (
            <EventPopup
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
        <section className="w-full flex flex-col bg-gray-50 h-[40%] lg:h-full overflow-y-auto p-2 sm:p-4 lg:w-[30%] lg:p-4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <ScheduleView events={events} onEventClick={handleEventClick} />
        </section>
      </div>
    </>
  );
};

export default Calendar;