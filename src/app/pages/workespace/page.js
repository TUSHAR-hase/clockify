"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workspaces</h1>
          <p className="text-gray-600">
            Create and manage your workspaces to organize your projects
          </p>
        </div>

        {/* Success and Error Messages */}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Create Workspace Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create New Workspace
          </h2>
          <form
            onSubmit={createWorkspace}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-grow">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workspace name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Create Workspace
            </button>
          </form>
        </div>

        {/* Workspaces List */}
        {workspaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((ws) => (
              <div
                key={ws._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {ws.name}
                    </h3>
                    <button
                      onClick={() => handleOpenModal(ws)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete workspace"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Owner: You</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>{ws.members?.length || 0} members</span>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <button
                    onClick={() => router.push(`/pages/workespace/${ws._id}/manage`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    Manage Workspace
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No workspaces yet
            </h3>
            <p className="text-gray-500">
              Create your first workspace to get started
            </p>
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
