import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button
        onClick={copy}
        className="text-sm font-semibold transition-all hover:opacity-80 hover:underline"
        style={{ color: "var(--accent)" }}
      >
        {copied ? "copied!" : `${email} →`}
      </button>

      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300"
        style={{
          background: "var(--bg)",
          borderColor: "var(--border-green)",
          color: "var(--fg)",
          opacity: copied ? 1 : 0,
          transform: copied ? "translateY(0)" : "translateY(12px)",
          pointerEvents: "none",
        }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: "var(--accent)" }}
        />
        Email copied to clipboard
      </div>
    </>
  );
}
