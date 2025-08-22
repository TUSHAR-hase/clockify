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
} from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown, FiActivity } from "react-icons/fi";

export default function AnalyzePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("productivity");

  // Sample analytics data
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
  };

  const activityData = [
    { day: "Mon", active: 8.5, idle: 1.2, breaks: 0.3 },
    { day: "Tue", active: 7.8, idle: 1.8, breaks: 0.4 },
    { day: "Wed", active: 9.2, idle: 0.8, breaks: 0.2 },
    { day: "Thu", active: 8.1, idle: 1.5, breaks: 0.4 },
    { day: "Fri", active: 7.6, idle: 2.0, breaks: 0.4 },
    { day: "Sat", active: 4.2, idle: 0.8, breaks: 0.2 },
    { day: "Sun", active: 2.8, idle: 0.4, breaks: 0.1 },
  ];

  const applicationUsage = [
    { name: "VS Code", time: "12.5h", percentage: 35, color: "bg-blue-500" },
    { name: "Chrome", time: "8.2h", percentage: 23, color: "bg-green-500" },
    { name: "Figma", time: "6.1h", percentage: 17, color: "bg-purple-500" },
    { name: "Slack", time: "4.3h", percentage: 12, color: "bg-red-500" },
    { name: "Others", time: "4.6h", percentage: 13, color: "bg-gray-400" },
  ];

  const screenshots = [
    { id: 1, time: "09:15 AM", activity: "High", thumbnail: "/api/placeholder/150/100" },
    { id: 2, time: "10:30 AM", activity: "Medium", thumbnail: "/api/placeholder/150/100" },
    { id: 3, time: "11:45 AM", activity: "High", thumbnail: "/api/placeholder/150/100" },
    { id: 4, time: "02:15 PM", activity: "Low", thumbnail: "/api/placeholder/150/100" },
    { id: 5, time: "03:30 PM", activity: "High", thumbnail: "/api/placeholder/150/100" },
    { id: 6, time: "04:45 PM", activity: "Medium", thumbnail: "/api/placeholder/150/100" },
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
              <p className="text-gray-600">
                Track productivity, activity patterns, and work insights
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <FaDesktop className="w-6 h-6 text-purple-600" />
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
                      className="bg-yellow-500 rounded-b"
                      style={{ height: `${(day.breaks / 10) * 100}%` }}
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
                        <span className="text-sm font-medium text-gray-900">
                          {app.name}
                        </span>
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

        {/* Screenshots Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Screenshots
            </h3>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <FaFilter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {screenshots.map((screenshot) => (
              <motion.div
                key={screenshot.id}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
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
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <FaEye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}