"use client";

import { useEffect, useState } from "react";
import { TimeColumn } from "./TimeColumn";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialHour: number;
  initialMinute: number;
  onConfirm: (h: number, m: number) => void;
};

export default function TimePickerModal({
  isOpen,
  onClose,
  initialHour,
  initialMinute,
  onConfirm,
}: Props) {
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);

  // 🔑 sincroniza cada vez que se abre
  useEffect(() => {
    if (isOpen) {
      setHour(initialHour);
      setMinute(initialMinute);
    }
  }, [isOpen, initialHour, initialMinute]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl px-10 py-8 shadow-xl w-[420px]">
        <h2 className="text-center text-xl text-neutral-500 mb-6">
          Seleccionar hora
        </h2>

        <div className="relative flex justify-center gap-10">
          <TimeColumn
            label="HORAS"
            values={[...Array(24)].map((_, i) => i)}
            selected={hour}
            onSelect={setHour}
          />

          <TimeColumn
            label="MINUTOS"
            values={[...Array(60)].map((_, i) => i)}
            selected={minute}
            onSelect={setMinute}
          />

          {/* Segundos fijos */}
          <div className="text-center">
            <div className="mb-2 text-sm text-neutral-400">
              SEGUNDOS
            </div>
            <div className="text-4xl font-semibold tabular-nums text-neutral-400">
              00
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onConfirm(hour, minute);
            onClose();
          }}
          className="mt-8 w-full py-3 rounded-full bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
