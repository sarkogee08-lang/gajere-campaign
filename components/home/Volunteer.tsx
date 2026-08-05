"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const lgas = [
  "Aleiro",
  "Arewa Dandi",
  "Argungu",
  "Augie",
  "Bagudo",
  "Birnin Kebbi",
  "Bunza",
  "Dandi",
  "Fakai",
  "Gwandu",
  "Jega",
  "Kalgo",
  "Koko/Besse",
  "Maiyama",
  "Ngaski",
  "Sakaba",
  "Shanga",
  "Suru",
  "Wasagu/Danko",
  "Yauri",
  "Zuru",
];

export default function Volunteer() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    lga: "",
    occupation: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const { error } = await supabase
        .from("volunteers")
        .insert([
          {
            Name: formData.fullName,
            Email: formData.email,
            "Phone No.": formData.phone,
            "L.G.A": formData.lga,
            Occupation: formData.occupation,
            Message: formData.message,
          },
        ]);

      if (error) {
        throw error;
      }

      setSuccess(
        "🎉 Thank you for joining the campaign! Your registration has been received."
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        lga: "",
        occupation: "",
        message: "",
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unable to register volunteer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="volunteer"
      className="bg-gradient-to-b from-green-50 to-white py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Join the Movement
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-gray-900">
            Become a Volunteer
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Join thousands of supporters working together to build a safer,
            stronger and more prosperous Kebbi South.
          </p>
        </div>

        {success && (
          <div className="mt-8 rounded-xl border border-green-300 bg-green-100 p-4 text-center font-semibold text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-300 bg-red-100 p-4 text-center font-semibold text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl bg-white p-10 shadow-2xl"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <input
              required
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
            />

            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
            />

            <input
              required
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
            />

            <select
              required
              name="lga"
              value={formData.lga}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
            >
              <option value="">Select Local Government Area</option>

              {lgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>

            <input
              required
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 p-4 md:col-span-2 focus:border-green-600 focus:outline-none"
            />
          </div>

          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Why would you like to volunteer?"
            className="mt-6 h-40 w-full rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-green-700 py-4 text-lg font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Registering..." : "Join the Campaign"}
          </button>
        </form>
      </div>
    </section>
  );
}