export default function Priorities() {
  const priorities = [
    {
      icon: "🛡️",
      title: "Security",
      description:
        "Strengthen community safety, support security agencies, and promote lasting peace.",
    },
    {
      icon: "🌾",
      title: "Agriculture",
      description:
        "Support farmers with modern farming methods, irrigation, and access to markets.",
    },
    {
      icon: "🎓",
      title: "Education",
      description:
        "Improve schools, expand scholarships, and create opportunities for lifelong learning.",
    },
    {
      icon: "🏥",
      title: "Healthcare",
      description:
        "Improve access to quality healthcare and strengthen medical facilities across Kebbi South.",
    },
    {
      icon: "💼",
      title: "Youth Empowerment",
      description:
        "Create jobs, provide skills training, and support entrepreneurship for young people.",
    },
    {
      icon: "🛣️",
      title: "Infrastructure",
      description:
        "Invest in better roads, electricity, water supply, and rural development.",
    },
  ];

  return (
    <section id="priorities" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Campaign Priorities
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Building a Better Kebbi South
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Our campaign is focused on practical solutions that improve lives,
            strengthen communities, and create lasting opportunities.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {priorities.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-5xl">{item.icon}</div>

              <h3 className="mt-6 text-2xl font-bold text-green-700">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}