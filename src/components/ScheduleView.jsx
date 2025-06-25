import React, { useState } from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { formatDate, parseDate } from '../utils/dateUtils';
import { formatEventTime, sortEventsByDate, isEventConflicting } from '../utils/eventUtils';

const ScheduleView = ({ events, onEventClick }) => {
  const [search, setSearch] = useState("");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = sortEventsByDate(events).filter(event => {
    const eventDate = parseDate(event.date);
    return eventDate >= today;
  });

  // Filter events by search
  const filteredEvents = search.trim()
    ? upcomingEvents.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(search.toLowerCase()))
      )
    : upcomingEvents;

  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const dateKey = event.date;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {});

  if (filteredEvents.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex-shrink-0">
          <h2 className="text-lg font-semibold">Schedule</h2>
        </div>
        <div className="p-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 text-sm mb-4"
          />
          <div className="flex-1 flex items-center justify-center text-center text-gray-500">
            No events found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex-shrink-0 rounded-lg">
        <h2 className="text-lg font-semibold">Schedule</h2>
      </div>
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 text-sm"
        />
        <p className="text-gray-600 text-xs mt-2">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} scheduled
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([date, dayEvents]) => {
            const eventDate = parseDate(date);
            const isToday = formatDate(eventDate, 'yyyy-MM-dd') === formatDate(new Date(), 'yyyy-MM-dd');
            const isTomorrow = formatDate(eventDate, 'yyyy-MM-dd') === formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd');

            return (
              <div key={date} className="space-y-3">
                <div className="flex items-center space-x-3 pb-2 border-b border-gray-200">
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${isToday ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}
                  `}>
                    {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : formatDate(eventDate, 'EEE')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(eventDate, 'MMMM d, yyyy')}
                  </div>
                </div>

                <div className="space-y-3">
                  {dayEvents.map((event) => {
                    const hasConflict = isEventConflicting(event, events);

                    return (
                      <div
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={`w-full mx-auto my-1 bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 ${
                          hasConflict ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between mb-1 md:mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: event.color }} />
                              <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-base md:text-lg">
                                  {event.title}
                                </h3>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1 text-xs md:text-sm text-gray-600">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatEventTime(event.startTime, event.endTime)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {hasConflict && (
                              <div className="flex items-center space-x-1 text-red-500 text-xs font-medium">
                                <AlertCircle className="h-4 w-4" />
                                <span>Conflict</span>
                              </div>
                            )}
                          </div>

                          {event.description && (
                            <div className="text-xs md:text-sm text-gray-600 bg-gray-50 rounded-lg p-2 md:p-3">
                              {event.description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
