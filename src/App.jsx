import React from 'react';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Google Calendar Clone
          </h1>
          <p className="text-gray-600 text-lg">
            Professional calendar application with conflict detection
          </p>
        </div>
        
        <Calendar />
          

{/*          
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { type: 'work', label: 'Work', icon: '💼' },
              { type: 'personal', label: 'Personal', icon: '👤' },
              { type: 'health', label: 'Health', icon: '🏥' },
              { type: 'fitness', label: 'Fitness', icon: '💪' },
              { type: 'social', label: 'Social', icon: '👥' },
              { type: 'travel', label: 'Travel', icon: '✈️' },
            ].map(({ type, label, icon }) => (
              <div key={type} className="flex items-center space-x-2 text-sm">
                <span className="text-lg">{icon}</span>
                <span className="font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;