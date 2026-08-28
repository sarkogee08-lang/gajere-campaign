"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import DashboardStats from "@/components/admin/DashboardStats";
import VolunteerTable from "@/components/admin/VolunteerTable";

export default function DashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-6 shadow">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Gajere 2027 Campaign Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Monitor volunteer registrations and campaign activities.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

        <DashboardStats />

        <div className="mt-10 rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Recent Volunteer Registrations
          </h2>

          <VolunteerTable />

        </div>

      </div>
    </main>
  );
}
