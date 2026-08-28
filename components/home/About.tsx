"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language/LanguageContext";
import { translations } from "@/components/language/translations";

export default function About() {
  const { language } = useLanguage();
  const t = translations[language].about;
  return (
    <section id="about" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {t.badge}
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            {t.title}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            {t.description}
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">

          {/* Photo */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/candidate.jpg"
                alt={t.title}
                width={450}
                height={550}
                className="object-cover"
              />
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid gap-6">

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-700">{t.leadership}</h3>
              <p className="mt-2 text-gray-600">
                {t.leadershipText}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-700">{t.security}</h3>
              <p className="mt-2 text-gray-600">
                {t.securityText}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-700">{t.youthEmpowerment}</h3>
              <p className="mt-2 text-gray-600">
                {t.youthEmpowermentText}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-700">{t.sustainableDevelopment}</h3>
              <p className="mt-2 text-gray-600">
                {t.sustainableDevelopmentText}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}



