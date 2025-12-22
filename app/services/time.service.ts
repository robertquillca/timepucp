// services/time.service.ts

export type TimeHM = {
  h: number;
  m: number;
};

export function toSeconds(ms: number) {
  return Math.max(0, Math.floor(ms / 1000));
}

export function formatToHMS(ms: number) {
  const totalSeconds = toSeconds(ms);

  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");

  return { h, m, s };
}

export function buildDateFromHM(base: Date, time: TimeHM) {
  const d = new Date(base);
  d.setHours(time.h, time.m, 0);
  return d;
}

export function diffMs(a: Date, b: Date) {
  return b.getTime() - a.getTime();
}
