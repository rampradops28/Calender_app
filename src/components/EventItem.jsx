import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatEventTime, isEventConflicting } from '../utils/eventUtils';

const EventItem = ({ event, allEvents, onClick }) => {
  const hasConflict = isEventConflicting(event, allEvents);

  return (
    <div
      onClick={onClick}
      className={`
        px-2 py-1 rounded-md text-xs cursor-pointer border relative
        hover:shadow-md transform hover:scale-105 transition-all duration-200
        ${hasConflict ? 'ring-2 ring-amber-400 bg-amber-50 border-amber-400' : 'bg-blue-50 border-blue-200'}
      `}
      title={`${event.title} - ${formatEventTime(event.startTime, event.endTime)}${hasConflict ? ' (CONFLICT)' : ''}`}
    >
      <div className="flex items-center space-x-1">
        <Clock className="h-3 w-3 flex-shrink-0 text-blue-500" />
        <span className="font-medium truncate text-blue-800">{event.title}</span>
        {hasConflict && (
          <AlertTriangle className="h-3 w-3 text-amber-600 flex-shrink-0" />
        )}
      </div>
      <div className="text-xs opacity-75 mt-0.5">
        {formatEventTime(event.startTime, event.endTime)}
      </div>
    </div>
  );
};

export default EventItem;