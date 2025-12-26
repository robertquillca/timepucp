import Timer from "./components/timer/Timer";

export default function Page() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Timer />
    </main>
  );
}
