import React from 'react';
import { format } from 'date-fns';
import EventItem from './EventItem';

const DayView = ({ currentDate, events, onEventClick, allEvents }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === currentDate.toDateString();
  });

  return (
    <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          {format(currentDate, 'EEEE, MMMM d')}
        </h2>
      </div>
      <div className="h-[600px] overflow-y-auto">
        {hours.map((hour) => (
          <div key={hour} className="flex border-b">
            <div className="w-16 text-right pr-2 pt-1 text-sm text-gray-500">
              {format(new Date().setHours(hour), 'h a')}
            </div>
            <div className="flex-1 border-l p-2">
              {dayEvents
                .filter(event => {
                  const eventHours = parseInt(event.startTime.split(':')[0]);
                  return eventHours === hour;
                })
                .map(event => (
                  <EventItem
                    key={event.id}
                    event={event}
                    allEvents={allEvents}
                    onClick={() => onEventClick(event)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;