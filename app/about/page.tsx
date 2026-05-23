import type { Metadata } from "next";
import FadeIn from "../components/fade-in";

export const metadata: Metadata = {
  title: "About — Owen Zheng",
};

const currently = [
  "Building side projects",
  "FTC Robotics — Lightning Bots",
];

const experience = [
  { role: "Programmer / Drive Team", org: "Lightning Bots — FTC Robotics", period: "2022 — present" },
];

const skillGroups = [
  { label: "Languages", items: ["Python", "TypeScript"] },
  { label: "Libraries", items: ["OpenCV", "MediaPipe", "Next.js", "React"] },
  { label: "Tools", items: ["Git", "PyAutoGUI", "NumPy"] },
];

const contact = [
  { label: "Email", href: "mailto:thecoolkidmichaelkeller@gmail.com", display: "thecoolkidmichaelkeller@gmail.com" },
  { label: "GitHub", href: "https://github.com/whackemowen", display: "github.com/whackemowen" },
];

export default function About() {
  return (
    <div className="space-y-20">

      {/* Page header with green tint */}
      <div
        className="border-b"
        style={{
          borderColor: "var(--border)",
          background:
            "var(--header-gradient)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-16">
          <section className="max-w-2xl space-y-4">
            <h1 className="fade-up fade-up-1 text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
              About
            </h1>
            <div className="fade-up fade-up-2 w-10 h-1 rounded-full" style={{ background: "var(--accent)" }} />
            <p className="fade-up fade-up-3 text-lg leading-relaxed pt-2" style={{ color: "var(--muted)" }}>
              Hey — I&apos;m Owen. I&apos;m a student based in Coquitlam, BC who builds
              things for fun — computer vision systems, web apps, whatever sounds
              interesting. I&apos;ve spent four years on the Lightning Bots FTC robotics
              team, competing and winning provincials in BC three years running.
            </p>
            <p className="fade-up fade-up-4 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Outside of robotics I like pushing into unexpected territory with side
              projects — teaching computers to understand gestures, automating things
              that probably shouldn&apos;t be automated. I&apos;m open to internship opportunities.
            </p>
          </section>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-20">

        {/* Currently + Experience */}
        <FadeIn>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
                Currently
              </p>
              <ul className="space-y-3">
                {currently.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <span style={{ color: "var(--accent)" }}>→</span>
                    <span style={{ color: "var(--fg)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
                Experience
              </p>
              <ul className="space-y-5">
                {experience.map((e, i) => (
                  <li key={i} className="flex gap-4">
                    <div
                      className="w-0.5 rounded-full mt-1 shrink-0"
                      style={{ background: "var(--accent-light)", alignSelf: "stretch", minHeight: "2rem" }}
                    />
                    <div className="space-y-0.5">
                      <div className="font-semibold text-sm" style={{ color: "var(--fg)" }}>{e.role}</div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>{e.org} · {e.period}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>

        {/* Skills */}
        <FadeIn delay={50}>
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--accent)" }}>
              Skills
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-sm font-semibold mb-3" style={{ color: "var(--fg)" }}>
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-md font-medium transition-transform hover:scale-105 cursor-default"
                        style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Contact */}
        <FadeIn delay={100}>
          <section className="border-t pt-12" style={{ borderColor: "var(--border)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--accent)" }}>
              Get in touch
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contact.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group p-5 rounded-xl border flex flex-col gap-1.5 transition-all hover:border-green-300 hover:shadow-md hover:-translate-y-1"
                  style={{ borderColor: "var(--border)", background: "var(--bg)" }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                    {c.label}
                  </span>
                  <span className="text-sm font-medium group-hover:underline" style={{ color: "var(--fg)" }}>
                    {c.display}
                  </span>
                </a>
              ))}
            </div>
          </section>
        </FadeIn>

      </div>
    </div>
  );
}
