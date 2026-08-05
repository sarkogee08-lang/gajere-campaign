export default function JoinMovement() {
  return (
    <section className="bg-green-700 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">

        <h2 className="text-4xl font-extrabold md:text-5xl">
          Join the Movement
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-green-100">
          Together, we can build a safer, stronger and more prosperous
          Kebbi South. Join the movement and be part of the journey towards
          meaningful leadership and development.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <a
            href="#volunteer"
            className="rounded-full bg-yellow-400 px-8 py-3 font-bold text-gray-900 transition hover:bg-yellow-300"
          >
            Become a Volunteer
          </a>

          <a
            href="#events"
            className="rounded-full border border-white px-8 py-3 font-bold text-white transition hover:bg-white hover:text-green-700"
          >
            Attend an Event
          </a>

          <a
            href="/manifesto.pdf"
            className="rounded-full border border-white px-8 py-3 font-bold text-white transition hover:bg-white hover:text-green-700"
          >
            Download Manifesto
          </a>

        </div>

      </div>
    </section>
  );
}