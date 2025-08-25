"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaProjectDiagram,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaFileExport,
  FaPrint,
  FaEye,
  FaSearch,
  FaSort,
} from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown, FiActivity } from "react-icons/fi";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedReport, setSelectedReport] = useState("productivity");
  const [selectedTeamMember, setSelectedTeamMember] = useState("all");
  const [selectedProject, setSelectedProject] = useState("all");

  // Sample report data
  const reportTypes = [
    {
      id: "productivity",
      name: "Productivity Report",
      description: "Track team productivity and efficiency metrics",
      icon: <FaChartLine />,
      color: "bg-blue-500",
    },
    {
      id: "time-tracking",
      name: "Time Tracking Report",
      description: "Detailed breakdown of time spent on projects and tasks",
      icon: <FaClock />,
      color: "bg-green-500",
    },
    {
      id: "activity",
      name: "Activity Report",
      description: "Monitor user activity, idle time, and work patterns",
      icon: <FiActivity />,
      color: "bg-purple-500",
    },
    {
      id: "project",
      name: "Project Report",
      description: "Project progress, deadlines, and resource allocation",
      icon: <FaProjectDiagram />,
      color: "bg-orange-500",
    },
  ];

  const teamMembers = [
    { id: "all", name: "All Team Members" },
    { id: "john", name: "John Doe", role: "Frontend Developer" },
    { id: "sarah", name: "Sarah Parker", role: "UI/UX Designer" },
    { id: "mike", name: "Mike Kim", role: "Backend Developer" },
    { id: "lisa", name: "Lisa Chen", role: "Project Manager" },
    { id: "alex", name: "Alex Johnson", role: "QA Engineer" },
  ];

  const projects = [
    { id: "all", name: "All Projects" },
    { id: "website", name: "Website Redesign" },
    { id: "mobile", name: "Mobile App Development" },
    { id: "api", name: "API Integration" },
    { id: "dashboard", name: "Analytics Dashboard" },
  ];

  const productivityData = {
    totalHours: 342.5,
    activeHours: 298.2,
    idleTime: 44.3,
    productivity: 87,
    trend: "up",
    change: 5.2,
  };

  const timeTrackingData = [
    {
      member: "John Doe",
      project: "Website Redesign",
      hoursWorked: 42.5,
      tasksCompleted: 12,
      productivity: 92,
      lastActive: "2 hours ago",
    },
    {
      member: "Sarah Parker",
      project: "Mobile App",
      hoursWorked: 38.2,
      tasksCompleted: 8,
      productivity: 88,
      lastActive: "1 hour ago",
    },
    {
      member: "Mike Kim",
      project: "API Integration",
      hoursWorked: 45.1,
      tasksCompleted: 15,
      productivity: 95,
      lastActive: "30 minutes ago",
    },
    {
      member: "Lisa Chen",
      project: "Analytics Dashboard",
      hoursWorked: 35.8,
      tasksCompleted: 10,
      productivity: 85,
      lastActive: "4 hours ago",
    },
    {
      member: "Alex Johnson",
      project: "Website Redesign",
      hoursWorked: 40.3,
      tasksCompleted: 11,
      productivity: 89,
      lastActive: "1 hour ago",
    },
  ];

  const activityData = [
    { day: "Mon", active: 8.5, idle: 1.2, breaks: 0.3 },
    { day: "Tue", active: 7.8, idle: 1.8, breaks: 0.4 },
    { day: "Wed", active: 9.2, idle: 0.8, breaks: 0.2 },
    { day: "Thu", active: 8.1, idle: 1.5, breaks: 0.4 },
    { day: "Fri", active: 7.6, idle: 2.0, breaks: 0.4 },
    { day: "Sat", active: 4.2, idle: 0.8, breaks: 0.2 },
    { day: "Sun", active: 2.8, idle: 0.4, breaks: 0.1 },
  ];

  const projectData = [
    {
      name: "Website Redesign",
      progress: 85,
      hoursSpent: 156.5,
      budget: "$15,000",
      deadline: "2025-02-15",
      status: "On Track",
      team: 4,
    },
    {
      name: "Mobile App Development",
      progress: 62,
      hoursSpent: 234.2,
      budget: "$25,000",
      deadline: "2025-03-30",
      status: "On Track",
      team: 3,
    },
    {
      name: "API Integration",
      progress: 95,
      hoursSpent: 89.3,
      budget: "$8,000",
      deadline: "2025-01-25",
      status: "Ahead",
      team: 2,
    },
    {
      name: "Analytics Dashboard",
      progress: 45,
      hoursSpent: 67.8,
      budget: "$12,000",
      deadline: "2025-02-28",
      status: "Behind",
      team: 3,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "On Track": return "bg-green-100 text-green-800";
      case "Ahead": return "bg-blue-100 text-blue-800";
      case "Behind": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case "productivity":
        return (
          <div className="space-y-6">
            {/* Productivity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Hours</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {productivityData.totalHours}h
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaClock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Hours</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {productivityData.activeHours}h
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FiActivity className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Idle Time</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {productivityData.idleTime}h
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <FaClock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Productivity</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {productivityData.productivity}%
                    </p>
                    <div className="flex items-center mt-2">
                      <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-600">
                        +{productivityData.change}%
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaChartLine className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Activity Pattern</h3>
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
          </div>
        );

      case "time-tracking":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Time Tracking Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours Worked
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tasks Completed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productivity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timeTrackingData.map((member, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-blue-600">
                              {member.member.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{member.member}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member.hoursWorked}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.tasksCompleted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${member.productivity}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{member.productivity}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "activity":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Activity Breakdown</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {activityData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col justify-end h-48 space-y-1">
                      <div
                        className="bg-blue-500 rounded-t"
                        style={{ height: `${(day.active / 10) * 100}%` }}
                        title={`Active: ${day.active}h`}
                      ></div>
                      <div
                        className="bg-red-500"
                        style={{ height: `${(day.idle / 10) * 100}%` }}
                        title={`Idle: ${day.idle}h`}
                      ></div>
                      <div
                        className="bg-yellow-500 rounded-b"
                        style={{ height: `${(day.breaks / 10) * 100}%` }}
                        title={`Breaks: ${day.breaks}h`}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Active Time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Idle Time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Break Time</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "project":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Project Progress Report</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {projectData.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Progress</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Hours Spent</p>
                        <p className="text-lg font-semibold text-gray-900">{project.hoursSpent}h</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Budget</p>
                        <p className="text-lg font-semibold text-gray-900">{project.budget}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Team Size</p>
                        <p className="text-lg font-semibold text-gray-900">{project.team} members</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                      <span>{Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">
                Comprehensive reports for remote work tracking and team productivity
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {["day", "week", "month", "quarter"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
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

        {/* Report Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportTypes.map((report) => (
            <motion.div
              key={report.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedReport(report.id)}
              className={`cursor-pointer rounded-xl shadow-sm border-2 transition-all p-6 ${
                selectedReport === report.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${report.color}`}>
                  {report.icon}
                </div>
                {selectedReport === report.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600">{report.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h3 className="text-lg font-semibold text-gray-900">Report Filters</h3>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Member</label>
                <select
                  value={selectedTeamMember}
                  onChange={(e) => setSelectedTeamMember(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <FaFilter className="w-4 h-4 mr-2" />
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="mb-8">
          {renderReportContent()}
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaFileExport className="w-5 h-5 mr-2 text-green-600" />
              <span className="font-medium">Export to Excel</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaDownload className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium">Download PDF</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaPrint className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-medium">Print Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}