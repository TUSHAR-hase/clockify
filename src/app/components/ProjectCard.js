// src/components/ProjectsTable.js
import React from 'react';

const ProjectsTable = () => {
  const projects = [
    { id: 1, name: 'Website Redesign', client: 'ABC Corp', hours: 42, status: 'Active' },
    { id: 2, name: 'Mobile App', client: 'XYZ Inc', hours: 78, status: 'Active' },
    { id: 3, name: 'E-commerce Platform', client: 'Retail Co', hours: 120, status: 'Completed' },
    { id: 4, name: 'API Integration', client: 'Tech Solutions', hours: 36, status: 'On Hold' },
    { id: 5, name: 'Dashboard Design', client: 'Analytics Ltd', hours: 64, status: 'Active' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">ID: PROJ-{project.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.hours}h</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-gray-600 hover:text-gray-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{projects.length}</span> of{' '}
            <span className="font-medium">{projects.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Previous</button>
            <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTable;