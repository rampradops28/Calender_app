import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import CalendarDay from './CalendarDay';
import dayjs from 'dayjs';

const CalendarGrid = ({ currentMonth, events, onEventClick }) => {
  const [direction, setDirection] = useState('next');

  const calendarDays = generateDaysForMonth(currentMonth); // your logic here

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.format('YYYY-MM')}
          initial={{ x: direction === 'next' ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 'next' ? -300 : 300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-7 border-t border-l"
        >
          {calendarDays.map((date, index) => (
            <CalendarDay
              key={date.toString()}
              date={date}
              currentMonth={currentMonth}
              events={events}
              onEventClick={onEventClick}
              isFirstRow={index < 7}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CalendarGrid;
