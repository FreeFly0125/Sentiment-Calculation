/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { feedbackService } from "../services/api";

const UserDashboard = () => {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const username: string | null = localStorage.getItem("username");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await feedbackService.submitFeedback(feedback, username);
      setMessage("Feedback submitted successfully!");
      setFeedback("");
      setError("");
    } catch (err) {
      setError("Error submitting feedback");
      setMessage("");
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">User Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Submit Your Feedback
              </h3>
              {message && (
                <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
                  {message}
                </div>
              )}
              {error && (
                <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-5">
                <div>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Enter your feedback here (max 1000 characters)"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    maxLength={1000}
                    required
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
