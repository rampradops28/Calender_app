import React, { useState } from 'react';
import { Clock, Calendar, AlertCircle, List, AlertTriangle, Search } from 'lucide-react';
import { formatDate, parseDate } from '../utils/dateUtils';
import { formatEventTime, sortEventsByDate, isEventOverlapping } from '../utils/eventUtils';

const SchedulePanel = ({ events, onEventClick }) => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState('events');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = sortEventsByDate(events).filter(event => {
    const eventDate = parseDate(event.date);
    return eventDate >= today;
  });

  // Only non-overlapping events for 'Events' tab
  const singleEvents = upcoming.filter(event => !isEventOverlapping(event, events));
  // Only overlapping events for 'Conflicts' tab
  const conflictEvents = upcoming.filter(event => isEventOverlapping(event, events));

  // Apply search filter
  const filteredSingle = search.trim()
    ? singleEvents.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(search.toLowerCase()))
      )
    : singleEvents;
  const filteredConflicts = search.trim()
    ? conflictEvents.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(search.toLowerCase()))
      )
    : conflictEvents;

  // Group by date
  const groupedSingle = filteredSingle.reduce((groups, event) => {
    const dateKey = event.date;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {});
  const groupedConflicts = filteredConflicts.reduce((groups, event) => {
    const dateKey = event.date;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {});

  const isEmpty = (tab === 'events' ? filteredSingle.length === 0 : filteredConflicts.length === 0);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex-shrink-0 rounded-lg">
        <h2 className="text-lg font-semibold">Events</h2>
      </div>
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        {/* Search bar with icon */}
        <div className="relative mb-3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 text-sm"
          />
        </div>
        {/* Tabs below search */}
        <div className="flex gap-2 mb-2">
          <button
            className={`flex items-center gap-1 px-3 py-1 rounded font-medium text-sm transition-colors focus:outline-none ${tab === 'events' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'}`}
            onClick={() => setTab('events')}
            aria-label="Show single assigned events"
          >
            <List className="h-4 w-4" /> Events
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-1 rounded font-medium text-sm transition-colors focus:outline-none ${tab === 'conflicts' ? 'bg-red-600 text-white' : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'}`}
            onClick={() => setTab('conflicts')}
            aria-label="Show conflict events"
          >
            <AlertTriangle className="h-4 w-4" /> Conflicts
          </button>
        </div>
        <p className="text-gray-600 text-xs mt-2">
          {tab === 'events'
            ? `${filteredSingle.length} event${filteredSingle.length !== 1 ? 's' : ''} scheduled`
            : `${filteredConflicts.length} conflict${filteredConflicts.length !== 1 ? 's' : ''} found`}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center text-center text-gray-500 min-h-[120px]">
            {tab === 'events' ? 'No events found.' : 'No conflicts found.'}
          </div>
        ) : (
          Object.keys(tab === 'events' ? groupedSingle : groupedConflicts).map(date => {
            const dayEvents = (tab === 'events' ? groupedSingle : groupedConflicts)[date];
            return (
              <div key={date} className="mb-6">
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="font-semibold text-gray-800">
                    {formatDate(parseDate(date), 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="space-y-2">
                  {dayEvents.map(event => {
                    const hasConflict = isEventOverlapping(event, events);
                    return (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col gap-1 cursor-pointer hover:bg-blue-50 transition-colors ${tab === 'conflicts' ? 'border-red-300 ring-2 ring-red-100' : ''}`}
                        onClick={() => onEventClick(event)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-400" />
                            <span className="font-medium text-gray-900 text-sm">
                              {formatEventTime(event.startTime, event.endTime)}
                            </span>
                            </div>
                            {hasConflict && (
                              <div className="flex items-center space-x-1 text-red-500 text-xs font-medium">
                                <AlertCircle className="h-4 w-4" />
                              <span>Overlap</span>
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <div className="text-xs md:text-sm text-gray-600 bg-gray-50 rounded-lg p-2 md:p-3">
                            {event.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SchedulePanel;
