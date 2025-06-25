import React from 'react';
import Calendar from './components/Calendar';

function MainApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-6xl h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-5xl text-indigo-700 mb-2 mt-10 flex items-center justify-center gap-2 font-poppins">
            <span>Event Calendar</span>
          </h1> 
             
        </div>
        <div className="w-full flex-1">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default MainApp;