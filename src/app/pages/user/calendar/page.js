"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaVideo,
  FaPlus,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaBell,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { FiSearch, FiMoreVertical } from "react-icons/fi";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Sample events data for time tracking app
  const events = [
    {
      id: 1,
      title: "Team Standup",
      time: "09:00 AM",
      date: "2025-01-15",
      type: "meeting",
      attendees: ["John Doe", "Sarah Parker", "Mike Kim", "Lisa Chen", "Alex Johnson"],
      color: "bg-blue-500",
      duration: "30 min",
      location: "Zoom Meeting",
      description: "Daily standup to discuss progress and blockers",
      project: "Website Redesign",
    },
    {
      id: 2,
      title: "Client Review - Mobile App",
      time: "02:00 PM",
      date: "2025-01-15",
      type: "client-meeting",
      attendees: ["John Doe", "Client Representative", "Project Manager"],
      color: "bg-purple-500",
      duration: "1 hour",
      location: "Google Meet",
      description: "Review mobile app progress with client",
      project: "Mobile App Development",
    },
    {
      id: 3,
      title: "Project Deadline - Website Launch",
      time: "11:59 PM",
      date: "2025-01-18",
      type: "deadline",
      color: "bg-red-500",
      priority: "high",
      project: "Website Redesign",
      description: "Final deadline for website launch",
    },
    {
      id: 4,
      title: "Design Workshop",
      time: "10:00 AM",
      date: "2025-01-20",
      type: "workshop",
      attendees: ["Design Team", "Frontend Developers"],
      color: "bg-green-500",
      duration: "2 hours",
      location: "Conference Room A",
      description: "UI/UX design workshop for new features",
    },
    {
      id: 5,
      title: "Sprint Planning",
      time: "03:00 PM",
      date: "2025-01-22",
      type: "planning",
      attendees: ["Development Team", "Product Manager", "Scrum Master"],
      color: "bg-indigo-500",
      duration: "2 hours",
      location: "Teams Meeting",
      description: "Plan tasks for the upcoming sprint",
    },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const todayEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar & Scheduling</h1>
              <p className="text-gray-600">
                Manage meetings, deadlines, and team events for remote work tracking
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <button 
                onClick={() => setShowEventModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Today's Events Banner */}
        {todayEvents.length > 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Today's Schedule</h3>
                <p className="text-blue-100">You have {todayEvents.length} events scheduled for today</p>
              </div>
              <FaBell className="w-8 h-8 text-blue-200" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {todayEvents.map(event => (
                <div key={event.id} className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-sm">
                  {event.time} - {event.title}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Calendar Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {formatDate(currentDate)}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <FaChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <FaChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Today
                    </button>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      {["month", "week", "day"].map((view) => (
                        <button
                          key={view}
                          onClick={() => setSelectedView(view)}
                          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                            selectedView === view
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {view}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="p-3 text-center text-sm font-medium text-gray-500"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    const isToday =
                      day &&
                      new Date().toDateString() ===
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        ).toDateString();

                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`min-h-[100px] p-2 border border-gray-100 rounded-lg transition-colors ${
                          day
                            ? "bg-white hover:bg-gray-50 cursor-pointer"
                            : "bg-gray-50"
                        } ${isToday ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
                      >
                        {day && (
                          <>
                            <div
                              className={`text-sm font-medium mb-1 ${
                                isToday ? "text-blue-600" : "text-gray-900"
                              }`}
                            >
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs px-2 py-1 rounded text-white truncate ${event.color} cursor-pointer hover:opacity-80`}
                                  title={event.title}
                                  onClick={() => setSelectedEvent(event)}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-gray-500 px-2">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                This Month
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaCalendarAlt className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Total Events</span>
                  </div>
                  <span className="font-semibold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaVideo className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm text-gray-600">Meetings</span>
                  </div>
                  <span className="font-semibold text-gray-900">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaClock className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Hours Scheduled</span>
                  </div>
                  <span className="font-semibold text-gray-900">42h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaUsers className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm text-gray-600">Team Events</span>
                  </div>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upcoming Events
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {event.title}
                        </h4>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <FaClock className="w-3 h-3 mr-1" />
                          {event.time}
                          {event.duration && ` • ${event.duration}`}
                        </div>
                        {event.attendees && (
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <FaUsers className="w-3 h-3 mr-1" />
                            {Array.isArray(event.attendees) ? event.attendees.length : event.attendees} attendees
                          </div>
                        )}
                        {event.project && (
                          <div className="mt-1 text-xs text-blue-600 font-medium">
                            {event.project}
                          </div>
                        )}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Event Types Legend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Event Types
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Team Meetings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Client Reviews</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Deadlines</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Workshops</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedEvent.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedEvent.description}</p>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="w-4 h-4 mr-2" />
                  {selectedEvent.time} {selectedEvent.duration && `(${selectedEvent.duration})`}
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                    {selectedEvent.location}
                  </div>
                )}
                
                {selectedEvent.attendees && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="w-4 h-4 mr-2" />
                    {Array.isArray(selectedEvent.attendees) 
                      ? `${selectedEvent.attendees.length} attendees`
                      : selectedEvent.attendees
                    }
                  </div>
                )}
                
                {selectedEvent.project && (
                  <div className="text-sm">
                    <span className="text-gray-600">Project: </span>
                    <span className="text-blue-600 font-medium">{selectedEvent.project}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <FaEdit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                  <FaTrash className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}