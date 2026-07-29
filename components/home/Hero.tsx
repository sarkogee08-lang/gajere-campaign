import Image from "next/image";
import Counter from "@/components/ui/Counter";

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-24 relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white"
    >

      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>


      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">


        {/* Left Side */}
        <div>

          <div className="inline-flex items-center rounded-full border border-yellow-300/40 bg-yellow-400/15 px-6 py-3 text-sm font-bold tracking-wide text-yellow-200 backdrop-blur-md">
            🇳🇬 Kebbi South Senatorial Election 2027
          </div>


          <p className="mt-6 text-lg font-semibold uppercase tracking-[0.3em] text-yellow-300">
            Leadership • Security • Development • Unity
          </p>


          <h1 className="mt-5 text-5xl font-extrabold leading-tight md:text-7xl">
            General Jafaru Mohammed Gajere (Rtd)
          </h1>


          <p className="mt-6 max-w-xl text-lg leading-8 text-green-100">
            Building a stronger Kebbi South through visionary leadership,
            inclusive governance, youth empowerment, economic growth,
            and sustainable community development.
          </p>


          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="#manifesto"
              className="rounded-xl bg-yellow-400 px-8 py-4 text-center font-bold text-green-900 shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300"
            >
              Read Manifesto
            </a>


            <a
              href="#volunteer"
              className="rounded-xl border-2 border-white px-8 py-4 text-center font-bold transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-green-800"
            >
              Join the Movement
            </a>

          </div>


          {/* Campaign Highlights */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">

            <h3 className="mb-5 text-xl font-bold">
              Campaign Highlights
            </h3>


            <ul className="space-y-3 text-green-100">
              <li>✔ Transparent Leadership</li>
              <li>✔ Youth Empowerment & Job Creation</li>
              <li>✔ Security & Community Development</li>
              <li>✔ Agricultural Growth & Economic Prosperity</li>
            </ul>

          </div>


          {/* Statistics */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

            {[
              {value:30, suffix:"+", text:"Years of Leadership"},
              {value:100, suffix:"%", text:"Commitment"},
              {value:24, suffix:"/7", text:"Service"},
              {value:2027, suffix:"", text:"Vision"},
            ].map((item)=>(
              <div
                key={item.text}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-white/20"
              >
                <h3 className="text-3xl font-bold text-yellow-300">
                  <Counter end={item.value} suffix={item.suffix}/>
                </h3>

                <p className="mt-2 text-sm text-green-100">
                  {item.text}
                </p>

              </div>
            ))}

          </div>


        </div>


        {/* Right Side */}
        <div className="relative flex justify-center">


          <div className="absolute h-[520px] w-[420px] rounded-full bg-yellow-400/20 blur-3xl"></div>


          <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition duration-500 hover:scale-[1.02]">

            <Image
              src="/images/candidate.jpg"
              alt="General Jafaru Mohammed Gajere (Rtd)"
              width={450}
              height={560}
              priority
              className="object-cover"
            />

          </div>


        </div>


      </div>


    </section>
  );
}