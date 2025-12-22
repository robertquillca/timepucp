import { useEffect, useRef } from "react";

type Props = {
  label: string;
  values: number[];
  selected: number;
  onSelect: (v: number) => void;
};

const ITEM_HEIGHT = 56; // px (importante)

export function TimeColumn({
  label,
  values,
  selected,
  onSelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 🎯 Centrar automáticamente al abrir / cambiar selección
  useEffect(() => {
    const index = values.indexOf(selected);
    if (containerRef.current && index >= 0) {
      containerRef.current.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: "smooth",
      });
    }
  }, [selected, values]);

  // 🔄 Detectar snap al hacer scroll
  function handleScroll() {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);

    const value = values[index];
    if (value !== undefined && value !== selected) {
      onSelect(value);
    }
  }

  return (
    <div className="text-center">
      <div className="mb-2 text-sm text-neutral-400">
        {label}
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative h-[168px] overflow-y-scroll snap-y snap-mandatory scrollbar-none"
      >
        {/* padding top */}
        <div style={{ height: ITEM_HEIGHT }} />

        {values.map((v) => (
          <div
            key={v}
            style={{ height: ITEM_HEIGHT }}
            className={`flex items-center justify-center text-4xl font-semibold tabular-nums snap-center transition
              ${
                v === selected
                  ? "text-neutral-900"
                  : "text-neutral-300"
              }
            `}
          >
            {String(v).padStart(2, "0")}
          </div>
        ))}

        {/* padding bottom */}
        <div style={{ height: ITEM_HEIGHT }} />
      </div>
    </div>
  );
}
