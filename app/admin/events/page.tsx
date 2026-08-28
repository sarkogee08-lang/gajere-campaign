"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type EventItem = {
  id: number;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  location: string;
  category: string | null;
  status: string;
  created_at: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Failed to load events:", error);
      setEvents([]);
    } else {
      setEvents(data ?? []);
    }

    setLoading(false);
  }

  async function deleteEvent(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event. Please try again.");
      setDeletingId(null);
      return;
    }

    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );

    setDeletingId(null);
    alert("Event deleted successfully.");
  }

  function formatDate(date: string) {
    if (!date) {
      return "Not specified";
    }

    const [year, month, day] = date.split("-").map(Number);

    if (!year || !month || !day) {
      return date;
    }

    return new Date(year, month - 1, day).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Events Management
          </h1>

          <p className="mt-2 text-gray-500">
            Create, manage and publish campaign events.
          </p>
        </div>

        <Link
          href="/admin/events/add"
          className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          <Plus size={20} />
          Add Event
        </Link>
      </div>

      {loading && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <p className="text-gray-500">Loading events...</p>
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl">📅</span>
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            No events available
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-gray-500">
            You have not created any campaign events yet.
          </p>

          <Link
            href="/admin/events/add"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            <Plus size={20} />
            Create First Event
          </Link>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Event
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Time
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Location
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-gray-900">
                        {event.title}
                      </p>

                      {event.description && (
                        <p className="mt-1 max-w-xs truncate text-sm text-gray-500">
                          {event.description}
                        </p>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-gray-700">
                      {formatDate(event.date)}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-gray-700">
                      {event.time || "Not specified"}
                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {event.location}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {event.category || "General"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          event.status === "Published"
                            ? "rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700"
                            : "rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700"
                        }
                      >
                        {event.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/events/edit/${event.id}`}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-800"
                          title="Edit event"
                        >
                          <Pencil size={20} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => deleteEvent(event.id)}
                          disabled={deletingId === event.id}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete event"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
