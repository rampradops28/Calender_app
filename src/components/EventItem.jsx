import React from 'react';
import { formatDate, parseDate } from '../utils/dateUtils';

function EventBox({ event, allEvents, onClick }) {
  const eventDay = parseDate(event.date);
  const start = new Date(`${event.date}T${event.startTime}`);
  const end = new Date(`${event.date}T${event.endTime}`);
  
  const startTime = formatDate(start, 'HH:mm');
  const endTime = formatDate(end, 'HH:mm');
  
  const overlapping = allEvents.filter(e =>
    e.id !== event.id &&
    e.date === event.date &&
    (e.startTime < event.endTime && e.endTime > event.startTime)
  );

  const hasOverlap = overlapping.length > 0;

  return (
    <div
      className={`event-item px-1 py-0.5 rounded text-xs cursor-pointer transition-all duration-300 ${hasOverlap ? 'bg-red-100 border border-red-300 text-red-800 hover:bg-red-200 pulse-glow' : 'bg-blue-100 border border-blue-300 text-blue-800 hover:bg-blue-200'} mb-0.5`}
      onClick={onClick}
      title={`${event.title} (${startTime} - ${endTime})`}
    >
      <div className="font-medium truncate text-xs leading-tight">{event.title}</div>
      <div className="text-[10px] opacity-75 leading-tight">
        {startTime} - {endTime}
      </div>
      {hasOverlap && (
        <div className="text-[10px] font-medium mt-0.5 text-red-600 leading-tight">
          Overlap
        </div>
      )}
    </div>
  );
}

export default EventBox;