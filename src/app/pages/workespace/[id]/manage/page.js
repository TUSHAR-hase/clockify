"use client";

import { useState, Fragment, useEffect } from "react";
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
import { useParams } from "next/navigation";
import {useAuth} from '../../../../components/AuthProvider.js'

export default function ManageWorkspacePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("members");

  const [workspace, setWorkspace] = useState(null);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [pendingInvites, setPendingInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [actionType, setActionType] = useState(""); // 'resend' or 'cancel'
  const [toasts, setToasts] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);


console.log(user)
  // Fetch workspace
  useEffect(() => {
    if (!id) return;

    const fetchWorkspace = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/workspace/${id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setWorkspace(data.workspace || {});
        // console.log("response",data.workspace.members)
        setMembers(data.workspace?.members || []);
      } catch (err) {
        showToast(err.message || "Failed to load workspace", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [id]);

  // Fetch pending invites
  useEffect(() => {
    async function fetchInvites() {
      try {
        const res = await fetch("/api/workspace/invite/pending", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspaceId: id }),
        });
        const data = await res.json();
        console.log("invite", data);
        if (data.success) setPendingInvites(data.invites);
      } catch (err) {
        console.error(err);
      }
    }
    fetchInvites();
  }, [id]);

  // Toast helper
  const showToast = (message, type = "success") => {
    const toastId = Date.now();
    setToasts((prev) => [...prev, { id: toastId, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 3000);
  };

  // Invite handling
  const handleInvite = async () => {
    if (!inviteEmail) {
      showToast("Please enter an email", "error");
      return;
    }
    try {
      const res = await fetch("/api/workspace/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inviteEmail,
          workspaceId: workspace?._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Invitation sent to ${inviteEmail}`);
        setInviteEmail("");
      } else {
        showToast(data.error || "Failed to send invite", "error");
      }
    } catch {
      showToast("Something went wrong while sending the invite", "error");
    }
  };

  // Resend / Cancel invite
  const handleResend = async (inviteId) => {
    setLoadingId(inviteId);
    setActionType("resend");
    try {
      const res = await fetch("/api/workspace/invite/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId }),
      });
      const data = await res.json();
      if (data.success) showToast("Invite resent successfully!");
      else showToast(data.error || "Failed to resend invite", "error");
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setLoadingId(null);
      setActionType("");
    }
  };

  const handleCancel = async (inviteId) => {
    setLoadingId(inviteId);
    setActionType("cancel");
    try {
      const res = await fetch(`/api/workspace/invite/cancel/${inviteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPendingInvites((prev) => prev.filter((i) => i._id !== inviteId));
        showToast("Invite cancelled");
      } else showToast(data.error || "Failed to cancel invite", "error");
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setLoadingId(null);
      setActionType("");
    }
  };

  // Members filter
  const filteredMembers = members.filter((m) => {
    const search = searchTerm.toLowerCase();
    return (
      m.name?.toLowerCase().includes(search) ||
      m.email?.toLowerCase().includes(search)
    );
  });

  // Member removal
  const confirmRemoveMember = (member) => {
    setMemberToRemove(member);
    setShowRemoveModal(true);
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;
  
    try {
      setLoading(true);
  
      const res = await fetch(`/api/workspace/${id}/members/${memberToRemove._id}`, {
        method: "DELETE",
      });
  
      const data = await res.json();
  
      if (res.ok && data.success) {
        setMembers(members.filter((m) => m._id !== memberToRemove._id));
        showToast("Member removed successfully", "warning");
      } else {
        showToast(data.error || "Failed to remove member", "error");
      }
    } catch (error) {
      console.error("Error removing member:", error);
      showToast("Server error", "error");
    } finally {
      setShowRemoveModal(false);
      setLoading(false);
    }
  };
  

  // Workspace delete
  const handleDelete = async () => {
    if (!workspace?._id) return;

    try {
      const res = await fetch(`/api/workspace/${workspace._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        showToast("Workspace deleted!", "error");
        router.push("/workspaces");
      } else {
        showToast(data.error || "Failed to delete workspace", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  // Workspace save
  const handleSave = () => showToast("Workspace settings updated!");



  const handleLogout = async () => {
    try {
      await logout();
      router.push("/pages/login"); // ✅ Don't use /pages/login in Next.js 13 App Router
    } catch (error) {
      console.error("Logout failed:", error);
      showToast("Logout failed. Please try again.", "error");
    }
  };
  
  

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
    <div className="min-h-screen bg-gray-100">
      {/* Toast Container */}
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

      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-xl font-bold">
            {workspace?.name
              ? `${workspace.name} Workspace`
              : "Manage Workspace"}
          </h1>
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
            src={user.profilePic}
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

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Members Tab */}
        {activeTab === "members" && (
          <>
            {/* Members Section */}
            <section className="bg-white rounded-lg shadow p-6">
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
                          key={member._id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="py-3 px-4 border-t">{member.name}</td>
                          <td className="py-3 px-4 border-t">{member.email}</td>
                          <td className="py-3 px-4 border-t">
                            <select
                              value={member.role || "Owner"}
                              onChange={(e) => {
                                const updatedMembers = members.map((m) =>
                                  m._id === member._id
                                    ? { ...m, role: e.target.value }
                                    : m
                                );
                                setMembers(updatedMembers);
                              }}
                              className="border rounded px-2 py-1 focus:ring focus:ring-blue-300"
                            >
                              <option>Admin</option>
                              <option>Excutive member</option>
                              <option>Member</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 border-t text-center">
                            {member.role !== "Admin" && (
                              <button
                                onClick={() => confirmRemoveMember(member)}
                                className="text-red-500 hover:text-red-700 transition"
                              >
                                <Trash className="w-5 h-5" />
                              </button>
                            )}
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

            {/* Invite Section */}
            <section className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Invite Members</h3>
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
                  disabled={loading}
                  className={`bg-green-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-700"
                  }`}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" /> Invite
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Pending Invites Section */}
            <section className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Pending Invites</h3>
              {pendingInvites.length === 0 ? (
                <p className="text-gray-500">No pending invites.</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingInvites.map((invite) => {
                      const isExpired =
                        new Date(invite.expiresAt) <= new Date();
                      const isAccepted = invite.accepted === true;
                      const isLoading = loadingId === invite._id;

                      return (
                        <tr key={invite._id} className="border-b">
                          <td className="p-2">{invite.email}</td>

                          <td
                            className={`p-2 ${
                              isAccepted
                                ? "text-green-600"
                                : isExpired
                                  ? "text-red-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {isAccepted
                              ? "Accepted"
                              : isExpired
                                ? "Expired"
                                : "Pending"}
                          </td>

                          <td className="p-2 flex gap-2">
                            {!isAccepted && (
                              <>
                                <button
                                  onClick={() => handleResend(invite._id)}
                                  disabled={isExpired || isLoading}
                                  className={`${
                                    isExpired || isLoading
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "text-blue-600 hover:underline"
                                  }`}
                                >
                                  {isLoading && actionType === "resend"
                                    ? "Resending..."
                                    : "Resend"}
                                </button>

                                <button
                                  onClick={() => handleCancel(invite._id)}
                                  disabled={isLoading}
                                  className={`${
                                    isLoading
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "text-red-600 hover:underline"
                                  }`}
                                >
                                  {isLoading && actionType === "cancel"
                                    ? "Cancelling..."
                                    : "Cancel"}
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}

        {/* Workspace Settings Tab */}
        {activeTab === "settings" && (
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
                  value={workspace?.name || ""}
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
                  value={workspace?.description || ""}
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
                  value={workspace?.visibility || "Private"}
                  onChange={(e) =>
                    setWorkspace({ ...workspace, visibility: e.target.value })
                  }
                  className="border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                >
                  <option>Private</option>
                  <option>Public</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                <Save className="w-5 h-5 mr-2 inline" /> Save Changes
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              >
                <Trash className="w-5 h-5 mr-2 inline" /> Delete Workspace
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Remove Member Modal */}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Remove Member
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to remove {memberToRemove?.name}?
                      This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                      onClick={() => setShowRemoveModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={handleRemoveMember}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Workspace
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this workspace? This
                      action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={handleDelete}
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
