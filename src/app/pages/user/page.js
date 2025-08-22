'use client'
import { useState ,useEffect} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'


function Sidebar({ isOpen, onClose }) {
  const router = useRouter()
  const [showAll, setShowAll] = useState(false)
  const [activeItem, setActiveItem] = useState("Time Tracker")
  
  const menuItems = [
    {
      title: "TIME TRACKER",
      items: [
        { name: "Time Tracker", icon: "⏱️", path: "/time-tracker" },
        { name: "Calendar", icon: "📅", path: "/calendar" },
        { name: "Analyze", icon: "📊", path: "/analyze" },
        { name: "workespace", icon: "📈", path: "/pages/workespace" },
        { name: "Reports", icon: "📋", path: "/reports" }
      ]
    },
    {
      title: "MANAGE",
      items: [
        { name: "Projects", icon: "📂", path: "/projects" },
        { name: "Team", icon: "👥", path: "/team" },
        { name: "Clients", icon: "👔", path: "/clients" },
        { name: "Tags", icon: "🏷️", path: "/tags" },
        { name: "Timesheet", icon: "⏰", path: "/timesheet" },
        { name: "Invoices", icon: "🧾", path: "/invoices" },
        { name: "Expenses", icon: "💳", path: "/expenses" },
        { name: "Settings", icon: "⚙️", path: "/settings" }
      ]
    }
  ]

  const itemsToShow = showAll 
    ? menuItems 
    : menuItems.map(section => ({
        ...section,
        items: section.items.slice(0, 3)
      }))

  const handleItemClick = (item) => {
    setActiveItem(item.name)
    router.push(item.path)
    onClose()  // Close sidebar on mobile after navigation
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">clockify</h1>
          <button 
            className="lg:hidden text-gray-500 p-1 rounded hover:bg-gray-100"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <nav className="p-4 h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {itemsToShow.map((section, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {section.title}
                </h2>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors ${activeItem === item.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => handleItemClick(item)}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button 
              className="flex items-center justify-center w-full text-gray-500 text-sm py-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setShowAll(!showAll)}
            >
              <span className="mr-1">{showAll ? '↑' : '↓'}</span> 
              SHOW {showAll ? 'LESS' : 'MORE'}
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}




// Updated Dashboard Component
function Dashboard() {
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

// DashboardContent Component (unchanged from your original)
function DashboardContent({ toggleSidebar }) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [activeProject, setActiveProject] = useState('')
  const [description, setDescription] = useState('')

  // Timer functionality
  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(0)
  }

  const stats = [
    {
      title: "Total Hours",
      value: "124.5h",
      change: 12.3,
      icon: "⏱️",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "up"
    },
    {
      title: "Active Projects",
      value: "7",
      change: 5.2,
      icon: "📁",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      trend: "up"
    },
    {
      title: "Team Members",
      value: "12",
      change: -2.1,
      icon: "👥",
      color: "text-violet-600",
      bgColor: "bg-violet-100",
      trend: "down"
    },
    {
      title: "Weekly Earnings",
      value: "$2,845",
      change: 8.7,
      icon: "💰",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      trend: "up"
    }
  ]

  const projects = [
    {
      name: "Website Redesign",
      client: "ABC Corp",
      time: "42.5h",
      progress: 75,
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-800",
      team: ["JD", "MK", "AL"]
    },
    {
      name: "Mobile App Development",
      client: "XYZ Inc",
      time: "78.2h",
      progress: 90,
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-800",
      team: ["JD", "SP", "RM"]
    },
    {
      name: "Marketing Campaign",
      client: "Acme Ltd",
      time: "36.7h",
      progress: 30,
      status: "Planning",
      statusColor: "bg-blue-100 text-blue-800",
      team: ["JD", "TS"]
    }
  ]

  const recentActivities = [
    { action: "added a time entry", project: "Website Redesign", time: "2 hours ago", user: "John Doe" },
    { action: "completed a task", project: "Mobile App", time: "5 hours ago", user: "Sarah Parker" },
    { action: "uploaded a file", project: "Marketing Campaign", time: "Yesterday", user: "Mike Kim" }
  ]
const { user, logout } = useAuth();
  const router = useRouter();  const handleLogout = async () => {
    await logout();
    router.push("/pages/login"); // login page pe bhej dena
  };
  return (
    <main className="flex-1 overflow-y-auto">
      {/* Top bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button 
              className="lg:hidden text-gray-600 mr-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleSidebar}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
            
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Logout
      </button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Time Entry
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium cursor-pointer">
                JD
              </div>
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-emerald-400"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 bg-gray-50">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, John!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your projects today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-5 transition-all duration-200 hover:shadow-md border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                  <div className={`inline-flex items-center ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'} text-sm font-medium`}>
                    {stat.trend === 'up' ? (
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <span className={`text-xl ${stat.color}`}>{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Time Tracker Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">What are you working on?</h3>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={activeProject}
                    onChange={(e) => setActiveProject(e.target.value)}
                  >
                    <option value="">Select project</option>
                    <option value="website">Website Redesign</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="marketing">Marketing Campaign</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input 
                    type="text" 
                    placeholder="What are you working on?" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 rounded-full border-4 border-blue-100 flex items-center justify-center mb-4">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    {isRunning && (
                      <circle 
                        cx="50" cy="50" r="48" fill="none" stroke="#3b82f6" strokeWidth="4" 
                        strokeDasharray="301.6" 
                        strokeDashoffset={301.6 - (time % 60) / 60 * 301.6} 
                      />
                    )}
                  </svg>
                  <span className="text-2xl font-bold text-gray-800">{formatTime(time)}</span>
                </div>
                <div className="flex space-x-3">
                  <button 
                    className={`${isRunning ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white py-2.5 px-6 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md flex items-center`}
                    onClick={toggleTimer}
                  >
                    {isRunning ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        STOP
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        START
                      </>
                    )}
                  </button>
                  <button 
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md flex items-center"
                    onClick={resetTimer}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    RESET
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Start time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
              <p className="text-gray-600 text-sm">Let's start tracking! Install Clockify and track time anywhere.</p>
              
              <div className="flex items-center mt-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">50+ integrations</span>
                <button className="ml-4 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center">
                  Enable timesheet mode
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action} in <span className="text-blue-600">{activity.project}</span></p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors w-full text-center">
              View all activity
            </button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Projects</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Project
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3 font-medium">Project</th>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Progress</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Team</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <p className="font-medium text-gray-800">{project.name}</p>
                    </td>
                    <td className="py-4">
                      <p className="font-medium text-gray-800">{project.time}</p>
                    </td>
                    <td className="py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">{project.progress}%</span>
                    </td>
                    <td className="py-4">
                      <p className="text-gray-600">{project.client}</p>
                    </td>
                    <td className="py-4">
                      <div className="flex -space-x-2">
                        {project.team.map((member, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-700">
                            {member}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard