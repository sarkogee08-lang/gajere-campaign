"use client";

export default function Footer() {
  const quickLinks = [
    "Home",
    "About",
    "Vision",
    "Priorities",
    "News",
    "Gallery",
    "Volunteer",
  ];

  return (
    <footer className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white">

      {/* Gold Accent */}
      <div className="h-1 w-full bg-yellow-400"></div>

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Campaign */}
          <div>
            <h2 className="text-2xl font-bold">
              General Jafaru Mohammed Gajere (Rtd)
            </h2>

            <p className="mt-3 text-yellow-300 font-semibold">
              Leadership • Security • Development • Unity
            </p>

            <p className="mt-5 leading-7 text-green-100">
              Building a stronger Kebbi South through visionary
              leadership, inclusive governance, youth empowerment,
              and sustainable development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-bold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="transition hover:text-yellow-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-bold">
              Contact
            </h3>

            <div className="space-y-4 text-green-100">

              <p>📍 Kebbi South, Kebbi State, Nigeria</p>

              <p>📧 info@gajere2027.org</p>


            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-xl font-bold">
              Follow the Campaign
            </h3>

            <div className="flex flex-wrap gap-3">

              <button className="rounded-full border border-white/20 px-4 py-2 transition hover:bg-yellow-400 hover:text-green-900">
                Facebook
              </button>

              <button className="rounded-full border border-white/20 px-4 py-2 transition hover:bg-yellow-400 hover:text-green-900">
                X
              </button>

              <button className="rounded-full border border-white/20 px-4 py-2 transition hover:bg-yellow-400 hover:text-green-900">
                Instagram
              </button>

              <button className="rounded-full border border-white/20 px-4 py-2 transition hover:bg-yellow-400 hover:text-green-900">
                YouTube
              </button>

            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-8 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-green-900 transition hover:-translate-y-1 hover:bg-yellow-300"
            >
              ↑ Back to Top
            </button>

          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-green-200">

          © 2026 General Jafaru Mohammed Gajere Campaign. All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}
