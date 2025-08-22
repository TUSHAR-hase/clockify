'use client'
import { useState ,useEffect} from 'react'
import Sidebar from './components/Sidebar.js'
import DashboardContent from './components/DashboardContent.js'
import { useAuth } from '../../components/AuthProvider.js'
import { useRouter } from 'next/navigation.js'
import Head from 'next/head'


// Updated Dashboard Component
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, logout } = useAuth();
  const router = useRouter();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const handleLogout = async () => {
    await logout();
    router.push("/pages/login"); // login page pe bhej dena
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Head>
        
        <title>Clockify Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <DashboardContent toggleSidebar={toggleSidebar} />
      </div>
    </div>
  )
}
