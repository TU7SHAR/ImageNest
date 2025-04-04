"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const register = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/AccInfo");
    }
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    try {
      const response = await axios.post("/api/createUser", form);
      if (response.status === 201) {
        const { user, token, message } = response.data;
        console.log("Registration successful:", message);
        console.log("User data:", user);
        localStorage.setItem("token", token);
        router.push("/");
      }
    } catch (error) {
      if (error.response.status === 403) {
        alert(error.response.data.message);
      }
      if (error.response.status === 500) {
        alert(error.response.data.message);
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Your username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="123-456-7890"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Re-Type Password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/Login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default register;
