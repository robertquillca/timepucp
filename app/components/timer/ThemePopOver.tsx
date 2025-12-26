"use client";

import { useTheme, Theme } from "@/app/context/ThemeContext";

type Props = {
  onClose: () => void;
};

const themes: { id: Theme; label: string; icon: string }[] = [
  { id: "light", label: "Light", icon: "🌤" },
  { id: "dark", label: "Dark", icon: "🌙" },
  { id: "vibrant", label: "Vibrant", icon: "⚡" },
  { id: "vscode", label: "VS Code", icon: "🧠" },
];

export default function ThemePopover({ onClose }: Props) {
  const { setTheme, previewTheme, resetPreview } = useTheme();

  return (
    <div
      className="absolute bottom-full mb-2 right-16 w-48 rounded-xl border-2 border-slate-200 bg-white shadow-2xl p-2 z-50"
      onMouseLeave={resetPreview}
    >
      {themes.map((t) => (
        <button
          key={t.id}
          onMouseEnter={() => previewTheme(t.id)}   // 👈 PREVIEW
          onClick={() => {
            setTheme(t.id);                         // 👈 CONFIRM
            onClose();                              // 👈 CERRAR
          }}
          className="
            w-full flex items-center gap-2
            px-3 py-2 rounded-lg
            text-sm text-left
            hover:bg-slate-100
            transition
          "
        >
          <span>{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
