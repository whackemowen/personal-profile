"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { applyTheme } from "../lib/theme";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const close = useCallback(() => setOpen(false), []);

  const toggleFocus = () => {
    const next = !focusMode;
    setFocusMode(next);
    document.documentElement.setAttribute("data-focus", next ? "true" : "false");
    close();
  };

  const commands: Command[] = [
    { id: "home",       label: "Home",                    group: "Navigate", action: () => { router.push("/");         close(); } },
    { id: "about",      label: "About",                   group: "Navigate", action: () => { router.push("/about");    close(); } },
    { id: "projects",   label: "Projects",                group: "Navigate", action: () => { router.push("/projects"); close(); } },
    { id: "stats",      label: "Stats",                   group: "Navigate", action: () => { router.push("/stats");    close(); } },
    { id: "github",     label: "Open GitHub",             hint: "github.com/whackemowen",                      group: "Links",    action: () => { window.open("https://github.com/whackemowen", "_blank"); close(); } },
    { id: "linkedin",   label: "Open LinkedIn",           hint: "linkedin.com/in/owen-zheng-731685389",        group: "Links",    action: () => { window.open("https://www.linkedin.com/in/owen-zheng-731685389/", "_blank"); close(); } },
    { id: "resume",     label: "Download Resume",         hint: "/resume.pdf",                                 group: "Links",    action: () => {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "Owen_Zheng_Resume.pdf";
      a.click();
      close();
    }},
    { id: "email",      label: "Copy Email",              hint: "owen.zhengzhiyun@gmail.com", group: "Actions", action: () => { navigator.clipboard.writeText("owen.zhengzhiyun@gmail.com"); close(); } },
    { id: "theme",      label: "Toggle Theme",            hint: "light / dark",                  group: "Actions",  action: () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next as "light" | "dark");
      close();
    }},
    { id: "focus",      label: focusMode ? "Exit Focus Mode" : "Enter Focus Mode", hint: focusMode ? "restore nav & footer" : "hide nav & footer", group: "Actions", action: toggleFocus },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.hint?.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Pre-attach flat index to each command for keyboard nav
  const indexedFiltered = filtered.map((c, i) => ({ ...c, flatIdx: i }));
  const grouped = indexedFiltered.reduce(
    (acc, cmd) => {
      if (!acc[cmd.group]) acc[cmd.group] = [];
      acc[cmd.group].push(cmd);
      return acc;
    },
    {} as Record<string, typeof indexedFiltered>
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.shiftKey && e.key === "F") {
        e.preventDefault();
        const next = document.documentElement.getAttribute("data-focus") !== "true";
        setFocusMode(next);
        document.documentElement.setAttribute("data-focus", next ? "true" : "false");
      }
      if (e.key === "Escape") {
        if (document.documentElement.getAttribute("data-focus") === "true") {
          setFocusMode(false);
          document.documentElement.setAttribute("data-focus", "false");
        } else {
          close();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      filtered[activeIndex].action();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh]"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={close}
    >
      <div
        className="w-full max-w-lg mx-4 rounded-xl border overflow-hidden shadow-2xl"
        style={{ background: "var(--bg)", borderColor: "var(--border-green)" }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--muted)", flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            placeholder="Search commands..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--fg)" }}
          />
          <kbd
            className="hidden sm:inline text-xs px-1.5 py-0.5 rounded border font-mono"
            style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--bg-subtle)" }}
          >
            esc
          </kbd>
        </div>

        {/* Command list */}
        <div className="py-1.5 max-h-72 overflow-y-auto">
          {Object.entries(grouped).map(([group, cmds]) => (
            <div key={group}>
              <p
                className="px-4 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--muted)" }}
              >
                {group}
              </p>
              {cmds.map((cmd) => {
                const active = cmd.flatIdx === activeIndex;
                return (
                  <button
                    key={cmd.id}
                    className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm transition-colors"
                    style={{
                      background: active ? "var(--accent-light)" : "transparent",
                      color: "var(--fg)",
                    }}
                    onMouseEnter={() => setActiveIndex(cmd.flatIdx)}
                    onClick={cmd.action}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-opacity"
                      style={{ background: "var(--accent)", opacity: active ? 1 : 0 }}
                    />
                    <span className="font-medium flex-1">{cmd.label}</span>
                    {cmd.hint && (
                      <span className="text-xs" style={{ color: "var(--muted)" }}>
                        {cmd.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="px-4 py-8 text-sm text-center" style={{ color: "var(--muted)" }}>
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        {/* Footer hints */}
        <div
          className="px-4 py-2 border-t flex gap-4 text-[11px]"
          style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--bg-subtle)" }}
        >
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> select</span>
          <span><kbd className="font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
