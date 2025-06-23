import React from 'react';
import { X, Clock, Calendar, User, AlertTriangle } from 'lucide-react';
import { formatEventTime, getEventTypeColor, isEventConflicting } from '../utils/eventUtils';
import { formatDate, parseDate } from '../utils/dateUtils';

const EventModal = ({ event, allEvents, isOpen, onClose }) => {
  if (!isOpen) return null;

  const colorClasses = getEventTypeColor(event.type);
  const eventDate = parseDate(event.date);
  const hasConflict = isEventConflicting(event, allEvents);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'work':
        return '💼';
      case 'personal':
        return '👤';
      case 'health':
        return '🏥';
      case 'fitness':
        return '💪';
      case 'social':
        return '👥';
      case 'travel':
        return '✈️';
      default:
        return '📅';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getTypeIcon(event.type)}</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{event.title}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                {hasConflict && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Conflict
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Conflict Warning */}
          {hasConflict && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Schedule Conflict</span>
              </div>
              <p className="text-xs text-red-600 mt-1">
                This event overlaps with other events on the same day.
              </p>
            </div>
          )}

          {/* Date and Time */}
          <div className="flex items-center space-x-3 text-gray-700">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <div className="font-medium">{formatDate(eventDate, 'EEEE, MMMM d, yyyy')}</div>
              <div className="text-sm text-gray-500">
                {formatEventTime(event.time, event.duration)}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center space-x-3 text-gray-700">
            <Clock className="h-5 w-5 text-green-500" />
            <div>
              <div className="font-medium">Duration</div>
              <div className="text-sm text-gray-500">
                {event.duration} minutes
              </div>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="flex items-start space-x-3 text-gray-700">
              <User className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <div className="font-medium">Description</div>
                <div className="text-sm text-gray-500 mt-1">
                  {event.description}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;