import Image from "next/image";

export default function Biography() {
  const achievements = [
    {
      title: "Military Leadership",
      description:
        "Served the nation with professionalism, discipline, and dedication throughout a distinguished military career.",
    },
    {
      title: "Public Service",
      description:
        "Committed to serving communities through integrity, accountability, and people-focused leadership.",
    },
    {
      title: "Community Development",
      description:
        "Advocated for initiatives that improve education, healthcare, agriculture, and infrastructure.",
    },
    {
      title: "Vision for Kebbi South",
      description:
        "Focused on security, youth empowerment, economic growth, and inclusive development for every community.",
    },
  ];

  const timeline = [
    {
      year: "1980s",
      title: "Joined the Nigerian Army",
    },
    {
      year: "1990s",
      title: "Held Strategic Leadership Positions",
    },
    {
      year: "2000s",
      title: "Senior Military Commands",
    },
    {
      year: "Today",
      title: "Serving the People of Kebbi South",
    },
  ];

  return (
    <section
      id="biography"
      className="scroll-mt-24 bg-gray-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Biography
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            General Jafaru Mohammed Gajere (Rtd)
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            A distinguished military officer whose career has been defined by
            discipline, leadership, integrity, and an unwavering commitment to
            national service.
          </p>

        </div>

        {/* Main Content */}
        <div className="mt-20 grid items-center gap-14 lg:grid-cols-2">

          {/* Image */}
          <div className="flex justify-center">

            <div className="overflow-hidden rounded-3xl shadow-2xl">

              <Image
                src="/images/candidate.jpg"
                alt="General Jafaru Mohammed Gajere"
                width={500}
                height={650}
                className="object-cover"
              />

            </div>

          </div>

          {/* Biography */}
          <div>

            <h3 className="text-3xl font-bold text-green-700">
              Leadership Built on Service
            </h3>

            <p className="mt-6 leading-8 text-gray-600">
              General Jafaru Mohammed Gajere (Rtd) has devoted decades of his
              life to serving Nigeria with honour and professionalism. His
              experience in leadership, strategic planning, and public service
              provides a strong foundation for delivering effective
              representation for the people of Kebbi South.
            </p>

            <div className="mt-10 grid gap-5">

              {achievements.map((item) => (

                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-6 shadow-md"
                >

                  <h4 className="font-bold text-green-700">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-gray-600">
                    {item.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Timeline */}
        <div className="mt-24">

          <h3 className="text-center text-3xl font-bold text-green-700">
            Leadership Journey
          </h3>

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            {timeline.map((item) => (

              <div
                key={item.year}
                className="rounded-2xl bg-white p-8 text-center shadow-lg"
              >

                <div className="text-2xl font-extrabold text-yellow-500">
                  {item.year}
                </div>

                <p className="mt-4 font-semibold text-gray-700">
                  {item.title}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}