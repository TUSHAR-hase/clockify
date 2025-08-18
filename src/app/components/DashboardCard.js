// src/components/DashboardCard.js
import React from 'react';

const DashboardCard = ({ title, value, change, icon, color }) => {
  const changeColor = change >= 0 ? 'text-green-500' : 'text-red-500';
  const changeIcon = change >= 0 ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3';
  
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
          <div className={`flex items-center mt-2 ${changeColor}`}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={changeIcon} />
            </svg>
            <span className="text-sm">{Math.abs(change)}% from last week</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;