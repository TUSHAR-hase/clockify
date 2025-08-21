"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import DashboardCard from "../../components/DashboardCard";
import TrackerCard from "../../components/TimeTracker";
import ProjectsTable from "../../components/ProjectCard";

const Dashboard = ({ userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getWelcomeMessage = () => {
    switch (userRole) {
      case "admin":
        return "Administrator Dashboard";
      case "freelancer":
        return "Freelancer Dashboard";
      case "client":
        return "Client Dashboard";
      default:
        return "Dashboard";
    }
  };

  const stats = [
    {
      title: "Total Hours",
      value: "124.5h",
      change: 12.3,
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Projects",
      value: "7",
      change: 5.2,
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Team Members",
      value: "12",
      change: -2.1,
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Weekly Earnings",
      value: "$2,845",
      change: 8.7,
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar userRole={userRole} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar userRole={userRole} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 overflow-auto transition-all duration-300">
          <div className="container mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                {getWelcomeMessage()}
              </h1>
              <p className="text-gray-600 text-lg">
                Here's what's happening with your projects today.
              </p>
            </div>

            {/* Time Tracker */}
            <div className="mb-8">
              <TrackerCard />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <DashboardCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Projects Table */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <ProjectsTable />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
