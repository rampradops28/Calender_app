import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { getCalendarDays, formatDate, getNextMonth, getPreviousMonth, getWeekDays } from '../utils/dateUtils';
import CalendarDay from './CalendarDay';
import EventModal from './EventModal';
import ConflictNotification from './ConflictNotification';
import { getConflictingEvents } from '../utils/eventUtils';
import eventsData from '../data/events.json';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conflictingEvents, setConflictingEvents] = useState([]);
  const [showConflictNotification, setShowConflictNotification] = useState(false);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    const loadedEvents = eventsData;
    setEvents(loadedEvents);

    // Check for conflicts and show notification
    const conflicts = getConflictingEvents(loadedEvents);
    if (conflicts.length > 0) {
      setConflictingEvents(conflicts);
      setShowConflictNotification(true);

      // Auto-hide notification after 8 seconds
      setTimeout(() => {
        setShowConflictNotification(false);
      }, 8000);
    }
  }, []);

  const calendarDays = getCalendarDays(currentDate);
  const weekDays = getWeekDays();

  const handlePreviousMonth = () => {
    setDirection('prev');
    setCurrentDate(getPreviousMonth(currentDate));
  };

  const handleNextMonth = () => {
    setDirection('next');
    setCurrentDate(getNextMonth(currentDate));
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

  const handleCloseConflictNotification = () => {
    setShowConflictNotification(false);
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
              <button
                onClick={handlePreviousMonth}
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
                onClick={handleNextMonth}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Week Days Header */}
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

        {/* Calendar Grid */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentDate.getMonth()}
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
              className="grid grid-cols-7"
            >
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

      {/* Conflict Notification */}
      {showConflictNotification && (
        <ConflictNotification
          conflictingEvents={conflictingEvents}
          onClose={handleCloseConflictNotification}
        />
      )}
    </>
  );
};

export default Calendar;