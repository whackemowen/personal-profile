"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      className="nav-bg sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="nav-link font-semibold text-sm tracking-tight"
          style={{ color: "var(--fg)" }}
        >
          Michael Keller
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-6 mr-3">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link text-sm transition-colors ${active ? "nav-link-active" : ""}`}
                  style={{ color: active ? "var(--accent)" : "var(--muted)" }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Cmd+K hint */}
          <button
            className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border transition-colors hover:border-green-300"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
              background: "var(--bg-subtle)",
            }}
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
              );
            }}
          >
            <span>⌘K</span>
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
