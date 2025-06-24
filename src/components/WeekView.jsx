import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import EventItem from './EventItem';

const WeekView = ({ currentDate, events, onEventClick, allEvents }) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-8">
        <div className="p-2 border-b border-r"></div>
        {days.map((day) => (
          <div key={day} className="p-2 border-b text-center">
            <p className="text-sm">{format(day, 'EEE')}</p>
            <p className="text-lg font-semibold">{format(day, 'd')}</p>
          </div>
        ))}
      </div>
      <div className="h-[600px] overflow-y-auto">
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
                {hours.map((hour) => (
                  <div key={hour} className="h-16 border-b p-1">
                    {events
                      .filter(event => {
                        const eventDate = new Date(event.date);
                        const eventHours = parseInt(event.time.split(':')[0]);
                        return eventDate.toDateString() === day.toDateString() && eventHours === hour;
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
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;