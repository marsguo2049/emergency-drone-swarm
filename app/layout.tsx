import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emergency Drone",
  description: "Interactive operations research simulator for mobile drone-swarm emergency response.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
