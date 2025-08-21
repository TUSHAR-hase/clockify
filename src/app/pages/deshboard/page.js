// pages/_app.js
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


import Cookies from "js-cookie";
import Navbar from '../../components/Navbar.js';
import Sidebar from '../../components/Sidebar.js';
import Footer from '../../components/Footer.js';


function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

 useEffect(() => {
  // Try to read user from cookie
  const cookieUser = Cookies.get('user');
  if (cookieUser) {
    const user = JSON.parse(cookieUser);
    setIsLoggedIn(true);
    setUserRole(user.role);
  } else if (!['/login', '/register'].includes(router.pathname)) {
    router.push('/login');
  }
}, [router]);
const handleLogin = (userData) => {
  setIsLoggedIn(true);
  setUserRole(userData.role);
  Cookies.set('user', JSON.stringify(userData), { expires: 7 });

  // Redirect based on role
  switch (userData.role) {
    case 'admin':
      router.push('/pages/admin');
      break;
    case 'freelancer':
      router.push('/pages/freelancer');
      break;
    case 'client':
      router.push('/pages/client');
      break;
    default:
      router.push('/');
  }
};

const handleLogout = () => {
  setIsLoggedIn(false);
  setUserRole(null);
  Cookies.remove('user');
  router.push('/pages/login');
};

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Don't show layout for auth pages
  if (['/login', '/register'].includes(router.pathname)) {
    return <Component {...pageProps} onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {isLoggedIn && <Navbar userRole={userRole} onLogout={handleLogout} toggleSidebar={toggleSidebar} />}
      
      <div className="flex flex-1">
        {isLoggedIn && (
          <Sidebar
            userRole={userRole} 
            isOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar} 
          />
        )}
        
        <main className="flex-1 p-4 md:p-6 overflow-auto transition-all duration-300">
          <Component {...pageProps} userRole={userRole} />
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default MyApp;