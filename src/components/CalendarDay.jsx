import React, { useState } from 'react';
import { formatDate, isCurrentMonth, isCurrentDay } from '../utils/dateUtils';
import {
  getEventsForDate,
  sortEventsByTime,
  hasOverlappingEvents
} from '../utils/eventUtils';
import EventBox from './EventItem';

function CalendarCell({
  date,
  currentMonth,
  events,
  onEventClick,
  isFirstRow
}) {
  const [showEventList, setShowEventList] = useState(false);
  const dayEvents = sortEventsByTime(getEventsForDate(events, date));
  const isToday = isCurrentDay(date);
  const isInCurrentMonth = isCurrentMonth(date, currentMonth);
  const hasOverlap = hasOverlappingEvents(dayEvents);
  const visibleEvents = dayEvents.slice(0, 2);
  const hiddenEventsCount = dayEvents.length - visibleEvents.length;

  return (
    <div
      className={`
        calendar-day h-full p-2 border border-gray-200 bg-white hover:bg-gray-50 
        transition-colors duration-200 relative group flex flex-col
        ${!isFirstRow ? 'border-t-0' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <button
          className={`inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none ${isToday ? 'pulse-glow' : ''} ${isToday ? 'bg-blue-600 text-white' : isInCurrentMonth ? 'text-gray-900 hover:bg-gray-100' : 'text-gray-400'}`}
          onClick={() => setShowEventList(true)}
          aria-label={`Show events for ${formatDate(date, 'MMMM d')}`}
        >
          {formatDate(date, 'd')}
        </button>
        {dayEvents.length > 0 && (
          <span className="ml-1 w-2 h-2 bg-red-500 rounded-full sm:hidden inline-block" />
        )}
        {hasOverlap && (
          <div
            className="w-2 h-2 bg-red-500 rounded-full animate-pulse hidden sm:block"
            title="Schedule conflicts detected"
          />
        )}
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto min-h-0 custom-scrollbar hidden sm:block">
        {visibleEvents.map((event, index) => (
          <div key={event.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <EventBox
              event={event}
              allEvents={events}
              onClick={() => onEventClick(event)}
            />
          </div>
        ))}

        {hiddenEventsCount > 0 && (
          <button
            className="text-xs text-blue-600 font-medium px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer w-full text-left"
            onClick={() => setShowEventList(true)}
            aria-label={`Show ${hiddenEventsCount} more events`}
          >
            +{hiddenEventsCount} more
          </button>
        )}
      </div>

      {dayEvents.length === 0 && isInCurrentMonth && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex">
          <div className="text-xs text-gray-400 font-medium">No events</div>
        </div>
      )}
      {showEventList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Events for {formatDate(date, 'MMMM d')}</h3>
              <button
                onClick={() => setShowEventList(false)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close event list"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            {dayEvents.length === 0 ? (
              <div className="text-gray-500 text-center">No events</div>
            ) : (
              <ul className="space-y-2">
                {dayEvents.map(event => (
                  <li key={event.id}>
                    <button
                      className="w-full text-left p-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setShowEventList(false);
                        onEventClick(event);
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-gray-500">{event.startTime} - {event.endTime}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarCell;
