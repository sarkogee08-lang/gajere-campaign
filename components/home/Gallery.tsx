import Image from "next/image";

export default function Gallery() {
  const gallery = [
    {
      image: "/images/gallery/community.jpg",
      title: "Community Engagement",
      description:
        "Meeting with residents across Kebbi South to listen to their concerns and aspirations.",
    },
    {
      image: "/images/gallery/traditional-rulers.jpg",
      title: "Traditional Leaders",
      description:
        "Consultations with traditional rulers to strengthen unity and development.",
    },
    {
      image: "/images/gallery/youth.jpg",
      title: "Youth Empowerment",
      description:
        "Supporting education, skills development, and entrepreneurship for young people.",
    },
    {
      image: "/images/gallery/townhall.jpg",
      title: "Town Hall Meeting",
      description:
        "Open discussions with citizens on policies, progress, and future plans.",
    },
    {
      image: "/images/gallery/agriculture.jpg",
      title: "Agricultural Support",
      description:
        "Promoting modern farming, food security, and economic opportunities.",
    },
    {
      image: "/images/gallery/outreach.jpg",
      title: "Community Outreach",
      description:
        "Working together with communities to improve healthcare, infrastructure, and quality of life.",
    },
  ];

  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Campaign Gallery
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Moments from the Campaign
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Highlights of our journey across Kebbi South, meeting people,
            listening to communities, and building a shared vision for the future.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/30" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}