import React from 'react';
import { X, AlertTriangle, Clock } from 'lucide-react';
import { formatEventTime } from '../utils/eventUtils';

const OverlapPopup = ({ overlappingEvents, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-red-50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Overlapping Events</h2>
              <p className="text-sm text-red-700">These events have times that overlap.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 space-y-3 max-h-80 overflow-y-auto">
          {overlappingEvents.map((event) => (
            <div key={event.id} className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{event.title}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatEventTime(event.startTime, event.endTime)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverlapPopup;