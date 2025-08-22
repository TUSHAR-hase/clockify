"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaClock,
  FaDesktop,
  FaKeyboard,
  FaMouse,
  FaEye,
  FaDownload,
  FaFilter,
  FaCalendarAlt,
  FaPlay,
  FaPause,
  FaStop,
  FaCamera,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown, FiActivity, FiAlertCircle } from "react-icons/fi";

export default function AnalyzePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("productivity");
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // Sample analytics data for time tracking app
  const productivityData = {
    current: 87,
    previous: 82,
    trend: "up",
    change: 5,
  };

  const timeData = {
    totalHours: 42.5,
    activeHours: 38.2,
    idleTime: 4.3,
    breakTime: 2.1,
    overtimeHours: 3.2,
  };

  const activityData = [
    { day: "Mon", active: 8.5, idle: 1.2, breaks: 0.3, overtime: 0.5 },
    { day: "Tue", active: 7.8, idle: 1.8, breaks: 0.4, overtime: 0.2 },
    { day: "Wed", active: 9.2, idle: 0.8, breaks: 0.2, overtime: 1.1 },
    { day: "Thu", active: 8.1, idle: 1.5, breaks: 0.4, overtime: 0.3 },
    { day: "Fri", active: 7.6, idle: 2.0, breaks: 0.4, overtime: 0.8 },
    { day: "Sat", active: 4.2, idle: 0.8, breaks: 0.2, overtime: 0.0 },
    { day: "Sun", active: 2.8, idle: 0.4, breaks: 0.1, overtime: 0.0 },
  ];

  const applicationUsage = [
    { name: "VS Code", time: "12.5h", percentage: 35, color: "bg-blue-500", category: "Development" },
    { name: "Chrome", time: "8.2h", percentage: 23, color: "bg-green-500", category: "Browser" },
    { name: "Figma", time: "6.1h", percentage: 17, color: "bg-purple-500", category: "Design" },
    { name: "Slack", time: "4.3h", percentage: 12, color: "bg-red-500", category: "Communication" },
    { name: "Zoom", time: "2.8h", percentage: 8, color: "bg-yellow-500", category: "Meetings" },
    { name: "Others", time: "1.8h", percentage: 5, color: "bg-gray-400", category: "Miscellaneous" },
  ];

  const screenshots = [
    { 
      id: 1, 
      time: "09:15 AM", 
      activity: "High", 
      thumbnail: "/api/placeholder/150/100",
      project: "Website Redesign",
      application: "VS Code",
      mouseClicks: 45,
      keystrokes: 234
    },
    { 
      id: 2, 
      time: "10:30 AM", 
      activity: "Medium", 
      thumbnail: "/api/placeholder/150/100",
      project: "Mobile App",
      application: "Figma",
      mouseClicks: 23,
      keystrokes: 89
    },
    { 
      id: 3, 
      time: "11:45 AM", 
      activity: "High", 
      thumbnail: "/api/placeholder/150/100",
      project: "Website Redesign",
      application: "Chrome",
      mouseClicks: 67,
      keystrokes: 445
    },
    { 
      id: 4, 
      time: "02:15 PM", 
      activity: "Low", 
      thumbnail: "/api/placeholder/150/100",
      project: "Documentation",
      application: "Notion",
      mouseClicks: 12,
      keystrokes: 156
    },
    { 
      id: 5, 
      time: "03:30 PM", 
      activity: "High", 
      thumbnail: "/api/placeholder/150/100",
      project: "API Development",
      application: "Postman",
      mouseClicks: 89,
      keystrokes: 567
    },
    { 
      id: 6, 
      time: "04:45 PM", 
      activity: "Medium", 
      thumbnail: "/api/placeholder/150/100",
      project: "Team Meeting",
      application: "Zoom",
      mouseClicks: 34,
      keystrokes: 78
    },
  ];

  const inactivityAlerts = [
    { time: "11:30 AM", duration: "18 minutes", reason: "Extended break" },
    { time: "02:45 PM", duration: "12 minutes", reason: "Away from desk" },
    { time: "04:15 PM", duration: "25 minutes", reason: "Meeting overrun" },
  ];

  const getActivityColor = (activity) => {
    switch (activity) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Analytics & Monitoring</h1>
              <p className="text-gray-600">
                Track productivity, activity patterns, and work insights for remote employees
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {["day", "week", "month"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                      selectedPeriod === period
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaDownload className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productivity Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {productivityData.current}%
                </p>
                <div className="flex items-center mt-2">
                  {productivityData.trend === "up" ? (
                    <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <FiTrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    productivityData.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {productivityData.change}% from last {selectedPeriod}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaChartLine className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Hours</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {timeData.activeHours}h
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  of {timeData.totalHours}h total
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaClock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Idle Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {timeData.idleTime}h
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {((timeData.idleTime / timeData.totalHours) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FiActivity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Screenshots</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">247</p>
                <p className="text-sm text-gray-500 mt-2">
                  Every 10 minutes
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaCamera className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overtime</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {timeData.overtimeHours}h
                </p>
                <p className="text-sm text-red-500 mt-2">
                  Above 8h/day
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FaExclamationTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Daily Activity Pattern
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Active</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Idle</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Breaks</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Overtime</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {activityData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col justify-end h-48 space-y-1">
                    <div
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${(day.active / 10) * 100}%` }}
                    ></div>
                    <div
                      className="bg-red-500"
                      style={{ height: `${(day.idle / 10) * 100}%` }}
                    ></div>
                    <div
                      className="bg-yellow-500"
                      style={{ height: `${(day.breaks / 10) * 100}%` }}
                    ></div>
                    <div
                      className="bg-orange-500 rounded-b"
                      style={{ height: `${(day.overtime / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Usage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Application Usage
            </h3>
            <div className="space-y-4">
              {applicationUsage.map((app, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-3 h-3 rounded-full ${app.color} mr-3`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {app.name}
                          </span>
                          <span className="text-xs text-gray-500 block">
                            {app.category}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{app.time}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${app.color}`}
                          style={{ width: `${app.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inactivity Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiAlertCircle className="w-5 h-5 text-orange-500 mr-2" />
              Inactivity Alerts
            </h3>
            <span className="text-sm text-gray-500">
              Periods longer than 15 minutes
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inactivityAlerts.map((alert, index) => (
              <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-900">{alert.time}</p>
                    <p className="text-sm text-orange-700">{alert.duration}</p>
                    <p className="text-xs text-orange-600 mt-1">{alert.reason}</p>
                  </div>
                  <FaExclamationTriangle className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshots Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Activity Screenshots
            </h3>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <FaFilter className="w-4 h-4 mr-2" />
                Filter by Activity
              </button>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Screenshots
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {screenshots.map((screenshot) => (
              <motion.div
                key={screenshot.id}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedScreenshot(screenshot)}
              >
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <FaDesktop className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-900">
                      {screenshot.time}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getActivityColor(screenshot.activity)}`}>
                      {screenshot.activity}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {screenshot.project}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {screenshot.application}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <FaEye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Screenshot Detail Modal */}
        {selectedScreenshot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Screenshot Details</h3>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <FaDesktop className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Time Captured</h4>
                    <p className="text-sm text-gray-600">{selectedScreenshot.time}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Project</h4>
                    <p className="text-sm text-blue-600">{selectedScreenshot.project}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Application</h4>
                    <p className="text-sm text-gray-600">{selectedScreenshot.application}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Activity Level</h4>
                    <span className={`text-sm px-2 py-1 rounded-full ${getActivityColor(selectedScreenshot.activity)}`}>
                      {selectedScreenshot.activity}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <FaMouse className="w-4 h-4 mr-1" />
                        Mouse Clicks
                      </h4>
                      <p className="text-sm text-gray-600">{selectedScreenshot.mouseClicks}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <FaKeyboard className="w-4 h-4 mr-1" />
                        Keystrokes
                      </h4>
                      <p className="text-sm text-gray-600">{selectedScreenshot.keystrokes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}