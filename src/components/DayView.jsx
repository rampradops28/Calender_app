import React, { useState } from 'react';
import { format } from 'date-fns';
import EventBox from './EventItem';

const DayPanel = ({ currentDate, events, onEventClick, allEvents }) => {
  const [showEventList, setShowEventList] = useState(false);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === currentDate.toDateString();
  });

  return (
    <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden h-full">
      <div className="p-2 sm:p-4 border-b flex items-center">
        <button
          className="text-sm sm:text-lg font-semibold focus:outline-none"
          onClick={() => setShowEventList(true)}
          aria-label={`Show events for ${format(currentDate, 'MMMM d')}`}
        >
          {format(currentDate, 'EEEE, MMMM d')}
        </button>
        {/* Red dot as indicator only, not clickable */}
        {dayEvents.length > 0 && (
          <span className="ml-2 w-2 h-2 bg-red-500 rounded-full sm:hidden inline-block" />
        )}
      </div>
      {/* Event list: hidden on mobile, visible on sm+ */}
      <div className="h-full overflow-y-auto hidden sm:block">
        {hours.map((hour) => {
          const hourEvents = dayEvents.filter(event => {
            const eventHours = parseInt(event.startTime.split(':')[0]);
            return eventHours === hour;
          });
          const visibleEvents = hourEvents.slice(0, 2);
          const hiddenEventsCount = hourEvents.length - visibleEvents.length;
          return (
            <div key={hour} className="flex border-b h-12 sm:h-16 min-h-0">
            <div className="w-12 sm:w-16 text-right pr-1 sm:pr-2 pt-1 text-xs sm:text-sm text-gray-500">
              {format(new Date().setHours(hour), 'h a')}
            </div>
              <div className="flex-1 border-l py-0.5 sm:py-1 px-0.5 sm:px-1 min-h-0 flex flex-col justify-center">
                {visibleEvents.map(event => (
                  <EventBox
                    key={event.id}
                    event={event}
                    allEvents={allEvents}
                    onClick={() => onEventClick(event)}
                  />
                ))}
                {hiddenEventsCount > 0 && (
                  <button
                    className="text-xs text-blue-600 font-medium px-1 sm:px-2 py-0.5 sm:py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer w-full text-left mt-0.5"
                    onClick={() => setShowEventList(true)}
                    aria-label={`Show ${hiddenEventsCount} more events for this hour`}
                  >
                    +{hiddenEventsCount} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Simple modal for mobile event list */}
      {showEventList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-2">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Events for {format(currentDate, 'MMMM d')}</h3>
              <button
                onClick={() => setShowEventList(false)}
                className="p-1 sm:p-2 rounded hover:bg-gray-100"
                aria-label="Close event list"
              >
                <span className="text-lg sm:text-xl">&times;</span>
              </button>
            </div>
            {dayEvents.length === 0 ? (
              <div className="text-gray-500 text-center">No events</div>
            ) : (
              <ul className="space-y-1 sm:space-y-2">
                {dayEvents.map(event => (
                  <li key={event.id}>
                    <button
                      className="w-full text-left p-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setShowEventList(false);
                        onEventClick(event);
                      }}
                    >
                      <div className="font-medium text-sm sm:text-base">{event.title}</div>
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
};

export default DayPanel;