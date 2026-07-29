export default function Volunteer() {
  return (
    <section id="volunteer" className="bg-green-50 py-24">
      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Join the Movement
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Become a Volunteer
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Be part of the journey to build a stronger Kebbi South.
            Register today and help us make a lasting difference.
          </p>
        </div>

        <form className="mt-16 rounded-3xl bg-white p-8 shadow-xl">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Local Government Area
              </label>

              <input
                type="text"
                placeholder="Enter your LGA"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
              />
            </div>

          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-700">
              Occupation
            </label>

            <input
              type="text"
              placeholder="Enter your occupation"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-700">
              Why would you like to volunteer?
            </label>

            <textarea
              rows={5}
              placeholder="Tell us why you would like to join the campaign..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-green-700 py-4 text-lg font-bold text-white transition hover:bg-green-800"
          >
            Join the Campaign
          </button>

        </form>

      </div>
    </section>
  );
}