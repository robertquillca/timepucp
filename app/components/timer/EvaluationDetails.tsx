"use client";

import React from "react";
import { Manrope } from "next/font/google";

/* ================== FUENTES ================== */

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

/* ================== TIPOS ================== */
type RowCurso = {
  title: "Curso";
  value: string;
  clave: string;
};

type RowFecha = {
  title: "Fecha";
  value: string;
};

type RowText = {
  title: string;
  value: string;
};

type Row = RowCurso | RowFecha | RowText;

/* ================== COMPONENTE ================== */
export default function EvaluationDetails() {
  /* ---------- Fecha ---------- */
  const now = new Date();

  const meses: string[] = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "sept",
    "octubre",
    "nov",
    "dic",
  ];

  const dia = now.getDate();
  const mes = meses[now.getMonth()];
  const anio = now.getFullYear();

  const fechaCorta = `${String(dia).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${anio}`;

  const fechaLarga = `${dia} de ${mes}, ${anio}`;
  const fechaFinal = `${fechaCorta} (${fechaLarga})`;

  /* ---------- Filas ---------- */
  const rows: Row[] = [
    {
      title: "Curso",
      value: "Cálculo Aplicado",
      clave: "1MAT09",
    },
    {
      title: "Profesor",
      value: "R. Gonzales",
    },
    {
      title: "Horario",
      value: "201",
    },
    {
      title: "Fecha",
      value: fechaFinal,
    },
    {
      title: "Aula",
      value: "E204",
    },
  ];

  return (
    <div className={`${manrope.className} font-manrope w-full max-w-4xl mx-auto px-8 py-6 border-2 border-slate-200 bg-white rounded-4xl`}>
      <table className="w-full text-[2.575rem]">
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="align-top">
              {/* TITULO */}
              <td className="pr-6 font-normal text-neutral-700 w-1/5">
                {row.title}
              </td>

              {/* CONTENIDO */}
              <td className="w-4/5">
                {/* FECHA (solo lectura visual) */}
                {row.title === "Fecha" && (
                  <div className="text-neutral-800 font-bold tracking-tight">
                    {row.value}
                  </div>
                )}

                {/* CURSO (2 inputs) */}
                {row.title === "Curso" && (
                  <div className="flex gap-4 w-full">
                    <input
                      type="text"
                      placeholder={row.value}
                      className="w-3/4 bg-transparent focus:outline-none text-neutral-800 font-semibold placeholder:text-neutral-300"
                    />
                    <input
                      type="text"
                      placeholder={row.clave}
                      maxLength={6}
                      className="w-1/4 bg-transparent focus:outline-none text-neutral-800 font-semibold uppercase placeholder:text-neutral-300"
                    />
                  </div>
                )}

                {/* TEXTO SIMPLE */}
                {row.title !== "Curso" && row.title !== "Fecha" && (
                  <input
                    type="text"
                    placeholder={row.value}
                    className="w-full bg-transparent focus:outline-none text-neutral-800 font-semibold placeholder:text-neutral-300"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
