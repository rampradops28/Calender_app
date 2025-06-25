import React from 'react';
import { ChevronDown } from 'lucide-react';

const ViewSwitcher = ({ currentView, onViewChange }) => {
  return (
    <div className="relative">
      <select
        value={currentView}
        onChange={(e) => onViewChange(e.target.value)}
        className="appearance-none bg-white/10 text-white font-medium py-2 pl-3 pr-8 rounded-lg transition-colors cursor-pointer focus:outline-none hover:bg-white/20"
      >
        <option value="month" className="bg-white-800 text-black">Month</option>
        <option value="week" className="bg-white-800 text-black">Week</option>
        <option value="day" className="bg-white-800 text-black">Day</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default ViewSwitcher;