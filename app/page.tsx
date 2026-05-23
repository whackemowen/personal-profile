import Link from "next/link";
import CopyEmail from "./components/copy-email";
import GitHubStats from "./components/github-stats";

const EMAIL = "owen.zhengzhiyun@gmail.com";

const highlights = [
  { label: "Currently", value: "Student & side-project builder" },
  { label: "Based in", value: "Coquitlam, BC" },
  { label: "Open to", value: "Internships" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--hero-gradient)" }}
      >
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="max-w-2xl space-y-6">
            <div
              className="fade-up fade-up-1 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-medium border"
              style={{ color: "var(--accent-text)", background: "var(--bg-green)", borderColor: "var(--border-green)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              Available for opportunities
            </div>

            <h1 className="fade-up fade-up-2 text-5xl font-bold tracking-tight leading-tight" style={{ color: "var(--fg)" }}>
              Hi, I&apos;m Owen Zheng.
            </h1>

            <p className="fade-up fade-up-3 text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
              Developer and builder. I care about making things that work in
              unexpected ways — from computer vision systems to web apps.
              Currently studying and building side projects in Coquitlam, BC.
            </p>

            <div className="fade-up fade-up-4 flex gap-3 pt-2">
              <Link
                href="/projects"
                className="btn-primary inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: "var(--accent)" }}
              >
                View Projects
              </Link>
              <Link
                href="/about"
                className="btn-secondary inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold border"
                style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick-fact cards */}
      <section style={{ background: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="p-6 rounded-xl border transition-all hover:shadow-sm hover:border-green-200"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
                {h.label}
              </p>
              <p className="font-medium text-sm" style={{ color: "var(--fg)" }}>{h.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub stats + CTA */}
      <div className="max-w-5xl mx-auto px-6">
        <GitHubStats />

        <section
          className="py-12 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="font-medium" style={{ color: "var(--fg)" }}>
            Want to get in touch?
          </p>
          <CopyEmail email={EMAIL} />
        </section>
      </div>
    </div>
  );
}
