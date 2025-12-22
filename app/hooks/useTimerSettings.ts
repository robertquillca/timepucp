"use client";

import { useEffect, useState } from "react";

type TimeHM = {
  h: number;
  m: number;
};

type Settings = {
  inicio: TimeHM;
  fin: TimeHM;
};

const STORAGE_KEY = "timer:settings";

const DEFAULT_SETTINGS: Settings = {
  inicio: { h: 0, m: 0 },
  fin: { h: 0, m: 0 },
};

export function useTimerSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  // 🔄 cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  }, []);

  // 💾 persistir cambios
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function setInicio(inicio: TimeHM) {
    setSettings((prev) => ({ ...prev, inicio }));
  }

  function setFin(fin: TimeHM) {
    setSettings((prev) => ({ ...prev, fin }));
  }

  function reset() {
    setSettings(DEFAULT_SETTINGS);
  }

  return {
    inicio: settings.inicio,
    fin: settings.fin,
    setInicio,
    setFin,
    reset,
  };
}
