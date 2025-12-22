"use client";

import { useEffect, useRef } from "react";

type AlertMinute = 60 | 30 | 10 | 0;

const ALERTS: AlertMinute[] = [60, 30, 10, 0];

function getSound(minute: AlertMinute) {
  if (minute === 0) return "/sounds/end.mp3";
  return "/sounds/beep.mp3";
}

export function useTimeSoundAlerts(remainingMs: number) {
  const triggered = useRef<Set<AlertMinute>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const remainingMinutes = Math.ceil(remainingMs / 60000);

    ALERTS.forEach((minute) => {
      if (
        remainingMinutes <= minute &&
        !triggered.current.has(minute)
      ) {
        triggered.current.add(minute);

        if (!audioRef.current) {
          audioRef.current = new Audio(getSound(minute));
        } else {
          audioRef.current.src = getSound(minute);
        }

        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Autoplay bloqueado hasta interacción del usuario
        });
      }
    });
  }, [remainingMs]);
}
