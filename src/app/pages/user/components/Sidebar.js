"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaStopwatch,
  FaCalendarAlt,
  FaChartBar,
  FaProjectDiagram,
  FaUsers,
  FaUserTie,
  FaTags,
  FaClock,
  FaFileInvoice,
  FaCreditCard,
  FaCog,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse

  const menuItems = [
    {
      title: "TIME TRACKER",
      items: [
        { name: "Time Tracker", icon: <FaStopwatch />, path: "/time-tracker" },
        { name: "Calendar", icon: <FaCalendarAlt />, path: "/pages/calendar" },
        { name: "Analyze", icon: <FaReact className="text-blue-500" />, path: "/analyze" },
        { name: "Analyze", icon: <FaChartBar />, path: "/pages/analyze" },
        { name: "Workspace", icon: <FaProjectDiagram />, path: "/pages/workespace" },
        { name: "Reports", icon: <FaFileInvoice />, path: "/pages/reports" },
      ],
    },
    {
      title: "MANAGE",
      items: [
        { name: "Projects", icon: <FaProjectDiagram />, path: "/projects" },
        { name: "Team", icon: <FaUsers />, path: "/team" },
        { name: "Clients", icon: <FaUserTie />, path: "/clients" },
        { name: "Tags", icon: <FaTags />, path: "/tags" },
        { name: "Timesheet", icon: <FaClock />, path: "/timesheet" },
        { name: "Invoices", icon: <FaFileInvoice />, path: "/invoices" },
        { name: "Expenses", icon: <FaCreditCard />, path: "/expenses" },
        { name: "Settings", icon: <FaCog />, path: "/settings" },
      ],
    },
  ];

  const itemsToShow = showAll ? menuItems : menuItems.slice(0, 1);

  useEffect(() => {
    const currentItem = menuItems
      .flatMap((section) => section.items)
      .find((item) => item.path === router.pathname);
    if (currentItem) setActiveItem(currentItem.name);
  }, [router.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item.name);
    router.push(item.path);
    onClose();
  };

  const SidebarContent = ({ collapsed }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FaReact className="text-blue-500 text-2xl" />
          {!collapsed && <h1 className="text-xl font-bold text-blue-600">Clockify</h1>}
          }
        </div>

        {/* Collapse / Expand Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 p-1 rounded hover:bg-gray-100"
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <FiMenu className="text-xl" /> : <FiX className="text-xl" />}
        </button>
      </div>

      {/* Menu */}
      <nav className="p-4 h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {itemsToShow.map((section) => (
            <div key={section.title} className="mb-6">
              {!collapsed && (
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {section.title}
                </h2>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors duration-200 ${
                      activeItem === item.name
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && <span className="ml-3 text-sm">{item.name}</span>}
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!collapsed && (
          <div className="pt-4">
            <button
              className="flex items-center justify-center w-full text-gray-500 text-sm py-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
              onClick={() => setShowAll(!showAll)}
              aria-label={showAll ? "Show Less" : "Show More"}
            >
              <span className="mr-1">{showAll ? "▲" : "▼"}</span>
              SHOW {showAll ? "LESS" : "MORE"}
            </button>
          </div>
        )}
      </nav>
    </div>
  );

  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
          aria-label="Close Sidebar Overlay"
        />
      )}

      {/* Desktop Sidebar (Collapsible) */}
      <motion.div
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="hidden lg:flex flex-col bg-white shadow-md h-screen"
      >
        <SidebarContent collapsed={isCollapsed} />
      </motion.div>

      {/* Mobile Sidebar (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-md z-30 lg:hidden"
          >
            <SidebarContent collapsed={false} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
