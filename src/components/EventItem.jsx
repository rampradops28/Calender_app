import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { getEventTypeColor, formatEventTime, isEventConflicting } from '../utils/eventUtils';

const EventItem = ({ event, allEvents, onClick }) => {
  const colorClasses = getEventTypeColor(event.type);
  const hasConflict = isEventConflicting(event, allEvents);

  return (
    <div
      onClick={onClick}
      className={`
        px-2 py-1 rounded-md text-xs cursor-pointer border relative
        hover:shadow-md transform hover:scale-105 transition-all duration-200
        ${colorClasses}
        ${hasConflict ? 'ring-2 ring-red-300 bg-red-50 border-red-300' : ''}
      `}
      title={`${event.title} - ${formatEventTime(event.time, event.duration)}${hasConflict ? ' (CONFLICT)' : ''}`}
    >
      <div className="flex items-center space-x-1">
        <Clock className="h-3 w-3 flex-shrink-0" />
        <span className="font-medium truncate">{event.title}</span>
        {hasConflict && (
          <AlertTriangle className="h-3 w-3 text-red-600 flex-shrink-0" />
        )}
      </div>
      <div className="text-xs opacity-75 mt-0.5">
        {event.time}
      </div>
    </div>
  );
};

export default EventItem;