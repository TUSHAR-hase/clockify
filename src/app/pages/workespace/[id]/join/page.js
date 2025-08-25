"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JoinWorkspaceClient() {
  const { id: workspaceId } = useParams(); // ✅ Get dynamic route param
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [toast, setToast] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"

  const token = searchParams.get("token");

  useEffect(() => {
    if (!workspaceId) {
      setMessage("Invalid workspace.");
      setStatus("error");
      setLoading(false);
      return;
    }

    const joinWorkspace = async () => {
      if (!token) {
        showToast("Invalid or missing token.", "error");
        setMessage("Invalid or missing token.");
        setStatus("error");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/workspace/${workspaceId}/join?token=${token}`, {
          method: "POST",
        });

        const data = await res.json();

        console.log(data.error)

        if(data.error==="User not found"){
          router.push("/pages/signup")
        }

        if (data.success) {
          showToast("You have joined the workspace!", "success");
          setMessage("You have joined the workspace!");
          setStatus("success");
          startCountdown(data.workspaceId);
        } else {
          showToast(data.error || "Failed to join workspace", "error");
          setMessage(data.error || "Failed to join workspace");
          setStatus("error");
        }
      } catch (error) {
        showToast("Something went wrong. Please try again.", "error");
        setMessage("Something went wrong. Please try again.");
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    joinWorkspace();
  }, [workspaceId, token]);

  const startCountdown = (workspaceId) => {
    let timer = 3;
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
      timer--;
      if (timer === 0) {
        clearInterval(interval);
        router.push(`/workspace/${workspaceId}`);
      }
    }, 1000);
  };

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600 text-lg">Joining workspace...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-green-500 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-green-600">{message}</h1>
        <p className="mt-2 text-gray-500">
          Redirecting in <span className="font-bold">{countdown}</span> seconds...
        </p>
        <div className="w-64 h-2 bg-gray-200 rounded-full mt-4">
          <div
            className="h-2 bg-green-500 rounded-full transition-all duration-1000"
            style={{ width: `${(countdown / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-semibold text-red-600">{message}</h1>
      <p className="mt-2 text-gray-500">Please check your invite link and try again.</p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Home
      </button>

      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-gray-700"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

