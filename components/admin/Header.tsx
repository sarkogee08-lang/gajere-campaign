"use client";

import { Bell, Search, UserCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.replace("/login");
  }

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome back, Administrator
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-green-700"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-gray-100">
          <Bell size={22} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Admin */}
        <div className="flex items-center gap-2">
          <UserCircle
            size={38}
            className="text-green-700"
          />

          <div className="hidden md:block">
            <p className="font-semibold">Admin</p>
            <p className="text-xs text-gray-500">
              Campaign Manager
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </header>
  );
}