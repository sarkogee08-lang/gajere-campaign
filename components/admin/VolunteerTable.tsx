"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Volunteer = {
  Name: string;
  Email: string;
  "Phone No.": string;
  "L.G.A": string;
  Occupation: string;
  Message: string;
};

export default function VolunteerTable() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  async function fetchVolunteers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("Name", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setVolunteers(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <p className="text-gray-500">Loading volunteers...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Volunteer List
      </h2>

      {volunteers.length === 0 ? (
        <p className="text-gray-500">
          No volunteers have registered yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">LGA</th>
                <th className="p-3 text-left">Occupation</th>
                <th className="p-3 text-left">Message</th>
              </tr>
            </thead>

            <tbody>
              {volunteers.map((volunteer, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {volunteer.Name}
                  </td>

                  <td className="p-3">
                    {volunteer.Email}
                  </td>

                  <td className="p-3">
                    {volunteer["Phone No."]}
                  </td>

                  <td className="p-3">
                    {volunteer["L.G.A"]}
                  </td>

                  <td className="p-3">
                    {volunteer.Occupation}
                  </td>

                  <td className="p-3 max-w-sm">
                    {volunteer.Message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}