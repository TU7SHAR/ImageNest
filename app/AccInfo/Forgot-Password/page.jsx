"use client";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (email) {
      setMessage(
        "An OTP has been sent to your email. Please check your inbox."
      );
      setStep(2);
      setEmail("");
    } else {
      setMessage("Please enter your email address.");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp) {
      setMessage("OTP verified! Please enter your new password.");
      setStep(3);
      setOtp("");
    } else {
      setMessage("Please enter the OTP sent to your email.");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setMessage("Password changed successfully!");
        // Call API to change password here
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage("Passwords do not match.");
      }
    } else {
      setMessage("Please fill in both password fields.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        {message && <p className="text-center text-gray-600 mb-4">{message}</p>}
        {step === 1 ? (
          <form onSubmit={handleRequestOtp}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="youremail@example.com"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 
                         transition duration-200 ease-in-out"
            >
              Send OTP
            </button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 mb-2">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter OTP"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 
                         transition duration-200 ease-in-out"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="New Password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Confirm Password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 
                         transition duration-200 ease-in-out"
            >
              Change Password
            </button>
          </form>
        )}
        <div className="text-center mt-4">
          <a href="/Login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
