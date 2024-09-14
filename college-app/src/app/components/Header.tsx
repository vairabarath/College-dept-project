"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  // Handle logout button click
  const handleLogoutClick = async () => {
    try {
      await axios.get("/api/logout");
      console.log("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout error:", error.message);
    }
  };

  return (
    <header className="bg-slate-300 h-20 flex items-center px-4 lg:px-8 shadow-md">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">LOGO</h1>
        </div>

        <div>
          {currentPath !== "/login" && (
            <Button
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              onClick={handleLogoutClick}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
