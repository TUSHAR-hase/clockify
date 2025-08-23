"use client";

import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  Settings,
  Trash,
  UserPlus,
  Save,
  LogOut,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";

export default function ManageWorkspacePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("members");
  const [workspace, setWorkspace] = useState({});

  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Owner" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    { id: 3, name: "David Wilson", email: "david@example.com", role: "Member" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [toasts, setToasts] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleInvite = () => {
    if (inviteEmail) {
      showToast(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
    }
  };

  const confirmRemoveMember = (member) => {
    setMemberToRemove(member);
    setShowRemoveModal(true);
  };

  const handleRemoveMember = () => {
    if (memberToRemove) {
      setMembers(members.filter((m) => m.id !== memberToRemove.id));
      showToast("Member removed successfully", "warning");
    }
    setShowRemoveModal(false);
  };

  const handleSave = () => {
    showToast("Workspace settings updated!");
  };

  const confirmDeleteWorkspace = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    showToast("Workspace deleted!", "error");
    router.push("/workspaces");
  };

  const handleLogout = () => {
    showToast("Logged out!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`px-4 py-3 rounded shadow-md text-white ${
                toast.type === "success"
                  ? "bg-green-600"
                  : toast.type === "error"
                    ? "bg-red-600"
                    : "bg-yellow-500"
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ✅ Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-xl font-bold">Manage Workspace</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2 rounded-md font-medium transition ${
              activeTab === "members"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-md font-medium transition ${
              activeTab === "settings"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Workspace Settings
          </button>
        </div>

        {/* User + Logout */}
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* ✅ Main Content */}
      <div className="p-6 space-y-6">
        {/* ✅ Members Tab */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeTab === "members"
              ? "opacity-100 translate-y-0 block"
              : "opacity-0 translate-y-2 hidden"
          }`}
        >
          <section className="bg-white rounded-lg shadow p-6">
            {/* Header + Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Users className="w-6 h-6" /> Members
              </h2>
              <div className="relative w-full md:w-1/3">
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Members Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm text-gray-600">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4 border-t">{member.name}</td>
                        <td className="py-3 px-4 border-t">{member.email}</td>
                        <td className="py-3 px-4 border-t">
                          <select
                            value={member.role}
                            onChange={(e) => {
                              const updatedMembers = members.map((m) =>
                                m.id === member.id
                                  ? { ...m, role: e.target.value }
                                  : m
                              );
                              setMembers(updatedMembers);
                            }}
                            className="border rounded px-2 py-1 focus:ring focus:ring-blue-300"
                          >
                            <option>Owner</option>
                            <option>Admin</option>
                            <option>Member</option>
                            <option>Guest</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 border-t text-center">
                          <button
                            onClick={() => confirmRemoveMember(member)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500"
                      >
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ✅ Invite Section */}
          <section className="bg-white rounded-lg shadow p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4">Invite Members</h3>
            <p className="text-gray-500 mb-4">
              Add new members by sending them an invitation via email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleInvite}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition"
              >
                <UserPlus className="w-5 h-5" /> Invite
              </button>
            </div>
          </section>
        </div>

        {/* ✅ Workspace Settings Tab */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeTab === "settings"
              ? "opacity-100 translate-y-0 block"
              : "opacity-0 translate-y-2 hidden"
          }`}
        >
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6" /> Workspace Settings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspace.name}
                  onChange={(e) =>
                    setWorkspace({ ...workspace, name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={workspace.description}
                  onChange={(e) =>
                    setWorkspace({ ...workspace, description: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Visibility
                </label>
                <select
                  value={workspace.visibility}
                  onChange={(e) =>
                    setWorkspace({ ...workspace, visibility: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Custom Domain
                </label>
                <input
                  type="text"
                  placeholder="yourdomain.com"
                  value={workspace.customDomain}
                  onChange={(e) =>
                    setWorkspace({ ...workspace, customDomain: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring 
focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={workspace.notifications}
                    onChange={(e) =>
                      setWorkspace({
                        ...workspace,
                        notifications: e.target.checked,
                      })
                    }
                  />
                  Enable Notifications
                </label>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </section>

          {/* Danger Zone */}
          <section className="bg-white rounded-lg shadow p-6 border border-red-300 mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-600 flex items-center gap-2">
              <Trash className="w-6 h-6" /> Danger Zone
            </h2>
            <p className="text-gray-600 mb-4">
              Deleting this workspace will remove all associated projects and
              members. This action cannot be undone.
            </p>
            <button
              onClick={confirmDeleteWorkspace}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Delete Workspace
            </button>
          </section>
        </div>
      </div>

      {/* ✅ Remove Member Modal */}
      <Transition appear show={showRemoveModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowRemoveModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                  <Dialog.Title className="text-lg font-bold mb-2">
                    Remove Member
                  </Dialog.Title>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to remove{" "}
                    <strong>{memberToRemove?.name}</strong>?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowRemoveModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRemoveMember}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* ✅ Delete Workspace Modal */}
      <Transition appear show={showDeleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowDeleteModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full"
                >
                  <Dialog.Title className="text-lg font-bold mb-2">
                    Remove Member
                  </Dialog.Title>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to remove{" "}
                    <strong>{memberToRemove?.name}</strong>?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowRemoveModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRemoveMember}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Workspace Modal */}
      <Transition appear show={showDeleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowDeleteModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full"
                >
                  <Dialog.Title className="text-lg font-bold mb-2">
                    Delete Workspace
                  </Dialog.Title>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete this workspace? This action
                    cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        showToast("Workspace deleted", "error");
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
