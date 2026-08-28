"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
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
  const [search, setSearch] = useState("");
  const [selectedLga, setSelectedLga] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);

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
      console.error("Volunteer fetch error:", error);
      setVolunteers([]);
    } else {
      setVolunteers(data || []);
    }

    setLoading(false);
  }

  function handleExport() {
    if (filteredVolunteers.length === 0) {
      alert("There are no volunteers to export.");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "LGA",
      "Occupation",
      "Message",
    ];

    const rows = filteredVolunteers.map((volunteer) => [
      volunteer.Name || "",
      volunteer.Email || "",
      volunteer["Phone No."] || "",
      volunteer["L.G.A"] || "",
      volunteer.Occupation || "",
      volunteer.Message || "",
    ]);

    const escapeCsvValue = (value: string) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [
      headers.map(escapeCsvValue).join(","),
      ...rows.map((row) => row.map(escapeCsvValue).join(",")),
    ].join("\r\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `gajere-volunteers-${new Date()
      .toISOString()
      .split("T")[0]}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  async function handleRefresh() {
    setRefreshing(true);

    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("Name", { ascending: true });

    if (error) {
      console.error("Volunteer refresh error:", error);
    } else {
      setVolunteers(data || []);
    }

    setRefreshing(false);
  }

  const lgas = useMemo(() => {
    return Array.from(
      new Set(
        volunteers
          .map((volunteer) => volunteer["L.G.A"])
          .filter(Boolean)
      )
    ).sort();
  }, [volunteers]);

  const filteredVolunteers = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return volunteers.filter((volunteer) => {
      const matchesSearch =
        !searchTerm ||
        volunteer.Name?.toLowerCase().includes(searchTerm) ||
        volunteer.Email?.toLowerCase().includes(searchTerm) ||
        volunteer["Phone No."]?.toLowerCase().includes(searchTerm) ||
        volunteer["L.G.A"]?.toLowerCase().includes(searchTerm) ||
        volunteer.Occupation?.toLowerCase().includes(searchTerm);

      const matchesLga =
        selectedLga === "All" ||
        volunteer["L.G.A"] === selectedLga;

      return matchesSearch && matchesLga;
    });
  }, [volunteers, search, selectedLga]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <p className="text-gray-500">Loading volunteers...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Volunteer Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Search and filter registered campaign volunteers.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-800"
          >
            Export CSV
          </button>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

        </div>

      </div>


      {/* SEARCH AND FILTERS */}

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="relative md:col-span-2">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, email, phone, LGA or occupation..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />

        </div>


        <select
          value={selectedLga}
          onChange={(event) => setSelectedLga(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        >
          <option value="All">All LGAs</option>

          {lgas.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}

        </select>

      </div>


      {/* RESULT COUNT */}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">

        <span>
          Showing{" "}
          <strong className="text-gray-900">
            {filteredVolunteers.length}
          </strong>{" "}
          of{" "}
          <strong className="text-gray-900">
            {volunteers.length}
          </strong>{" "}
          {volunteers.length === 1 ? "volunteer" : "volunteers"}
        </span>

        {(search || selectedLga !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedLga("All");
            }}
            className="font-medium text-green-700 hover:underline"
          >
            Clear filters
          </button>
        )}

      </div>


      {/* TABLE */}

      {filteredVolunteers.length === 0 ? (

        <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-8 text-center">

          <p className="font-medium text-gray-700">
            No volunteers found.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or LGA filter.
          </p>

        </div>

      ) : (

        <div className="mt-6 overflow-x-auto">

          <table className="min-w-full border-collapse">

            <thead>

              <tr className="bg-green-700 text-white">

                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Email
                </th>

                <th className="p-3 text-left">
                  Phone
                </th>

                <th className="p-3 text-left">
                  LGA
                </th>

                <th className="p-3 text-left">
                  Occupation
                </th>

                <th className="p-3 text-left">
                  Message
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredVolunteers.map((volunteer, index) => (

                <tr
                  key={`${volunteer.Email}-${index}`}
                  className="border-b transition hover:bg-gray-50"
                >

                  <td className="p-3 font-medium text-gray-900">
                    {volunteer.Name || "Not specified"}
                  </td>

                  <td className="p-3 text-gray-700">
                    {volunteer.Email || "Not specified"}
                  </td>

                  <td className="p-3 text-gray-700">
                    {volunteer["Phone No."] || "Not specified"}
                  </td>

                  <td className="p-3">

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {volunteer["L.G.A"] || "Not specified"}
                    </span>

                  </td>

                  <td className="p-3 text-gray-700">
                    {volunteer.Occupation || "Not specified"}
                  </td>

                  <td className="max-w-sm p-3 text-gray-600">
                    {volunteer.Message || "No message"}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => setSelectedVolunteer(volunteer)}
                      className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    
    {/* VOLUNTEER DETAILS MODAL */}

    {selectedVolunteer && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={() => setSelectedVolunteer(null)}
      >
        <div
          className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >

          <div className="flex items-center justify-between border-b pb-4">

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Volunteer Details
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Registered campaign volunteer
              </p>
            </div>

            <button
              onClick={() => setSelectedVolunteer(null)}
              className="rounded-lg px-3 py-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            >
              ✕
            </button>

          </div>


          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Full Name
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {selectedVolunteer.Name || "Not specified"}
              </p>
            </div>


            <div>
              <p className="text-sm font-medium text-gray-500">
                Email
              </p>

              <p className="mt-1 text-gray-900">
                {selectedVolunteer.Email || "Not specified"}
              </p>
            </div>


            <div>
              <p className="text-sm font-medium text-gray-500">
                Phone
              </p>

              <p className="mt-1 text-gray-900">
                {selectedVolunteer["Phone No."] || "Not specified"}
              </p>
            </div>


            <div>
              <p className="text-sm font-medium text-gray-500">
                LGA
              </p>

              <p className="mt-1 text-gray-900">
                {selectedVolunteer["L.G.A"] || "Not specified"}
              </p>
            </div>


            <div>
              <p className="text-sm font-medium text-gray-500">
                Occupation
              </p>

              <p className="mt-1 text-gray-900">
                {selectedVolunteer.Occupation || "Not specified"}
              </p>
            </div>


            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">
                Message
              </p>

              <div className="mt-2 rounded-lg bg-gray-50 p-4 text-gray-700">
                {selectedVolunteer.Message || "No message provided."}
              </div>
            </div>

          </div>


          <div className="mt-6 flex justify-end border-t pt-4">

            <button
              onClick={() => setSelectedVolunteer(null)}
              className="rounded-lg bg-green-700 px-5 py-2 font-semibold text-white transition hover:bg-green-800"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    )}

    </div>
  );
}





