"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/language/LanguageContext";
import { translations } from "@/components/language/translations";

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
  const { language } = useLanguage();
  const t = translations[language].volunteer;
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

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 8000);

    return () => clearTimeout(timer);
  }, [success]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const { error } = await supabase
        .from("volunteers")
        .insert([
          {
            Name: formData.fullName.trim(),
            Email: formData.email.trim(),
            "Phone No.": formData.phone.trim(),
            "L.G.A": formData.lga,
            Occupation: formData.occupation.trim(),
            Message: formData.message.trim(),
          },
        ]);

      if (error) {
        console.error("SUPABASE INSERT ERROR RAW:", error);
        console.error(
          "SUPABASE INSERT ERROR STRING:",
          JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
        );

        throw new Error(
          error.message ||
            "Supabase could not save the volunteer registration."
        );
      }

      setSuccess(
        "Thank you for joining the campaign! Your volunteer registration has been received successfully."
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
      console.error("Volunteer registration error:", err);
      console.error("Error message:", err?.message);
      console.error("Error code:", err?.code);
      console.error("Error details:", err?.details);
      console.error("Error hint:", err?.hint);

      setError(
        err?.message ||
          err?.details ||
          "We could not complete your registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="volunteer"
      className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-24"
    >
      <div className="mx-auto max-w-5xl px-6">

        {/* INTRO */}

        <div className="text-center">
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {t.badge}
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            {t.title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Join supporters working together to build a safer, stronger and
            more prosperous Kebbi South.
          </p>
        </div>


        {/* SUCCESS MESSAGE */}

        {success && (
          <div
            role="status"
            className="mt-8 flex items-start gap-3 rounded-2xl border border-green-300 bg-green-50 p-5 text-green-800 shadow-sm"
          >
            <CheckCircle2
              size={24}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <div>
              <p className="font-bold">
                {t.registrationSuccessful}
              </p>

              <p className="mt-1 text-sm">
                {success}
              </p>
            </div>
          </div>
        )}


        {/* ERROR MESSAGE */}

        {error && (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-red-300 bg-red-50 p-5 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl bg-white p-6 shadow-2xl md:p-10"
        >

          <div className="grid gap-6 md:grid-cols-2">

            {/* FULL NAME */}

            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {t.fullName}
              </label>

              <input
                required
                id="fullName"
                type="text"
                name="fullName"
                autoComplete="name"
                placeholder="{t.fullNamePlaceholder}"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>


            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {t.email}
              </label>

              <input
                required
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="{t.emailPlaceholder}"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>


            {/* PHONE */}

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {t.phone}
              </label>

              <input
                required
                id="phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="{t.phonePlaceholder}"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>


            {/* LGA */}

            <div>
              <label
                htmlFor="lga"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {t.lga}
              </label>

              <select
                required
                id="lga"
                name="lga"
                value={formData.lga}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="">
                  Select {t.lga}
                </option>

                {lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>


            {/* OCCUPATION */}

            <div className="md:col-span-2">
              <label
                htmlFor="occupation"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {t.occupation}
              </label>

              <input
                required
                id="occupation"
                type="text"
                name="occupation"
                placeholder="{t.occupationPlaceholder}"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

          </div>


          {/* MESSAGE */}

          <div className="mt-6">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              {t.reason}
            </label>

            <textarea
              required
              id="message"
              name="message"
              rows={6}
              placeholder="{t.messagePlaceholder}"
              value={formData.message}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-green-700 py-4 text-lg font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={21} className="animate-spin" />
                {t.registering}
              </>
            ) : (
              <>
                <Send size={20} />
                {t.joinCampaign}
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Your information will be used only for campaign volunteer
            coordination.
          </p>

        </form>


      </div>
    </section>
  );
}











