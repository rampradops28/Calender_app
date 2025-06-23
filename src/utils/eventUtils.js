import { parseDate, isSameDateAs } from './dateUtils';

export const getEventsForDate = (events, date) => {
  return events.filter(event => 
    isSameDateAs(parseDate(event.date), date)
  );
};

export const sortEventsByTime = (events) => {
  return [...events].sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    
    if (timeA[0] !== timeB[0]) {
      return timeA[0] - timeB[0];
    }
    return timeA[1] - timeB[1];
  });
};

export const getEventTypeColor = (type) => {
  const colors = {
    work: 'bg-blue-100 text-blue-800 border-blue-200',
    personal: 'bg-purple-100 text-purple-800 border-purple-200',
    health: 'bg-red-100 text-red-800 border-red-200',
    fitness: 'bg-green-100 text-green-800 border-green-200',
    social: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    travel: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };
  
  return colors[type] || colors.personal;
};

export const getConflictEventColor = (hasConflict) => {
  return hasConflict 
    ? 'bg-red-100 text-red-800 border-red-300 ring-2 ring-red-200' 
    : '';
};

export const formatEventTime = (time, duration) => {
  const [hours, minutes] = time.split(':').map(Number);
  const startTime = new Date();
  startTime.setHours(hours, minutes, 0, 0);
  
  const endTime = new Date(startTime.getTime() + duration * 60000);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

export const hasOverlappingEvents = (events) => {
  if (events.length <= 1) return false;
  
  const sortedEvents = sortEventsByTime(events);
  
  for (let i = 0; i < sortedEvents.length - 1; i++) {
    const current = sortedEvents[i];
    const next = sortedEvents[i + 1];
    
    const currentEnd = getEventEndTime(current);
    const nextStart = getEventStartTime(next);
    
    if (currentEnd > nextStart) {
      return true;
    }
  }
  
  return false;
};

export const getConflictingEvents = (events) => {
  const conflictingEvents = [];
  const eventsByDate = {};
  
  // Group events by date
  events.forEach(event => {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = [];
    }
    eventsByDate[event.date].push(event);
  });
  
  // Check for conflicts within each date
  Object.values(eventsByDate).forEach(dayEvents => {
    if (hasOverlappingEvents(dayEvents)) {
      const sortedEvents = sortEventsByTime(dayEvents);
      
      for (let i = 0; i < sortedEvents.length - 1; i++) {
        const current = sortedEvents[i];
        const next = sortedEvents[i + 1];
        
        const currentEnd = getEventEndTime(current);
        const nextStart = getEventStartTime(next);
        
        if (currentEnd > nextStart) {
          if (!conflictingEvents.find(e => e.id === current.id)) {
            conflictingEvents.push(current);
          }
          if (!conflictingEvents.find(e => e.id === next.id)) {
            conflictingEvents.push(next);
          }
        }
      }
    }
  });
  
  return conflictingEvents;
};

export const isEventConflicting = (event, allEvents) => {
  const conflictingEvents = getConflictingEvents(allEvents);
  return conflictingEvents.some(conflictEvent => conflictEvent.id === event.id);
};

const getEventStartTime = (event) => {
  const [hours, minutes] = event.time.split(':').map(Number);
  return hours * 60 + minutes;
};

const getEventEndTime = (event) => {
  return getEventStartTime(event) + event.duration;
};