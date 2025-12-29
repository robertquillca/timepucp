"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ThemePopover from "../ThemePopover";
import NotesPopover from "./NotesPopover";

import {
  BiHelpCircle,
  BiNote,
  BiTime,
  BiHourglass,
  BiPalette,
  BiExpandAlt,
  BiExitFullscreen,
} from "react-icons/bi";

type Props = {
  mode: "progresivo" | "regresivo";
  isFullscreen: boolean;
  onToggleMode: () => void;
  onToggleFullscreen: () => void;
};

export default function FooterControls({
  mode,
  isFullscreen,
  onToggleMode,
  onToggleFullscreen,
}: Props) {
  const [openThemes, setOpenThemes] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);

  const themesRef = useRef<HTMLDivElement | null>(null);

  /* ================== CLICK FUERA (SOLO TEMAS) ================== */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        themesRef.current &&
        !themesRef.current.contains(e.target as Node)
      ) {
        setOpenThemes(false);
      }
    }

    if (openThemes) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openThemes]);

  return (
    <>
      <div className="w-full px-4 mt-4">
        <div className="mx-auto flex max-w-4xl items-center justify-center">
          <div className="flex items-center gap-1.5 rounded-2xl bg-white/80 backdrop-blur-xl p-2">

            {/* AYUDA */}
            <button className="flex items-center py-1.5 px-2 rounded-xl text-sm font-medium leading-none border-2 border-gray-200 text-gray-300 cursor-pointer">
              <BiHelpCircle className="mr-0.5" />
              <span>Ayuda</span>
            </button>

            {/* 🎨 TEMAS */}
            <div ref={themesRef} className="relative">
              <button
                onClick={() => {
                  setOpenThemes((v) => !v);
                  setOpenNotes(false); // 🔑 cierre cruzado
                }}
                className="flex items-center py-1.5 px-2 rounded-xl text-sm font-medium leading-none border-2 border-gray-200 text-gray-300 hover:text-gray-600 cursor-pointer"
              >
                <BiPalette className="mr-0.5" />
                <span>Temas</span>
              </button>

              {openThemes && (
                <ThemePopover onClose={() => setOpenThemes(false)} />
              )}
            </div>

            {/* 📝 NOTAS */}
            <button
              onClick={() => {
                setOpenNotes((v) => !v);
                setOpenThemes(false); // 🔑 cierre cruzado
              }}
              className="flex items-center py-1.5 px-2 rounded-xl text-sm font-medium leading-none border-2 border-gray-200 text-gray-300 cursor-pointer"
            >
              <BiNote className="mr-0.5" />
              <span>Notas</span>
            </button>

            {/* 🔁 MODO */}
            <button
              onClick={onToggleMode}
              className="flex items-center py-1.5 px-2 rounded-xl text-sm font-medium leading-none border-2 border-gray-200 text-gray-300 hover:text-gray-600 cursor-pointer"
            >
              {mode === "progresivo" ? (
                <BiHourglass className="mr-0.5" />
              ) : (
                <BiTime className="mr-0.5" />
              )}
              <span>
                {mode === "progresivo"
                  ? "Modo regresivo"
                  : "Modo progresivo"}
              </span>
            </button>

            {/* ⛶ FULLSCREEN */}
            <button
              onClick={onToggleFullscreen}
              className="flex items-center py-1.5 px-2 rounded-full text-sm font-medium leading-none border-2 border-slate-200 bg-slate-50 text-gray-300 hover:text-gray-600 cursor-pointer"
            >
              {isFullscreen ? <BiExitFullscreen /> : <BiExpandAlt />}
            </button>
          </div>
        </div>
      </div>

      {/* 📝 NOTES POPOVER (PORTAL) */}
      {openNotes &&
        typeof window !== "undefined" &&
        createPortal(
          <NotesPopover onClose={() => setOpenNotes(false)} />,
          document.body
        )}
    </>
  );
}
