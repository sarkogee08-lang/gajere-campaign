export default function News() {
  const news = [
    {
      title: "Town Hall Meeting Across Kebbi South",
      date: "July 2026",
      summary:
        "Meeting with community leaders to discuss security, youth empowerment, and economic development.",
    },
    {
      title: "Youth Engagement Programme",
      date: "July 2026",
      summary:
        "Interactive sessions with young people focusing on skills development, entrepreneurship, and employment opportunities.",
    },
    {
      title: "Community Development Visit",
      date: "July 2026",
      summary:
        "Visits to communities to assess infrastructure needs and discuss practical solutions with residents.",
    },
  ];

  return (
    <section id="news" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Latest News
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Campaign News & Updates
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Stay informed with the latest campaign activities, community
            engagements, and development initiatives.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {news.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-56 items-center justify-center bg-green-700 text-6xl">
                📰
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold text-green-700">
                  {item.date}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.summary}
                </p>

                <button className="mt-6 font-semibold text-green-700 hover:text-green-900">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}