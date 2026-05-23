import type { Metadata } from "next";
import FadeIn from "../components/fade-in";

export const metadata: Metadata = {
  title: "Stats — Owen Zheng",
};

const stats = [
  { label: "Hackathons Attended", value: "1", note: "and counting" },
  { label: "Hackathons Won", value: "0", note: "soon" },
  { label: "All-nighters Pulled", value: "2", note: "for the craft" },
  { label: "Failed Startup Ideas", value: "2", note: "lessons learned" },
  { label: "FTC Seasons", value: "4", note: "years competing" },
  { label: "BC Provincials Won", value: "3", note: "years running" },
];

export default function Stats() {
  return (
    <div className="space-y-12">

      <div
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--header-gradient)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="max-w-xl space-y-3">
            <h1 className="fade-up fade-up-1 text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
              Stats
            </h1>
            <div className="fade-up fade-up-2 w-10 h-1 rounded-full" style={{ background: "var(--accent)" }} />
            <p className="fade-up fade-up-3 text-lg pt-1" style={{ color: "var(--muted)" }}>
              By the numbers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-6 rounded-xl border flex flex-col gap-2 transition-all hover:shadow-sm hover:border-green-200"
                style={{ borderColor: "var(--border)", background: "var(--bg)" }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                  {s.label}
                </p>
                <p className="text-4xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
                  {s.value}
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

    </div>
  );
}
