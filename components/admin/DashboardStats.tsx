"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardStats() {
  const [totalVolunteers, setTotalVolunteers] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { count, error } = await supabase
      .from("volunteers")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (!error) {
      setTotalVolunteers(count || 0);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-gray-500">Total Volunteers</p>

        <h2 className="mt-2 text-4xl font-bold text-green-700">
          {totalVolunteers}
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-gray-500">LGAs Covered</p>

        <h2 className="mt-2 text-4xl font-bold text-blue-700">
          Coming Soon
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-gray-500">Occupations</p>

        <h2 className="mt-2 text-4xl font-bold text-purple-700">
          Coming Soon
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-gray-500">Today's Registrations</p>

        <h2 className="mt-2 text-4xl font-bold text-red-700">
          Coming Soon
        </h2>
      </div>
    </div>
  );
}