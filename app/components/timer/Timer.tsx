"use client";

import { useState } from "react";
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

  const actualFmt = {
    h: String(now.getHours()).padStart(2, "0"),
    m: String(now.getMinutes()).padStart(2, "0"),
    s: String(now.getSeconds()).padStart(2, "0"),
  };

  /* ================== UI ================== */
  function TimeBlock({ value, label }: { value: string; label: string }) {
    return (
      <div className="text-center">
        <div className="text-[12rem] leading-none tracking-tight font-black tabular-nums">
          {value}
        </div>
        <div className="text-2xl text-neutral-400 leading-none">{label}</div>
      </div>
    );
  }

  function Separator() {
    return (
      <div className="text-[10rem] font-bold tracking-tight leading-none pb-10 select-none">:</div>
    );
  }

  /* ================== RENDER ================== */
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800">
      {/* ================== ZONA CENTRADA REAL ================== */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 w-full">
          {/* TÍTULO */}
          <p className="text-5xl tracking-tight text-neutral-900">
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
          <div className="flex rounded-4xl border-2 border-slate-200 overflow-hidden divide-x-2 divide-slate-200">
            <div
              onClick={() => setModal("inicio")}
              className="px-10 py-5 text-center cursor-pointer hover:bg-neutral-50 transition"
            >
              <div className="text-5xl tracking-tight font-semibold text-black/60 tabular-nums">
                {String(inicio.h).padStart(2, "0")}:
                {String(inicio.m).padStart(2, "0")}:00
              </div>
              <div className="text-xl text-neutral-500">
                HORA INICIO
              </div>
            </div>

            <div
              onClick={() => setModal("fin")}
              className="px-10 py-5 text-center cursor-pointer hover:bg-neutral-50 transition"
            >
              <div className="text-5xl tracking-tight font-semibold text-black/60 tabular-nums">
                {String(fin.h).padStart(2, "0")}:
                {String(fin.m).padStart(2, "0")}:00
              </div>
              <div className="text-xl text-neutral-500">
                HORA TÉRMINO
              </div>
            </div>

            <div className="px-10 py-5 text-center">
              <div className="text-5xl tracking-tight font-semibold tabular-nums">
                {mode === "regresivo"
                  ? `${actualFmt.h}:${actualFmt.m}:${actualFmt.s}`
                  : `${restanteFmt.h}:${restanteFmt.m}:${restanteFmt.s}`}
              </div>
              <div className="text-xl text-neutral-500">
                {mode === "regresivo" ? "HORA ACTUAL" : "QUEDAN"}
              </div>
            </div>
          </div>

          {/* BOTÓN TOGGLE */}
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="inline-flex items-center justify-center font-medium transition-all px-4 py-1 bg-slate-100 text-gray-400 hover:text-gray-500 rounded-2xl text-sm cursor-pointer"
          >
            {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
          </button>

          {/* ================== DETAILS (CENTRADOS) ================== */}
          <div className="w-full max-w-4xl">
            <div
              className={`
                overflow-hidden
                transition-[max-height,opacity,transform]
                duration-500
                ease-in-out
                ${
                  showDetails
                    ? "opacity-100 max-h-screen translate-y-0"
                    : "opacity-0 max-h-0 -translate-y-0 pointer-events-none"
                }
              `}
            >
              <EvaluationDetails />
            </div>
          </div>
        </div>
      </div>

      {/* ================== FOOTER ================== */}
      <div className="mt-auto">
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
        onConfirm={(h, m) => {
          modal === "inicio"
            ? setInicio({ h, m })
            : setFin({ h, m });
        }}
      />
    </div>
  );
}
