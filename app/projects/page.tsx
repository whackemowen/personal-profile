import type { Metadata } from "next";
import FadeIn from "../components/fade-in";

export const metadata: Metadata = {
  title: "Projects — Owen Zheng",
};

type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  year: string;
  status: "live" | "wip" | "archived";
};

const projects: Project[] = [
  {
    name: "Lightning Bots — FTC Team 16205",
    tagline: "2nd overall & 3rd in autonomous in all of Canada",
    description:
      "Four years competing in FIRST Tech Challenge with the Lightning Bots (Team 16205), winning BC provincials three years running. I program both autonomous and teleop, build the robot, and drive in competition. Autonomous runs PedroPathing with odometry for accurate PID path following and auto aiming for precise targeting. Ranked 2nd overall and 3rd in autonomous across all of Canada.",
    tags: ["Java", "OpenCV", "TensorFlow Lite", "AprilTag", "PedroPathing", "PIDF", "FSM"],
    links: [{ label: "GitHub", href: "https://github.com/whackemowen/lbteleop16205" }],
    year: "2022",
    status: "live",
  },
  {
    name: "Tele-Clash",
    tagline: "Play Clash Royale with your hands — no keyboard needed",
    description:
      "Computer vision system that maps hand gestures to Clash Royale controls via webcam. MediaPipe tracks 21 landmarks per hand; a self-trained KNN classifier learns your personal gesture patterns from around 10 samples and hits 85% accuracy. One hand drives the cursor, two hands trigger in-game emotes. 147ms latency, 50KB model, no GPU or cloud required.",
    tags: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "NumPy"],
    links: [{ label: "GitHub", href: "https://github.com/eddie-wq07/Tele_Clash_V6" }],
    year: "2025",
    status: "live",
  },
];

const statusConfig: Record<Project["status"], { label: string; className: string }> = {
  live:     { label: "Live",        className: "badge-live" },
  wip:      { label: "In progress", className: "badge-wip" },
  archived: { label: "Archived",    className: "badge-archived" },
};

export default function Projects() {
  return (
    <div className="space-y-12">

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
          <div className="max-w-xl space-y-3">
            <h1 className="fade-up fade-up-1 text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
              Projects
            </h1>
            <div className="fade-up fade-up-2 w-10 h-1 rounded-full" style={{ background: "var(--accent)" }} />
            <p className="fade-up fade-up-3 text-lg pt-1" style={{ color: "var(--muted)" }}>
              Things I&apos;ve built — personal projects, side projects, and work I&apos;m proud of.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16">

      {/* Project list */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((p, i) => {
          const s = statusConfig[p.status];
          return (
            <FadeIn key={p.name} delay={i * 80}>
            <div
              className="project-card group rounded-xl border p-6 flex flex-col gap-5"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg)",
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="font-semibold text-base" style={{ color: "var(--fg)" }}>
                    {p.name}
                  </h2>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {p.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  <span
                    className={`${s.className} text-xs font-semibold px-2.5 py-0.5 rounded-full`}
                  >
                    {s.label}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {p.year}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {p.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-md font-medium"
                      style={{
                        background: "var(--accent-light)",
                        color: "var(--accent-text)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 shrink-0">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="text-xs font-semibold transition-colors hover:opacity-70"
                      style={{ color: "var(--accent)" }}
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
            </FadeIn>
          );
        })}
      </div>

      </div>
    </div>
  );
}
