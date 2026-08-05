"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Newspaper,
  Image,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Volunteers",
    href: "/admin/volunteers",
    icon: Users,
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    name: "News",
    href: "/admin/news",
    icon: Newspaper,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: Mail,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-green-800 text-white">
      <div className="border-b border-green-700 p-6">
        <h1 className="text-2xl font-bold">GAJERE 2027</h1>
        <p className="text-sm text-green-200">Campaign Admin</p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-white text-green-800"
                  : "hover:bg-green-700"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button className="m-4 flex items-center gap-3 rounded-lg border border-green-600 px-4 py-3 hover:bg-green-700">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}