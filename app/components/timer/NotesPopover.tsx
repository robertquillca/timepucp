"use client";

import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

type Props = {
  onClose: () => void;
};

export default function NotesPopover({ onClose }: Props) {
  const [text, setText] = useState("");
  const [fontScale, setFontScale] = useState(2);

  /* ================== PERSISTENCIA ================== */
  useEffect(() => {
    const savedText = localStorage.getItem("evaluation-notes");
    const savedScale = localStorage.getItem("evaluation-notes-scale");

    if (savedText !== null) setText(savedText);
    if (savedScale !== null) setFontScale(Number(savedScale));
  }, []);

  useEffect(() => {
    localStorage.setItem("evaluation-notes", text);
    localStorage.setItem("evaluation-notes-scale", String(fontScale));
  }, [text, fontScale]);

  /* ================== ESTILO UNIFICADO ================== */
  const sharedStyle: React.CSSProperties = {
    fontSize: `${fontScale}em`,
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
  };

  return (
    <Rnd
      default={{
        x: window.innerWidth / 2 - 370,
        y: window.innerHeight - 420, // 👈 aparece justo encima del footer
        width: 740,
        height: 340,
      }}
      bounds="window"
      minWidth={420}
      minHeight={240}
      dragHandleClassName="notes-header"
      className="z-50"
    >
      <div className="h-full flex flex-col rounded-xl border-2 border-slate-100 bg-white shadow-xl overflow-hidden">
        
        {/* ================== CONTENIDO ================== */}
        <div className="flex-1 p-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe aquí las indicaciones…"
            className="
              w-full h-full
              resize-none
              outline-none
              bg-transparent
            "
            style={sharedStyle}
          />
        </div>

        {/* ================== TOOLBAR ================== */}
        <div className="notes-header cursor-move flex items-center gap-2 px-3 py-2 border-t border-t-gray-100 bg-slate-50/50 text-sm">
          <button
            onClick={() => setFontScale((s) => Math.max(0.7, s - 0.1))}
            className="px-2 py-1 rounded hover:bg-slate-200"
          >
            A−
          </button>

          <button
            onClick={() => setFontScale((s) => Math.min(2.5, s + 0.1))}
            className="px-2 py-1 rounded hover:bg-slate-200"
          >
            A+
          </button>

          <span className="ml-2 text-xs text-slate-500">
            Tamaño {Math.round(fontScale * 100)}%
          </span>

          <button
            onClick={onClose}
            className="ml-auto px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Rnd>
  );
}
