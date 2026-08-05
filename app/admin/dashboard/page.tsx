"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  Users,
  Calendar,
  Newspaper,
  Image as ImageIcon,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import VolunteerTable from "@/components/admin/VolunteerTable";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setLoading(false);
    }

    checkSession();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome to the Gajere 2027 Campaign Management System.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Volunteers"
          value={0}
          icon={<Users size={28} />}
        />

        <StatCard
          title="Events"
          value={0}
          icon={<Calendar size={28} />}
          color="bg-blue-600"
        />

        <StatCard
          title="News"
          value={0}
          icon={<Newspaper size={28} />}
          color="bg-orange-500"
        />

        <StatCard
          title="Gallery"
          value={0}
          icon={<ImageIcon size={28} />}
          color="bg-purple-600"
        />
      </div>

      <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900">
          Recent Activity
        </h2>

        <p className="mt-4 text-gray-600">
          Volunteer registrations, campaign news, gallery uploads and
          upcoming events will appear here.
        </p>
      </div>

      <div className="mt-10">
        <VolunteerTable />
      </div>
    </div>
  );
}