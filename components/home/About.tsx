import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            About the Candidate
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            General Jafaru Mohammed Gajere (Rtd)
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            A respected military leader dedicated to integrity, discipline,
            public service, and the sustainable development of Kebbi South.
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">

          {/* Photo */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/candidate.jpg"
                alt="General Jafaru Mohammed Gajere (Rtd)"
                width={450}
                height={550}
                className="object-cover"
              />
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid gap-6">

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-700">
                Leadership
              </h3>
              <p className="mt-2 text-gray-600">
                Dedicated to principled leadership, accountability, and service.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-700">
                Security
              </h3>
              <p className="mt-2 text-gray-600">
                Committed to peace, stability, and protecting communities.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-700">
                Youth Empowerment
              </h3>
              <p className="mt-2 text-gray-600">
                Supporting education, skills, entrepreneurship, and employment opportunities.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-700">
                Sustainable Development
              </h3>
              <p className="mt-2 text-gray-600">
                Promoting infrastructure, healthcare, agriculture, and economic growth.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}