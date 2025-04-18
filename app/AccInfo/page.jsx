"use client";
import React from "react";
import withAuth from "../withAuth/page";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = ({ decoded }) => {
  const router = useRouter();
  const user = {
    id: decoded?.id || "Undefined",
    username: decoded?.name || "Undefined",
    email: decoded?.email || "Undefined",
    mobile: decoded?.mobile || "Undefined",
    createdAt: decoded?.createdAt
      ? `${new Date(decoded.createdAt).toLocaleDateString()} at ${new Date(
          decoded.createdAt
        ).toLocaleTimeString()}`
      : "Undefined",
    sessionEndsAt: decoded?.exp
      ? new Date(decoded.exp * 1000).toLocaleDateString()
      : "Undefined",
  };

  const handleDeleteAcc = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete("api/deleteUser", {
        data: { _id: decoded.id },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        alert("Account deleted successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again after sometime .");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    router.push("/");
  };

  const handleEdit = () => {
    router.push("/AccInfo/Change-Password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Account Information
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">User ID:</span>
            <span className="text-gray-600">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Username:</span>
            <span className="text-gray-600">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-600">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Mobile Number:</span>
            <span className="text-gray-600">{user.mobile}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Account Created:</span>
            <span className="text-gray-600">{user.createdAt}</span>
          </div>{" "}
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Session Ends At:</span>
            <span className="text-gray-600">{user.sessionEndsAt}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
            >
              Logout
            </button>
          </div>
          <button
            className="flex items-center justify-center px-2 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
            onClick={handleDeleteAcc}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);
