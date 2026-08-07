"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardStats() {

  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [totalLGAs, setTotalLGAs] = useState(0);
  const [totalOccupations, setTotalOccupations] = useState(0);
  const [todayRegistrations, setTodayRegistrations] = useState(0);



  useEffect(() => {
    fetchStats();
  }, []);



  async function fetchStats() {


    // Total volunteers
    const { count: volunteersCount } = await supabase
      .from("volunteers")
      .select("*", {
        count: "exact",
        head: true,
      });



    setTotalVolunteers(volunteersCount || 0);



    // Get volunteer details
    const { data } = await supabase
      .from("volunteers")
      .select(
        "lga, occupation, created_at"
      );



    if (data) {


      // Unique LGAs
      const lgas = new Set(
        data.map((item) => item.lga)
      );


      setTotalLGAs(lgas.size);



      // Unique occupations
      const occupations = new Set(
        data.map((item) => item.occupation)
      );


      setTotalOccupations(
        occupations.size
      );



      // Today's registrations

      const today = new Date()
        .toISOString()
        .split("T")[0];


      const todayCount = data.filter(
        (item) =>
          item.created_at?.startsWith(today)
      );


      setTodayRegistrations(
        todayCount.length
      );

    }

  }



  return (

    <div className="grid gap-6 md:grid-cols-4">


      <div className="rounded-2xl bg-white p-6 shadow">

        <p className="text-gray-500">
          Total Volunteers
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-700">
          {totalVolunteers}
        </h2>

      </div>



      <div className="rounded-2xl bg-white p-6 shadow">

        <p className="text-gray-500">
          LGAs Covered
        </p>

        <h2 className="mt-2 text-4xl font-bold text-blue-700">
          {totalLGAs}
        </h2>

      </div>




      <div className="rounded-2xl bg-white p-6 shadow">

        <p className="text-gray-500">
          Occupations
        </p>

        <h2 className="mt-2 text-4xl font-bold text-purple-700">
          {totalOccupations}
        </h2>

      </div>




      <div className="rounded-2xl bg-white p-6 shadow">

        <p className="text-gray-500">
          Today's Registrations
        </p>

        <h2 className="mt-2 text-4xl font-bold text-red-700">
          {todayRegistrations}
        </h2>

      </div>


    </div>

  );
}