"use client";

import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import ReactMarkdown from "react-markdown";

type Props = {
  onClose: () => void;
};

export default function NotesPopover({ onClose }: Props) {
  /* ================== ESTADO ================== */
  const [text, setText] = useState("");
  const [fontScale, setFontScale] = useState(1);

  /* ================== PERSISTENCIA ================== */
  useEffect(() => {
    const savedText = localStorage.getItem("evaluation-notes");
    const savedScale = localStorage.getItem("evaluation-notes-scale");

    if (savedText) setText(savedText);
    if (savedScale) setFontScale(Number(savedScale));
  }, []);

  useEffect(() => {
    localStorage.setItem("evaluation-notes", text);
    localStorage.setItem("evaluation-notes-scale", String(fontScale));
  }, [text, fontScale]);

  /* ================== HELPERS ================== */
  function insertAtCursor(insert: string) {
    setText((prev) => {
      if (!prev) return insert;
      return prev + "\n" + insert;
    });
  }

  /* ================== RENDER ================== */
  return (
    <Rnd
      default={{
        x: window.innerWidth / 2 - 320,
        y: 120,
        width: 640,
        height: 380,
      }}
      bounds="window"
      minWidth={480}
      minHeight={280}
      dragHandleClassName="notes-header"
      className="z-50"
    >
      <div className="h-full flex flex-col rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">

        {/* ================== HEADER ================== */}
        <div className="notes-header cursor-move flex items-center justify-between px-3 py-2 bg-slate-100 border-b">
          <span className="text-sm font-semibold text-slate-700">
            📝 Notas de evaluación
          </span>

          <button
            onClick={onClose}
            className="text-sm px-2 py-1 rounded hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        {/* ================== TOOLBAR ================== */}
        <div className="flex items-center gap-1 px-2 py-1 border-b bg-slate-50 text-sm">

          {/* TEXTO */}
          <button
            onClick={() => setFontScale((s) => Math.max(0.7, s - 0.1))}
            className="px-2 py-1 rounded hover:bg-slate-200"
          >
            A−
          </button>

          <button
            onClick={() => setFontScale((s) => Math.min(2, s + 0.1))}
            className="px-2 py-1 rounded hover:bg-slate-200"
          >
            A+
          </button>

          <div className="w-px h-4 bg-slate-300 mx-1" />

          {/* LISTAS */}
          <button
            onClick={() => insertAtCursor("- ")}
            className="px-2 py-1 rounded hover:bg-slate-200"
          >
            ● Lista
          </button>

          <button
            onClick={() => insertAtCursor("1. ")}
            className="px-2 py-1 rounded hover:bg-slate-200"
          >
            1. Lista
          </button>

          <div className="w-px h-4 bg-slate-300 mx-1" />

          {/* AVISO */}
          <button
            onClick={() =>
              insertAtCursor("> ⚠️ **IMPORTANTE:** ")
            }
            className="px-2 py-1 rounded hover:bg-yellow-200 text-yellow-700"
          >
            ⚠ Aviso
          </button>
        </div>

        {/* ================== CONTENT ================== */}
        <div className="flex flex-1 overflow-hidden">

          {/* EDITOR */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe instrucciones, avisos o aclaraciones aquí…"
            className="w-1/2 h-full resize-none p-3 text-sm outline-none border-r"
            style={{ fontSize: `${fontScale}em` }}
          />

          {/* PREVIEW */}
          <div
            className="w-1/2 h-full overflow-auto p-3 prose prose-sm max-w-none"
            style={{ fontSize: `${fontScale}em` }}
          >
            <ReactMarkdown>
              {text || "_Empieza a escribir…_"}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Rnd>
  );
}
