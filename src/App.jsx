import React from 'react';
import Calendar from './components/Calendar';

function MainApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            My Calendar
          </h1>
          <p className="text-gray-600">
            Simple and clean calendar for your daily planning
          </p>
        </div>
        
        <div className="w-full h-screen">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default MainApp;