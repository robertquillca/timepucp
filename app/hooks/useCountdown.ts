"use client";

import { useMemo } from "react";
import {
  buildDateFromHM,
  diffMs,
  formatToHMS,
  TimeHM,
} from "../services/time.service";

export function useCountdown(
  now: Date,
  start: TimeHM,
  end: TimeHM
) {
  return useMemo(() => {
    const startDate = buildDateFromHM(now, start);
    const endDate = buildDateFromHM(now, end);

    const remainingMs = diffMs(now, endDate);

    return {
      remainingMs,
      formatted: formatToHMS(remainingMs),
    };
  }, [now, start.h, start.m, end.h, end.m]);
}
