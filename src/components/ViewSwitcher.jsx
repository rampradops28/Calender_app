import React from 'react';
import { ChevronDown } from 'lucide-react';

const ViewSwitcher = ({ currentView, onViewChange }) => {
  return (
    <div className="relative">
      <select
        value={currentView}
        onChange={(e) => onViewChange(e.target.value)}
        className="appearance-none bg-white/10 hover:bg-white/20 text-white font-medium py-2 pl-4 pr-10 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
        <option value="schedule">Schedule</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
};

export default ViewSwitcher;