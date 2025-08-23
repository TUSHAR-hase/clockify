"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  loading = false,
  successMessage,
  errorMessage,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-96 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h2>

            {/* Modal Message */}
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{itemName}</span>? This action
              cannot be undone.
            </p>

            {/* Success/Error Messages */}
            {successMessage && (
              <p className="text-green-600 mb-4">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
