"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from 'next/head'
import { useAuth } from "../../../../app/components/AuthProvider.js";
import {
  FaStopwatch,
  FaUsers,
  FaFolderOpen,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  FiLogOut,
  FiSearch,
  FiPlus,
  FiPlay,
  FiPause,
  FiRefreshCcw,
} from "react-icons/fi";
import { motion } from "framer-motion";

export default function DashboardContent({ toggleSidebar }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeProject, setActiveProject] = useState("");
  const [description, setDescription] = useState("");

  const { user, logout } = useAuth();
  const router = useRouter();

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/pages/login");
  };

  // Stats Section
  const stats = [
    {
      title: "Total Hours",
      value: "124.5h",
      change: 12.3,
      icon: <FaStopwatch />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "up",
    },
    {
      title: "Active Projects",
      value: "7",
      change: 5.2,
      icon: <FaFolderOpen />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      trend: "up",
    },
    {
      title: "Team Members",
      value: "12",
      change: -2.1,
      icon: <FaUsers />,
      color: "text-violet-600",
      bgColor: "bg-violet-100",
      trend: "down",
    },
    {
      title: "Weekly Earnings",
      value: "$2,845",
      change: 8.7,
      icon: <FaMoneyBillWave />,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      trend: "up",
    },
  ];

  const projects = [
    {
      name: "Website Redesign",
      client: "ABC Corp",
      time: "42.5h",
      progress: 75,
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-800",
      team: ["JD", "MK", "AL"],
    },
    {
      name: "Mobile App Development",
      client: "XYZ Inc",
      time: "78.2h",
      progress: 90,
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-800",
      team: ["JD", "SP", "RM"],
    },
    {
      name: "Marketing Campaign",
      client: "Acme Ltd",
      time: "36.7h",
      progress: 30,
      status: "Planning",
      statusColor: "bg-blue-100 text-blue-800",
      team: ["JD", "TS"],
    },
  ];

  const recentActivities = [
    {
      action: "added a time entry",
      project: "Website Redesign",
      time: "2 hours ago",
      user: "John Doe",
    },
    {
      action: "completed a task",
      project: "Mobile App",
      time: "5 hours ago",
      user: "Sarah Parker",
    },
    {
      action: "uploaded a file",
      project: "Marketing Campaign",
      time: "Yesterday",
      user: "Mike Kim",
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto">
      {/* Top Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button
              className="lg:hidden text-gray-600 mr-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleSidebar}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md flex items-center">
              <FiPlus className="w-4 h-4 mr-1" />
              New Time Entry
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium cursor-pointer">
                JD
              </div>
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-emerald-400"></span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <FiLogOut className="w-4 h-4 mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 bg-gray-50">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your projects today
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-5 transition-all duration-200 hover:shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </p>
                  <div
                    className={`inline-flex items-center ${
                      stat.trend === "up"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    } text-sm font-medium`}
                  >
                    {stat.trend === "up" ? "▲" : "▼"} {Math.abs(stat.change)}%
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                >
                  <span className={`text-xl ${stat.color}`}>{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timer Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Time Tracker
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="flex items-center justify-center w-32 h-32 rounded-full bg-blue-100 mb-4 md:mb-0"
              animate={{ scale: isRunning ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-3xl font-bold text-blue-600">
                {formatTime(time)}
              </span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTimer}
                className={`flex items-center px-4 py-2 rounded-lg text-white ${
                  isRunning ? "bg-yellow-500" : "bg-green-600"
                } hover:opacity-90 transition`}
              >
                {isRunning ? (
                  <>
                    <FiPause className="w-4 h-4 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <FiPlay className="w-4 h-4 mr-2" /> Start
                  </>
                )}
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                <FiRefreshCcw className="w-4 h-4 mr-2" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          <ul className="divide-y divide-gray-100">
            {recentActivities.map((activity, index) => (
              <li key={index} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action} on{" "}
                    <span className="font-medium">{activity.project}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
