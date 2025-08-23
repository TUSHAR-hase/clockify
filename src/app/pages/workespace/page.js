"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaUsers,
  FaProjectDiagram,
  FaClock,
  FaChartBar,
  FaEdit,
  FaTrash,
  FaCog,
  FaUserPlus,
  FaCalendarAlt,
  FaTasks,
} from "react-icons/fa";
import { FiSearch, FiMoreVertical, FiActivity } from "react-icons/fi";
import DeleteConfirmModal from "../../components/ConfrimToDelete.js";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const FRONTEND_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${FRONTEND_URL}/api/workspace`);
      const data = await res.json();

      console.log("data", data);

      if (res.ok) {
        setWorkspaces(data.workspaces || []);
      } else {
        setError(data.message || "Failed to fetch workspaces");
      }
    } catch (err) {
      setError("Network error. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  const createWorkspace = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Workspace name is required");
      return;
    }

    try {
      const res = await fetch(`${FRONTEND_URL}/api/workspace`, {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setWorkspaces([...workspaces, data.workspace]);
        setName("");
        setSuccess("Workspace created successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Failed to create workspace");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleOpenModal = (workspace) => {
    setSelectedWorkspace(workspace);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedWorkspace) return;

    setDeleteLoading(true);
    console.log("Deleting workspace: ", selectedWorkspace);

    try {
      const res = await fetch(`${FRONTEND_URL}/api/workspace`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedWorkspace),
      });

      if (res.ok) {
        setWorkspaces(
          workspaces.filter((ws) => ws._id !== selectedWorkspace._id)
        );
        setSuccess("Workspace deleted successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete workspace");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setDeleteLoading(false);
      setModalOpen(false);
      setSelectedWorkspace(null);
    }
  };

  // Sample workspace data with enhanced details
  const enhancedWorkspaces = workspaces.map(ws => ({
    ...ws,
    stats: {
      totalProjects: Math.floor(Math.random() * 10) + 1,
      activeMembers: Math.floor(Math.random() * 15) + 1,
      hoursThisWeek: Math.floor(Math.random() * 100) + 20,
      completedTasks: Math.floor(Math.random() * 50) + 10,
    },
    recentActivity: [
      { user: "John Doe", action: "completed task", time: "2 hours ago" },
      { user: "Sarah Parker", action: "started project", time: "4 hours ago" },
      { user: "Mike Kim", action: "joined workspace", time: "1 day ago" },
    ]
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workspace Management</h1>
          <p className="text-gray-600">Create and manage workspaces to organize remote teams and track productivity</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workspaces</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{workspaces.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaProjectDiagram className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {enhancedWorkspaces.reduce((acc, ws) => acc + ws.stats.activeMembers, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours This Week</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {enhancedWorkspaces.reduce((acc, ws) => acc + ws.stats.hoursThisWeek, 0)}h
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaClock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {enhancedWorkspaces.reduce((acc, ws) => acc + ws.stats.completedTasks, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaTasks className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Success and Error Messages */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </motion.div>
        )}

        {/* Create Workspace Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaPlus className="w-5 h-5 mr-2 text-blue-600" />
              Create New Workspace
            </h2>
          </div>
          <form onSubmit={createWorkspace} className="space-y-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Marketing Team, Development Squad"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center"
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Create Workspace
              </button>
            </div>
          </form>
        </div>

        {/* Workspaces List */}
        {enhancedWorkspaces.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enhancedWorkspaces.map(ws => (
              <motion.div
                key={ws._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{ws.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="w-4 h-4 mr-1" />
                        <span>Created {new Date(ws.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedWorkspace(ws)}
                        className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                        aria-label="Workspace settings"
                      >
                        <FaCog className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(ws)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Delete workspace"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Workspace Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">{ws.stats.totalProjects}</p>
                          <p className="text-xs text-blue-600">Projects</p>
                        </div>
                        <FaProjectDiagram className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-900">{ws.stats.activeMembers}</p>
                          <p className="text-xs text-green-600">Members</p>
                        </div>
                        <FaUsers className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-900">{ws.stats.hoursThisWeek}h</p>
                          <p className="text-xs text-purple-600">This Week</p>
                        </div>
                        <FaClock className="w-5 h-5 text-purple-500" />
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-900">{ws.stats.completedTasks}</p>
                          <p className="text-xs text-orange-600">Tasks Done</p>
                        </div>
                        <FaTasks className="w-5 h-5 text-orange-500" />
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <FiActivity className="w-4 h-4 mr-1" />
                      Recent Activity
                    </h4>
                    <div className="space-y-2">
                      {ws.recentActivity.slice(0, 2).map((activity, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                          <span className="text-gray-400 ml-1">• {activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => router.push(`/pages/workespace/${ws._id}/manage`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center"
                    >
                      <FaCog className="w-4 h-4 mr-1" />
                      Manage Workspace
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors flex items-center">
                      <FaUserPlus className="w-4 h-4 mr-1" />
                      Invite Members
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaProjectDiagram className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No workspaces yet</h3>
            <p className="text-gray-500 mb-6">Create your first workspace to start organizing your remote team and tracking productivity</p>
            <button
              onClick={() => document.querySelector('input[type="text"]').focus()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center mx-auto"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Create Your First Workspace
            </button>
          </motion.div>
        )}

        {/* Workspace Detail Modal */}
        {selectedWorkspace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Workspace Settings</h3>
                <button
                  onClick={() => setSelectedWorkspace(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Workspace Name</h4>
                  <input
                    type="text"
                    value={selectedWorkspace.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Workspace Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedWorkspace.stats.totalProjects}</p>
                          <p className="text-sm text-gray-600">Total Projects</p>
                        </div>
                        <FaProjectDiagram className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedWorkspace.stats.activeMembers}</p>
                          <p className="text-sm text-gray-600">Active Members</p>
                        </div>
                        <FaUsers className="w-8 h-8 text-green-500" />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedWorkspace.stats.hoursThisWeek}h</p>
                          <p className="text-sm text-gray-600">Hours This Week</p>
                        </div>
                        <FaClock className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedWorkspace.stats.completedTasks}</p>
                          <p className="text-sm text-gray-600">Completed Tasks</p>
                        </div>
                        <FaTasks className="w-8 h-8 text-orange-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    {selectedWorkspace.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-blue-600">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-8">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <FaEdit className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                  <FaUserPlus className="w-4 h-4 mr-2" />
                  Invite Members
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedWorkspace?.name || ""}
          loading={deleteLoading}
        />
      </div>
    </div>
  );
}
