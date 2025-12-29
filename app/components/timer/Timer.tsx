"use client";

import { useState, useEffect } from "react";
import TimePickerModal from "./TimePickerModal";
import EvaluationDetails from "./EvaluationDetails";
import FooterControls from "./FooterControls";

import { useClock } from "../../hooks/useClock";
import { useCountdown } from "../../hooks/useCountdown";
import { useTimerMode } from "../../hooks/useTimerMode";
import { useTimerSettings } from "../../hooks/useTimerSettings";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useTimeSoundAlerts } from "../../hooks/useTimeSoundAlerts";

export default function Timer() {
  /* ================== ESTADO ================== */
  const { mode, toggleMode } = useTimerMode("progresivo");
  const { inicio, fin, setInicio, setFin } = useTimerSettings();

  const [showDetails, setShowDetails] = useState(true);
  const [modal, setModal] = useState<"inicio" | "fin" | null>(null);
  const [mounted, setMounted] = useState(false);

  /* ================== FULLSCREEN ================== */
  const { isFullscreen, toggle } = useFullscreen();

  /* ================== TIEMPO ================== */
  const now = useClock();
  const { formatted: restanteFmt, remainingMs } = useCountdown(
    now,
    inicio,
    fin
  );
  useTimeSoundAlerts(remainingMs);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const actualFmt = {
    h: String(now.getHours()).padStart(2, "0"),
    m: String(now.getMinutes()).padStart(2, "0"),
    s: String(now.getSeconds()).padStart(2, "0"),
  };

  /* ================== UI ================== */
  function TimeBlock({ value, label }: { value: string; label: string }) {
    return (
      <div className="text-center">
        <div className="text-[12rem] leading-none tracking-tight font-black tabular-nums" style={{ fontFamily: "var(--font-spotifymix)", color: "var(--timer)" }}>
          {value}
        </div>
        <div className="text-2xl text-neutral-400 -mt-2 leading-none" style={{ color: "var(--timer)"}}>
          {label}
        </div>
      </div>
    );
  }

  function Separator() {
    return (
      <div className="text-[10rem] font-bold tracking-tight leading-none pb-10 select-none" style={{ fontFamily: "var(--font-spotifymix)", color: "var(--timer)" }}>
        :
      </div>
    );
  }

  /* ================== RENDER ================== */
  return (
    <div className="min-h-screen text-neutral-900 relative">
      {/* ================== CONTENIDO CENTRAL ================== */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* TÍTULO */}
          <p className="text-5xl tracking-tight text-neutral" style={{  color: "var(--text)"}}>
            {mode === "regresivo"
              ? "La evaluación termina en"
              : "La hora actual es"}
          </p>

          {/* TIMER */}
          <div className="flex items-end gap-1">
            <TimeBlock
              value={mode === "regresivo" ? restanteFmt.h : actualFmt.h}
              label="horas"
            />
            <Separator />
            <TimeBlock
              value={mode === "regresivo" ? restanteFmt.m : actualFmt.m}
              label="minutos"
            />
            <Separator />
            <TimeBlock
              value={mode === "regresivo" ? restanteFmt.s : actualFmt.s}
              label="segundos"
            />
          </div>

          {/* CARDS */}
          <div className="w-full justify-evenly flex rounded-4xl border-2 mb-2 border-slate-200 overflow-hidden divide-x-2 divide-slate-200 bg-white" style={{ color: "var(--text)"}}>
            {/* HORA INICIO */}
            <div
              onClick={() => setModal("inicio")}
              className="px-10 py-4 text-center cursor-pointer hover:bg-neutral-50 transition"
            >
              <div className="text-[2.75rem] font-semibold tracking-tight tabular-nums text-black/50">
                {String(inicio.h).padStart(2, "0")}:
                {String(inicio.m).padStart(2, "0")}:00
              </div>
              <div className="text-xl -mt-1.5 text-neutral-500">
                HORA INICIO
              </div>
            </div>

            {/* HORA TÉRMINO */}
            <div
              onClick={() => setModal("fin")}
              className="px-10 py-4 text-center cursor-pointer hover:bg-neutral-50 transition"
            >
              <div className="text-[2.75rem] font-semibold tracking-tight tabular-nums text-black/50">
                {String(fin.h).padStart(2, "0")}:
                {String(fin.m).padStart(2, "0")}:00
              </div>
              <div className="text-xl -mt-1.5 text-neutral-500">
                HORA TÉRMINO
              </div>
            </div>

            {/* HORA ACTUAL / QUEDAN */}
            <div className="px-10 py-4 text-center">
              <div className="text-[2.75rem] font-bold tabular-nums">
                {mode === "regresivo"
                  ? `${actualFmt.h}:${actualFmt.m}:${actualFmt.s}`
                  : `${restanteFmt.h}:${restanteFmt.m}:${restanteFmt.s}`}
              </div>
              <div className="text-xl -mt-1.5 text-neutral-500">
                {mode === "regresivo" ? "HORA ACTUAL" : "QUEDAN"}
              </div>
            </div>
          </div>



          {/* CONTENEDOR DETALLES */}
          <div className="relative w-full max-w-4xl">
            {/* BOTÓN FLOTANTE SOBRE EL BORDE */}
            <button
              onClick={() => setShowDetails((v) => !v)}
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 px-4 py-1 bg-white border border-slate-200 rounded-xl text-sm text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
            </button>

            {/* DETALLES */}
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${showDetails
                  ? "opacity-100 max-h-screen"
                  : "opacity-0 max-h-0 pointer-events-none"
                }`}
            >
              <EvaluationDetails />
            </div>
          </div>
        </div>
      </div>

      {/* ================== FOOTER ================== */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 z-50">
        <FooterControls
          mode={mode}
          isFullscreen={isFullscreen}
          onToggleMode={toggleMode}
          onToggleFullscreen={toggle}
        />
      </div>

      {/* ================== MODAL ================== */}
      <TimePickerModal
        isOpen={modal !== null}
        onClose={() => setModal(null)}
        initialHour={modal === "inicio" ? inicio.h : fin.h}
        initialMinute={modal === "inicio" ? inicio.m : fin.m}
        onConfirm={(h, m) =>
          modal === "inicio"
            ? setInicio({ h, m })
            : setFin({ h, m })
        }
      />
    </div>
  );
}
