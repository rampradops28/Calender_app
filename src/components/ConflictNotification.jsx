import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { formatEventTime } from '../utils/eventUtils';

const ConflictNotification = ({ 
  conflictingEvents, 
  onClose 
}) => {
  if (conflictingEvents.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 bg-amber-50 border border-amber-200 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-in">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-800 mb-2">
            Schedule Conflict Detected
          </h3>
          <div className="space-y-2">
            {conflictingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-2 text-xs text-amber-700">
                <Clock className="h-3 w-3" />
                <span className="font-medium">{event.title}</span>
                <span>({formatEventTime(event.time, event.duration)})</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-amber-600 mt-2">
            These events have overlapping time slots.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-amber-600 hover:text-amber-800 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ConflictNotification;