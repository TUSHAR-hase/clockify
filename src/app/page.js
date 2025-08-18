// app/page.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './components/AuthProvider';
import Navbar from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import TrackerCard from './components/TimeTracker';
import DashboardCard from './components/DashboardCard';
import ProjectsTable from './components/ProjectCard';
import { useState } from 'react';

export default function Home() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('./pages/login');
    } else {
      // Simulate loading data
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Hours', value: '124.5h', change: 12.3, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-blue-500 bg-blue-100' },
    { title: 'Active Projects', value: '7', change: 5.2, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'text-green-500 bg-green-100' },
    { title: 'Team Members', value: '12', change: -2.1, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-purple-500 bg-purple-100' },
    { title: 'Weekly Earnings', value: '$2,845', change: 8.7, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-yellow-500 bg-yellow-100' },
  ];

  const getWelcomeMessage = () => {
    if (!user) return 'Dashboard';
    
    switch(user.role) {
      case 'admin': return 'Administrator Dashboard';
      case 'freelancer': return 'Freelancer Dashboard';
      case 'client': return 'Client Dashboard';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar 
          userRole={user?.role} 
          isOpen={sidebarOpen} 
          toggleSidebar={() => setSidebarOpen(false)} 
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto transition-all duration-300">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{getWelcomeMessage()}</h1>
              <p className="text-gray-600 mt-2">Here's what's happening with your projects today</p>
            </div>

            <TrackerCard />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

            <ProjectsTable />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}