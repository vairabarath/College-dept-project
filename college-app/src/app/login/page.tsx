"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("submiting login");
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      console.log("Login successful", response.data);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Login failed:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {loading ? "Processing" : "Login"}
        </h2>
        <form className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            onClick={onSubmitLogin}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <Link href="/register" className="text-black text-center">
          Visit register page
        </Link>
      </div>
    </div>
  );
}
