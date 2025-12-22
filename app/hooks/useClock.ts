"use client";

import { useEffect, useState } from "react";

export function useClock(interval = 1000) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return now;
}
