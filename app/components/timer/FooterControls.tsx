"use client";

import Link from "next/link";
import {
  BiHelpCircle,
  BiNote,
  BiTime,
  BiHourglass ,
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
}: Props): JSX.Element {
  return (
    <div className="w-full px-4 mt-4">
      {/* BOTONES */}
      <div className="mx-auto flex max-w-4xl items-center justify-center">
        <div className="flex items-center gap-1.5">


          <button className="flex items-center py-1.5 px-2 rounded-full text-sm font-medium leading-none border-2 border-gray-200  bg-slate-50 text-gray-300 cursor-pointer">
            <BiHelpCircle className="mr-0.5" />
            <span>Ayuda</span>
          </button>

          <button className="flex items-center py-1.5 px-2 rounded-full text-sm font-medium leading-none border-2 border-gray-200  bg-slate-50 text-gray-300 cursor-pointer">
            <BiNote className="mr-0.5" />
            <span>Notas</span>
          </button>

         {/* 🔁 MODO */}
         <button
         onClick={onToggleMode}
         className="flex items-center py-1.5 px-2 rounded-full text-sm font-medium leading-none border-2 border-gray-200 bg-slate-50 text-gray-300 hover:text-gray-600 cursor-pointer"
         >
         {mode === "progresivo" ? (
            <BiHourglass  className="mr-0.5" />
         ) : (
            <BiTime className="mr-0.5" />
         )}

         <span>
            {mode === "progresivo" ? "Modo regresivo" : "Modo progresivo"}
         </span>
         </button>

          <button className="flex items-center py-1.5 px-2 rounded-full text-sm font-medium leading-none border-2 border-gray-200  bg-slate-50 text-gray-300 cursor-pointer">
            <BiPalette className="mr-0.5" />
            <span>Temas</span>
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

      {/* FIRMA */}
      <div className="my-2 flex justify-center text-slate-200">
        <Link
          href="mailto:a20232679@pucp.edu.pe"
          className="group text-sm font-medium leading-none"
        >
          Sol Quillca (
          <span className="group-hover:underline">
            a20232679@pucp.edu.pe
          </span>
          )
        </Link>
      </div>
    </div>
  );
}
