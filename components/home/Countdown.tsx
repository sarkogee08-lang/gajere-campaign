"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const electionDate = new Date("2027-02-20T00:00:00");

  const calculateDays = () => {
    const today = new Date();
    const difference = electionDate.getTime() - today.getTime();

    return Math.max(
      0,
      Math.ceil(difference / (1000 * 60 * 60 * 24))
    );
  };

  const [days, setDays] = useState(calculateDays());

  useEffect(() => {
    const timer = setInterval(() => {
      setDays(calculateDays());
    }, 86400000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-green-700 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 text-center md:grid-cols-3">

        <div>
          <h2 className="text-5xl font-bold">
            {days}
          </h2>
          <p className="mt-2 text-lg">
            Days Until Election Day
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">
            1,000+
          </h2>
          <p className="mt-2 text-lg">
            Volunteers Mobilized
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">
            21
          </h2>
          <p className="mt-2 text-lg">
            Communities Reached
          </p>
        </div>

      </div>
    </section>
  );
}