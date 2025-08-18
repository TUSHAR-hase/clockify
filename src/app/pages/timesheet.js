// pages/freelancer/timesheet.js
import { useState } from 'react';

const FreelancerTimesheet = () => {
  const [entries, setEntries] = useState([
    { id: 1, date: '2023-05-01', project: 'Website Redesign', task: 'Design Homepage', hours: 4.5, description: 'Created wireframes and mockups' },
    { id: 2, date: '2023-05-01', project: 'Mobile App', task: 'API Integration', hours: 3, description: 'Connected app to backend services' },
    { id: 3, date: '2023-05-02', project: 'Website Redesign', task: 'Development', hours: 6, description: 'Implemented homepage design' },
    { id: 4, date: '2023-05-03', project: 'Mobile App', task: 'Testing', hours: 5.5, description: 'Performed QA testing on new features' },
    { id: 5, date: '2023-05-04', project: 'Client Portal', task: 'Bug Fixes', hours: 2.5, description: 'Fixed reported issues' },
  ]);

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Timesheet</h1>
        <p className="text-gray-600 mt-2">Track and manage your work hours</p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 bg-white p-4 rounded-xl shadow-md">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">Week of May 1 - May 7, 2023</h2>
          <p className="text-gray-600">Total hours: <span className="font-bold">{totalHours}h</span></p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Export
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Entry
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.task}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{entry.hours}h</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">{entry.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="3" className="px-6 py-3 text-sm font-medium text-gray-900 text-right">Total:</td>
                <td className="px-6 py-3 text-sm font-bold text-gray-900">{totalHours}h</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FreelancerTimesheet;