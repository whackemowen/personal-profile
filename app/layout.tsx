import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "./components/nav";
import ThemeScript from "./components/theme-script";
import CommandPalette from "./components/command-palette";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Owen Zheng",
  description: "Personal site of Owen Zheng — developer and builder.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, var(--accent) 0%, #4ade80 100%)" }} />
        <Nav />
        <CommandPalette />
        <main className="flex-1">{children}</main>
        <footer
          className="border-t mt-24"
          style={{ borderColor: "var(--border-green)", background: "var(--bg-green)" }}
        >
          <div
            className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-sm"
            style={{ color: "var(--muted)" }}
          >
            <span>Owen Zheng</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
