"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Published");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  async function loadEvent() {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Load Event Error:", error);
      alert("Unable to load this event.");
      router.push("/admin/events");
      return;
    }

    setTitle(data.title || "");
    setDescription(data.description || "");
    setDate(data.date || "");
    setTime(data.time || "");
    setLocation(data.location || "");
    setCategory(data.category || "");
    setStatus(data.status || "Published");

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("events")
      .update({
        title,
        description,
        date,
        time,
        location,
        category,
        status,
      })
      .eq("id", id);

    if (error) {
      console.error("Update Event Error:", error);
      alert("Failed to update event.");
      setSaving(false);
      return;
    }

    alert("Event updated successfully!");
    router.push("/admin/events");
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow">
        <p className="text-gray-500">Loading event...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Edit Campaign Event
        </h1>

        <p className="mt-2 text-gray-500">
          Update the details of this campaign event.
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
            disabled={saving}
            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:bg-gray-400"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
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
