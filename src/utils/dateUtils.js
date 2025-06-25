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
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
};

export const formatDate = (date, formatString) => {
  if (!date || !isValid(date)) {
    return 'Invalid Date';
  }
  try {
    return format(date, formatString);
  } catch (error) {
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
      return new Date();
    }
    return parsed;
  } catch (error) {
    return new Date();
  }
};

export const isSameDateAs = (date1, date2) => {
  return isSameDay(date1, date2);
};

export const getWeekDays = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};