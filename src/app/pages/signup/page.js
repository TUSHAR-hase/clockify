"use client";
import { useState } from "react";
import uplodecloudnery from "../../util/uploadtocloud";
import { useRouter } from "next/navigation";

const roleDetails = {
  freelancer: {
    label: "Freelancer (Solo User)",
    required: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      {
        name: "workspace",
        label: "Workspace Name",
        type: "text",
        placeholder: "ex: My Freelance Work",
      },
    ],
    optional: [
      { name: "country", label: "Country", type: "text" },
      { name: "timezone", label: "Timezone", type: "text" },
      { name: "profilePic", label: "Profile Picture", type: "file" },
    ],
  },
  client: {
    label: "Client (External)",
    required: [
      { name: "clientName", label: "Client Name", type: "text" },
      { name: "clientEmail", label: "Client Email", type: "email" },
    ],
    optional: [
      { name: "clientCompany", label: "Client Company", type: "text" },
      {
        name: "clientNotes",
        label: "Notes",
        type: "text",
        placeholder: "Billing address, contract ID",
      },
    ],
  },
  team: {
    label: "Team Member (Collaborator)",
    required: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
    ],
    optional: [
      {
        name: "role",
        label: "Role",
        type: "select",
        options: ["User", "Manager"],
      },
      {
        name: "billableRate",
        label: "Billable Rate",
        type: "number",
        placeholder: "₹/hr",
      },
    ],
  },
  admin: {
    label: "Admin / Owner (Workspace Creator)",
    required: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      { name: "workspace", label: "Workspace Name", type: "text" },
    ],
    optional: [
      { name: "industry", label: "Industry Type", type: "text" },
      {
        name: "teamEmails",
        label: "Team Members' Emails",
        type: "text",
        placeholder: "Comma separated",
      },
    ],
  },
};
export default function Register() {
  const [selectedRole, setSelectedRole] = useState("freelancer");
  const details = roleDetails[selectedRole];
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const FRONTEND_URL = process.env.NEXT_PUBLIC_BASE_URL;

  function handleChange(e) {
    const { name, value, files, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let profilePicUrl = "";
    // If there's a profilePic, upload to Cloudinary first, using your utility
    if (form.profilePic && typeof form.profilePic !== "string") {
      try {
        profilePicUrl = await uplodecloudnery(form.profilePic, (progress) => {
          // You can show progress in your UI as needed
          // Example: setProgress(progress)
        });
      } catch (err) {
        setLoading(false);
        alert("Image upload failed: " + err.message);
        return;
      }
    }

    // Prepare FormData to send to your backend (MongoDB: store only the URL!)
    const backendData = { role: selectedRole };

    [...details.required, ...details.optional].forEach((input) => {
      let val = form[input.name];
      if (input.name === "profilePic" && profilePicUrl) {
        backendData.profilePic = profilePicUrl;
      } else if (val !== undefined && val !== "") {
        backendData[input.name] = val;
      }
    });

    const res = await fetch(`${FRONTEND_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendData),
    });

    setLoading(false);

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.message || "Signup failed");
      }
    } else {
      alert("Signup failed, please try again");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-1">
            Create Account
          </h2>
          <p className="text-gray-600">
            Choose your role and fill in your details
          </p>
          <div className="flex justify-center mt-3 space-x-2">
            <div
              className={`h-2 w-8 rounded ${
                step === 1 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-2 w-8 rounded ${
                step === 2 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
          </div>
        </div>
        <div>
          {step === 1 ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Select Your Role
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(roleDetails).map(([key, role]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedRole(key)}
                    className={`border rounded-xl py-4 px-3 w-full mb-2 transition-all duration-300 text-left ${
                      selectedRole === key
                        ? "border-blue-500 bg-blue-50 shadow-md font-bold"
                        : "border-gray-200 hover:bg-blue-50"
                    }`}
                  >
                    <span>{role.label}</span>
                    <div className="text-xs text-gray-600">
                      {key === "freelancer" && "Track freelance times/projects"}
                      {key === "client" && "Get reports/invoices for clients"}
                      {key === "team" && "Collaborate on team projects"}
                      {key === "admin" && "Manage workspace, invite users"}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                Continue
              </button>
              <div className="text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <a
                  href="/pages/login"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Login
                </a>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mr-3 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="font-medium text-blue-800">
                  {details.label}
                </span>
              </div>
              {success ? (
                <div className="text-center py-12">
                  <div className="inline-block bg-green-100 rounded-full p-4 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Please check your email for verification instructions.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      router.push("/pages/login");
                      setStep(1);
                    }}
                    className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Continue with Login
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6">
                    {details.required.map((input) => (
                      <div key={input.name} className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                          {input.label} <span className="text-red-500">*</span>
                        </label>
                        {input.type === "select" ? (
                          <select
                            name={input.name}
                            required
                            value={form[input.name] || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select</option>
                            {input.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={input.type}
                            name={input.name}
                            required
                            value={
                              input.type === "file"
                                ? undefined
                                : form[input.name] || ""
                            }
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={input.placeholder || ""}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {details.optional.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Additional Information
                      </h3>
                      <div className="grid grid-cols-1 gap-6">
                        {details.optional.map((input) => (
                          <div key={input.name} className="space-y-2">
                            <label className="block text-gray-700 font-medium">
                              {input.label}
                            </label>
                            {input.type === "select" ? (
                              <select
                                name={input.name}
                                value={form[input.name] || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="">Select</option>
                                {input.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={input.type}
                                name={input.name}
                                value={
                                  input.type === "file"
                                    ? undefined
                                    : form[input.name] || ""
                                }
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder={input.placeholder || ""}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Create Account"}
                    </button>
                  </div>
                  <div className="text-center text-gray-600 text-sm mt-2">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      <footer className="text-center text-gray-500 mt-8 text-sm">
        &copy; 2025 ClockBase. All rights reserved.
      </footer>
    </div>
  );
}
