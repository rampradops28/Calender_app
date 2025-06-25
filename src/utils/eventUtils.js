import { parseDate, isSameDateAs } from './dateUtils';

export const getEventsForDate = (events, date) => {
  return events.filter(event => isSameDateAs(parseDate(event.date), date));
};

export const sortEventsByTime = (events) => {
  return [...events].sort((a, b) => {
    const timeA = a.startTime.split(':').map(Number);
    const timeB = b.startTime.split(':').map(Number);
    if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
    return timeA[1] - timeB[1];
  });
};

export const getTypeColor = (type) => {
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

export const getOverlapColor = (hasOverlap) => {
  return hasOverlap ? 'bg-red-100 text-red-800 border-red-300 ring-2 ring-red-200' : '';
};

export const formatEventTime = (startTime, endTime) => {
  const format = (timeStr) => {
    if (typeof timeStr !== 'string' || !timeStr.includes(':')) return 'Invalid time';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  return `${format(startTime)} - ${format(endTime)}`;
};

export const hasOverlappingEvents = (events) => {
  if (events.length <= 1) return false;
  const sorted = sortEventsByTime(events);
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];
    const currentEnd = getEventEnd(current);
    const nextStart = getEventStart(next);
    if (currentEnd > nextStart) return true;
  }
  return false;
};

export const getOverlappingEvents = (events) => {
  const overlaps = [];
  const byDate = {};
  events.forEach(event => {
    if (!byDate[event.date]) byDate[event.date] = [];
    byDate[event.date].push(event);
  });
  Object.values(byDate).forEach(dayEvents => {
    if (hasOverlappingEvents(dayEvents)) {
      const sorted = sortEventsByTime(dayEvents);
      for (let i = 0; i < sorted.length - 1; i++) {
        const current = sorted[i];
        const next = sorted[i + 1];
        const currentEnd = getEventEnd(current);
        const nextStart = getEventStart(next);
        if (currentEnd > nextStart) {
          if (!overlaps.find(e => e.id === current.id)) overlaps.push(current);
          if (!overlaps.find(e => e.id === next.id)) overlaps.push(next);
        }
      }
    }
  });
  return overlaps;
};

export const isEventOverlapping = (event, allEvents) => {
  if (!allEvents) return false;
  const overlaps = getOverlappingEvents(allEvents);
  return overlaps.some(e => e.id === event.id);
};

const getEventStart = (event) => {
  const [hours, minutes] = event.startTime.split(':').map(Number);
  return hours * 60 + minutes;
};

const getEventEnd = (event) => {
  const [hours, minutes] = event.endTime.split(':').map(Number);
  return hours * 60 + minutes;
};

export const sortEventsByDate = (events) => {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
};