export default function Manifesto() {
  const manifesto = [
    {
      icon: "🛡️",
      title: "Security & Regional Protection",
      description:
        "Promoting peace, supporting community safety initiatives, and strengthening collaboration with security stakeholders to protect lives and property.",
    },
    {
      icon: "🌾",
      title: "Agricultural Revolution",
      description:
        "Supporting farmers through modern farming methods, improved access to resources, irrigation development, and better market opportunities.",
    },
    {
      icon: "🎓",
      title: "Education & Skills Development",
      description:
        "Improving access to quality education, supporting scholarships, vocational training, and skills acquisition programmes for young people.",
    },
    {
      icon: "💼",
      title: "Youth Empowerment & Micro-Grants",
      description:
        "Creating opportunities through entrepreneurship support, job creation initiatives, and empowerment programmes for youth and women.",
    },
    {
      icon: "🏥",
      title: "Healthcare Improvement",
      description:
        "Advancing access to quality healthcare services, strengthening medical facilities, and improving community wellbeing.",
    },
    {
      icon: "🛣️",
      title: "Infrastructure & Connectivity",
      description:
        "Promoting better roads, electricity, water supply, and sustainable infrastructure development across Kebbi South.",
    },
  ];

  return (
    <section
      id="manifesto"
      className="scroll-mt-24 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Our Manifesto
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            A Vision for a Stronger Kebbi South
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            A practical development agenda focused on security, economic growth,
            human capital development, and improved quality of life for all.
          </p>
        </div>

        {/* Manifesto Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {manifesto.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
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