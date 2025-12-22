"use client";

import { useEffect, useState } from "react";

export type TimerMode = "regresivo" | "progresivo";

const STORAGE_KEY = "timer:mode";

export function useTimerMode(
  defaultMode: TimerMode = "progresivo"
) {
  const [mode, setMode] = useState<TimerMode>(defaultMode);

  // 🔄 Cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "regresivo" || stored === "progresivo") {
      setMode(stored);
    }
  }, []);

  // 💾 Guardar cambios
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  function toggleMode() {
    setMode((prev) =>
      prev === "regresivo" ? "progresivo" : "regresivo"
    );
  }

  return {
    mode,
    setMode,
    toggleMode,
  };
}
