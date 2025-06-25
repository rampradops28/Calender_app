import React from 'react';
import { formatDate, parseDate } from '../utils/dateUtils';

function EventItem({ event, allEvents, onClick }) {
  // Create proper Date objects from the event data
  const eventDate = parseDate(event.date);
  const startDateTime = new Date(`${event.date}T${event.startTime}`);
  const endDateTime = new Date(`${event.date}T${event.endTime}`);
  
  const startTime = formatDate(startDateTime, 'HH:mm');
  const endTime = formatDate(endDateTime, 'HH:mm');
  
  // Check if this event conflicts with others
  const conflictingEvents = allEvents.filter(otherEvent => 
    otherEvent.id !== event.id &&
    otherEvent.date === event.date &&
    ((otherEvent.startTime < event.endTime && otherEvent.endTime > event.startTime))
  );

  const hasConflict = conflictingEvents.length > 0;

  return (
    <div
      className={`
        event-item px-1 py-0.5 rounded text-xs cursor-pointer transition-all duration-300
        ${hasConflict 
          ? 'bg-red-100 border border-red-300 text-red-800 hover:bg-red-200' 
          : 'bg-blue-100 border border-blue-300 text-blue-800 hover:bg-blue-200'
        }
        ${hasConflict ? 'pulse-glow' : ''}
        mb-0.5
      `}
      onClick={onClick}
      title={`${event.title} (${startTime} - ${endTime})`}
    >
      <div className="font-medium truncate text-xs leading-tight">{event.title}</div>
      <div className="text-[10px] opacity-75 leading-tight">
        {startTime} - {endTime}
      </div>
      {hasConflict && (
        <div className="text-[10px] font-medium mt-0.5 text-red-600 leading-tight">
          ⚠️ Conflict
        </div>
      )}
    </div>
  );
}

export default EventItem;