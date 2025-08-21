'use client'
import { useState } from 'react'

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    {
      title: "TIME TRACKER",
      items: [
        { name: "Time Tracker", icon: "⏱️", active: true },
        { name: "Calendar", icon: "📅" },
        { name: "Analyze", icon: "📊" },
        { name: "Dashboard", icon: "📈" },
        { name: "Reports", icon: "📋" }
      ]
    },
    {
      title: "MANAGE",
      items: [
        { name: "Projects", icon: "📂" },
        { name: "Team", icon: "👥" },
        { name: "Clients", icon: "👔" },
        { name: "Tags", icon: "🏷️" },
        { name: "Timesheet", icon: "⏰" }
      ]
    }
  ]

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">clockify</h1>
          <button 
            className="lg:hidden text-gray-500"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h2>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className={`flex items-center py-2 px-3 rounded-md ${item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="mt-8 px-2">
            <button className="flex items-center text-gray-500 text-sm">
              <span className="mr-1">↑</span> SHOW LESS
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}