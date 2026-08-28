"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Published");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.from("events").insert([
      {
        title,
        description,
        date,
        time,
        location,
        category,
        status,
      },
    ]);

    if (error) {
      console.error("Event Error:", error);
      alert("Failed to save event");
      setLoading(false);
      return;
    }

    alert("Event added successfully!");
    router.push("/admin/events");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Add Campaign Event
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new campaign event or activity.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >
        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Event Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Community Town Hall Meeting"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-700 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the campaign event..."
            rows={5}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-700 focus:outline-none"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-700 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Yauri, Kebbi State"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-700 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Community, Youth, Agriculture..."
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-700 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-700 focus:outline-none"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Event"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/events")}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}