"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [getUsername, setGetUsername] = useState("loading");
  const [getRole, setGetRole] = useState("loading");

  const router = useRouter();

  const getUserName = async () => {
    const response = await axios.get("api/user");
    console.log(response);
    setGetUsername(response.data.data.username);
    setGetRole(response.data.data.role);
  };
  useEffect(() => {
    getUserName();
  }, []);
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/logout");

      console.log("Logged out successfully", response);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h2 className="  text-4xl">Dashboard</h2>
      <h3 className=" text-3xl mt-4">
        {getUsername === "loading" ? "loading" : getUsername}
      </h3>
      <h3 className=" text-3xl bg-green-700 mt-4">
        {getRole === "loading" ? "loading" : getRole}
      </h3>
      <button
        onClick={onLogout}
        className="p-2 mt-4 bg-red-600 cursor-pointer rounded hover:bg-red-400"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
