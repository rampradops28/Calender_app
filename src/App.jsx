import React from 'react';
import Calendar from './components/Calendar';

function MainApp() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-7xl px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-indigo-700 font-poppins font-semibold">
            Event Calendar
          </h1>
        </div>
        <Calendar />
      </div>
    </div>
  );
}

export default MainApp;
