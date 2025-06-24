
import React from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { formatDate, parseDate } from '../utils/dateUtils';
import { formatEventTime, sortEventsByDate, isEventConflicting } from '../utils/eventUtils';

const ScheduleView = ({ events, onEventClick }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = sortEventsByDate(events).filter(event => {
    const eventDate = parseDate(event.date);
    return eventDate >= today;
  });

  const groupedEvents = upcomingEvents.reduce((groups, event) => {
    const dateKey = event.date;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {});

  if (upcomingEvents.length === 0) {
    return (
      <div className="p-12 text-center">
        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Events</h3>
        <p className="text-gray-500">You're all caught up! No events scheduled for the future.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Events</h2>
        <p className="text-gray-600 text-sm">
          {upcomingEvents.length} event{upcomingEvents.length !== 1 ? 's' : ''} scheduled
        </p>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => {
          const eventDate = parseDate(date);
          const isToday = formatDate(eventDate, 'yyyy-MM-dd') === formatDate(new Date(), 'yyyy-MM-dd');
          const isTomorrow = formatDate(eventDate, 'yyyy-MM-dd') === formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd');

          return (
            <div key={date} className="space-y-3">
              <div className="flex items-center space-x-3 pb-2 border-b border-gray-100">
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
                      className={`bg-white rounded-xl border ${hasConflict ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group`}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: event.color }} />
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {event.title}
                              </h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
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
                          <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
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
  );
};

export default ScheduleView;
