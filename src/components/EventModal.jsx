import React from 'react';
import { X, Clock, MapPin, User, AlertTriangle } from 'lucide-react';
import { formatDate, parseDate } from '../utils/dateUtils';

const EventModal = ({ event, isOpen, onClose, allEvents }) => {
  if (!isOpen || !event) return null;

  // Create proper Date objects from the event data
  const eventDate = parseDate(event.date);
  const startDateTime = new Date(`${event.date}T${event.startTime}`);
  const endDateTime = new Date(`${event.date}T${event.endTime}`);
  
  // Check for conflicts
  const conflictingEvents = allEvents.filter(otherEvent => 
    otherEvent.id !== event.id &&
    otherEvent.date === event.date &&
    ((otherEvent.startTime < event.endTime && otherEvent.endTime > event.startTime))
  );

  const hasConflict = conflictingEvents.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
      <div className="modal-content show bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
          <button
            onClick={onClose}
            className="btn-advanced p-2 rounded-lg hover:bg-gray-100 transition-colors custom-focus"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 custom-scrollbar max-h-[60vh] overflow-y-auto">
          {hasConflict && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-800">Schedule Conflict</p>
                <p className="text-xs text-red-600">
                  This event overlaps with {conflictingEvents.length} other event(s)
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(eventDate, 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-sm text-gray-600">
                {formatDate(startDateTime, 'HH:mm')} - {formatDate(endDateTime, 'HH:mm')}
              </p>
            </div>
          </div>

          {event.location && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <p className="text-sm text-gray-700">{event.location}</p>
            </div>
          )}

          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Attendees</p>
                <div className="space-y-1">
                  {event.attendees.map((attendee, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {attendee}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {event.description && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
              <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-advanced px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium custom-focus"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;