import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,  
  parseISO,
  isSameDay,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  isValid
} from 'date-fns';

export const getNextDay = (date) => addDays(date, 1);
export const getPreviousDay = (date) => subDays(date, 1);
export const getNextWeek = (date) => addWeeks(date, 1);
export const getPreviousWeek = (date) => subWeeks(date, 1);

export const getCalendarDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
};

export const formatDate = (date, formatString) => {
  // Check if date is valid
  if (!date || !isValid(date)) {
    console.error('Invalid date provided to formatDate:', date);
    return 'Invalid Date';
  }
  
  try {
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error, 'Date:', date, 'Format:', formatString);
    return 'Invalid Date';
  }
};

export const isCurrentMonth = (date, currentMonth) => {
  return isSameMonth(date, currentMonth);
};

export const isCurrentDay = (date) => {
  return isToday(date);
};

export const getNextMonth = (date) => {
  return addMonths(date, 1);
};

export const getPreviousMonth = (date) => {
  return subMonths(date, 1);
};

export const parseDate = (dateString) => {
  try {
    const parsed = parseISO(dateString);
    if (!isValid(parsed)) {
      console.error('Invalid date string:', dateString);
      return new Date();
    }
    return parsed;
  } catch (error) {
    console.error('Error parsing date:', error, 'Date string:', dateString);
    return new Date();
  }
};

export const isSameDateAs = (date1, date2) => {
  return isSameDay(date1, date2);
};

export const getWeekDays = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};