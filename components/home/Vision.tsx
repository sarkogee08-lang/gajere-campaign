export default function Vision() {
  return (
    <section id="vision" className="bg-green-50 py-20">
      <div className="mx-auto max-w-6xl px-6">

        <h2 className="text-4xl font-bold text-center text-green-700">
          Vision & Mission
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-green-700">
              Our Vision
            </h3>

            <p className="mt-4 text-gray-600 leading-7">
              To build a secure, united, prosperous, and inclusive Kebbi South
              where every citizen has the opportunity to succeed.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-green-700">
              Our Mission
            </h3>

            <p className="mt-4 text-gray-600 leading-7">
              To provide transparent leadership, strengthen security,
              empower young people, improve infrastructure, support
              agriculture, and enhance education and healthcare.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}