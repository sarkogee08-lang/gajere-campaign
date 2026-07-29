export default function Stats() {
  const stats = [
    {
      number: "21+",
      label: "Districts",
    },
    {
      number: "225+",
      label: "Communities",
    },
    {
      number: "5,000+",
      label: "Supporters",
    },
    {
      number: "2027",
      label: "Our Goal",
    },
  ];

  return (
    <section id="stats" className="bg-green-700 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Campaign Impact
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            Together we are building a stronger, safer and more prosperous
            Kebbi South.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm transition hover:scale-105"
            >
              <h3 className="text-5xl font-extrabold text-yellow-300">
                {item.number}
              </h3>

              <p className="mt-3 text-lg font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}