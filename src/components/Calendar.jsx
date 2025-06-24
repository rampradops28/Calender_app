import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    const loadedEvents = eventsData;
    setEvents(loadedEvents);

    // Check for conflicts and show notification
    const conflicts = getConflictingEvents(loadedEvents);
    if (conflicts.length > 0) {
      setConflictingEvents(conflicts);
      setIsConflictModalOpen(true);
    }
  }, []);

  const calendarDays = getCalendarDays(currentDate);
  const weekDays = getWeekDays();

  const handlePrevious = () => {
    setDirection('prev');
    if (currentView === 'month') {
      setCurrentDate(getPreviousMonth(currentDate));
    } else if (currentView === 'week') {
      setCurrentDate(getPreviousWeek(currentDate));
    } else if (currentView === 'day') {
      setCurrentDate(getPreviousDay(currentDate));
    }
  };

  const handleNext = () => {
    setDirection('next');
    if (currentView === 'month') {
      setCurrentDate(getNextMonth(currentDate));
    } else if (currentView === 'week') {
      setCurrentDate(getNextWeek(currentDate));
    } else if (currentView === 'day') {
      setCurrentDate(getNextDay(currentDate));
    }
  };

  const handleGoToToday = () => {
    setDirection(new Date() > currentDate ? 'next' : 'prev');
    setCurrentDate(new Date());
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
  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
     
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
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

            <div className="flex items-center space-x-2">
            <ViewSwitcher currentView={currentView} onViewChange={handleViewChange} />
              <button
                onClick={handlePrevious}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleGoToToday}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 font-medium text-white"
                aria-label="Go to today"
              >
                Today
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentView + currentDate.toString()}
              initial={{
                y: direction === 'next' ? 30 : -30,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              exit={{
                y: direction === 'next' ? -30 : 30,
                opacity: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.4, 0, 1, 1],
                },
              }}
            >
              {currentView === 'month' && (
                <>
                  <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                    {weekDays.map((day) => (
                      <div
                        key={day}
                        className="p-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
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
              {currentView === 'schedule' && <ScheduleView events={events} onEventClick={handleEventClick} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Event Modal */}
        {isModalOpen && selectedEvent && (
          <EventModal
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            allEvents={events}
          />
        )}
      </div>

      {/* Conflict Modal */}
      <ConflictModal
        conflictingEvents={conflictingEvents}
        isOpen={isConflictModalOpen}
        onClose={handleCloseConflictModal}
      />
    </>
  );
};

export default Calendar;