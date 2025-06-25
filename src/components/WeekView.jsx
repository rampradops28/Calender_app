import React, { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import EventItem from './EventItem';

const WeekView = ({ currentDate, events, onEventClick, allEvents }) => {
  const [modalDay, setModalDay] = useState(null);
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Helper to get events for a day
  const getEventsForDay = (day) =>
    events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === day.toDateString();
    });

  return (
    <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden h-full">
      <div className="grid grid-cols-8">
        <div className="p-2 border-b border-r"></div>
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const hasEvents = dayEvents.length > 0;
          return (
            <div key={day} className="p-2 border-b text-center flex flex-col items-center">
              <p className="text-sm">{format(day, 'EEE')}</p>
              <div className="flex items-center">
                <button
                  className="text-lg font-semibold focus:outline-none"
                  onClick={() => setModalDay(day)}
                  aria-label={`Show events for ${format(day, 'MMM d')}`}
                >
                  {format(day, 'd')}
                </button>
                {/* Red dot as indicator only, not clickable */}
                {hasEvents && (
                  <span className="ml-1 w-2 h-2 bg-red-500 rounded-full sm:hidden inline-block" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Event grid: hidden on mobile, visible on sm+ */}
      <div className="h-full overflow-y-auto hidden sm:block">
        <div className="grid grid-cols-8 h-full">
          <div className="col-span-1">
            {hours.map((hour) => (
              <div key={hour} className="h-16 border-r text-right pr-2 pt-1 text-sm text-gray-500">
                {format(new Date().setHours(hour), 'h a')}
              </div>
            ))}
          </div>
          <div className="col-span-7 grid grid-cols-7">
            {days.map((day) => (
              <div key={day} className="border-l">
                {hours.map((hour) => {
                  const hourEvents = events.filter(event => {
                    const eventDate = new Date(event.date);
                    const eventHours = parseInt(event.startTime.split(':')[0]);
                    return eventDate.toDateString() === day.toDateString() && eventHours === hour;
                  });
                  const visibleEvents = hourEvents.slice(0, 2);
                  const hiddenEventsCount = hourEvents.length - visibleEvents.length;
                  return (
                    <div key={hour} className="h-16 border-b py-1 px-1 min-h-0 flex flex-col justify-center">
                      {visibleEvents.map(event => (
                        <EventItem
                          key={event.id}
                          event={event}
                          allEvents={allEvents}
                          onClick={() => onEventClick(event)}
                        />
                      ))}
                      {hiddenEventsCount > 0 && (
                        <button
                          className="text-xs text-blue-600 font-medium px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer w-full text-left mt-0.5"
                          onClick={() => setModalDay(day)}
                          aria-label={`Show ${hiddenEventsCount} more events for this hour`}
                        >
                          +{hiddenEventsCount} more
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Simple modal for mobile event list */}
      {modalDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Events for {format(modalDay, 'MMMM d')}</h3>
              <button
                onClick={() => setModalDay(null)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close event list"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            {getEventsForDay(modalDay).length === 0 ? (
              <div className="text-gray-500 text-center">No events</div>
            ) : (
              <ul className="space-y-2">
                {getEventsForDay(modalDay).map(event => (
                  <li key={event.id}>
                    <button
                      className="w-full text-left p-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setModalDay(null);
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
};

export default WeekView;