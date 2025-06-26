import React from 'react';
import { ChevronDown } from 'lucide-react';

const ViewSwitcher = ({ currentView, onViewChange }) => {
  return (
    <div className="relative">
      <select
        value={currentView}
        onChange={(e) => onViewChange(e.target.value)}
        className="appearance-none bg-white/10 text-white font-medium py-1 sm:py-2 pl-2 sm:pl-3 pr-6 sm:pr-8 rounded-lg transition-colors cursor-pointer focus:outline-none hover:bg-white/20 text-xs sm:text-sm"
      >
        <option value="month" className="bg-white-800 text-black">Month</option>
        <option value="week" className="bg-white-800 text-black">Week</option>
        <option value="day" className="bg-white-800 text-black">Day</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 sm:px-2 text-white">
        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
      </div>
    </div>
  );
};

export default ViewSwitcher;