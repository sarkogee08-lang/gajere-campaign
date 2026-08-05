import Image from "next/image";

export default function Message() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-6xl px-6">

        <div className="grid items-center gap-10 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-2 md:p-12">

          {/* Candidate Image */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/message-candidate.jpg"
                alt="General Jafaru Mohammed Gajere (Rtd)"
                width={450}
                height={550}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Message */}
          <div>

            <div className="mb-6">
              <span className="text-6xl font-bold text-green-600">
                “
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Message from General Jafaru Mohammed Gajere (Rtd)
            </h2>

            <div className="mt-5 h-1 w-20 bg-green-600"></div>

            <p className="mt-8 text-lg leading-relaxed text-gray-700">
              My dear people of Kebbi South, leadership is about service,
              responsibility and commitment to the people. Our journey is
              built on security, development, unity and creating opportunities
              for every citizen.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Together, we will build a safer and more prosperous Kebbi South
              where our youth, farmers and communities can thrive.
            </p>

            <div className="mt-8">
              <p className="text-xl font-bold text-green-700">
                General Jafaru Mohammed Gajere (Rtd)
              </p>

              <p className="text-gray-500">
                APC Senatorial Candidate, Kebbi South 2027
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}