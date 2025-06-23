import React from 'react';
import { formatDate, isCurrentMonth, isCurrentDay } from '../utils/dateUtils';
import {
  getEventsForDate,
  sortEventsByTime,
  hasOverlappingEvents
} from '../utils/eventUtils';
import EventItem from './EventItem';

function CalendarDay({
  date,
  currentMonth,
  events,
  onEventClick,
  isFirstRow
}) {
  // Filter & sort events for this day
  const dayEvents = sortEventsByTime(getEventsForDate(events, date));

  const isToday = isCurrentDay(date);
  const isInCurrentMonth = isCurrentMonth(date, currentMonth);
  const hasOverlapping = hasOverlappingEvents(dayEvents);

  const visibleEvents = dayEvents.slice(0, 3);
  const hiddenEventsCount = dayEvents.length - visibleEvents.length;

  return (
    <div
      className={`
        min-h-[120px] p-2 border border-gray-200 bg-white hover:bg-gray-50 
        transition-colors duration-200 relative group
        ${!isFirstRow ? 'border-t-0' : ''}
      `}
    >
      {/* Day Header */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`
            inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full
            transition-all duration-200
            ${
              isToday
                ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200'
                : isInCurrentMonth
                ? 'text-gray-900 hover:bg-gray-100'
                : 'text-gray-400'
            }
          `}
        >
          {formatDate(date, 'd')}
        </span>

        {/* Overlapping Events Marker */}
        {hasOverlapping && (
          <div
            className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm"
            title="Schedule conflicts detected"
          />
        )}
      </div>

      {/* Events List */}
      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            allEvents={events}
            onClick={() => onEventClick(event)}
          />
        ))}

        {/* Show "+x more" if events exceed 3 */}
        {hiddenEventsCount > 0 && (
          <div className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors cursor-pointer">
            +{hiddenEventsCount} more
          </div>
        )}
      </div>

      {/* Optional hover effect for empty days */}
      {dayEvents.length === 0 && isInCurrentMonth && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="text-xs text-gray-400 font-medium">No events</div>
        </div>
      )}
    </div>
  );
}

export default CalendarDay;
