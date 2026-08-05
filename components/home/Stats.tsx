"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Stats() {
  const [volunteers, setVolunteers] = useState(0);

  useEffect(() => {
    async function getVolunteerCount() {
      const { count, error } = await supabase
        .from("volunteers")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.log("Supabase Error:", error);
        return;
      }

      console.log("Volunteer Count:", count);

      if (count !== null) {
        setVolunteers(count);
      }
    }

    getVolunteerCount();
  }, []);

  const stats = [
    {
      number: "21+",
      label: "Districts",
    },
    {
      number: "225+",
      label: "Communities",
    },
    {
      number: `${volunteers}+`,
      label: "Supporters",
    },
    {
      number: "2027",
      label: "Our Goal",
    },
  ];

  return (
    <section id="stats" className="bg-green-700 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Campaign Impact
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            Together we are building a stronger, safer and more prosperous
            Kebbi South.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm transition hover:scale-105"
            >
              <h3 className="text-5xl font-extrabold text-yellow-300">
                {item.number}
              </h3>

              <p className="mt-3 text-lg font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}