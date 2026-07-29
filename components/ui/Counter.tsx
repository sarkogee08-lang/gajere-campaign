"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export default function Counter({
  end,
  duration = 2000,
  suffix = "",
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = Math.ceil(end / (duration / 20));

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(start);
    }, 20);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}