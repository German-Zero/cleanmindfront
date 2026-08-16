import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import "@/features/rewards/styles/surfaces.css";
import "@/features/rewards/effects/borders/borders.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "CleanMind",
  description:
    "Un espacio para organizar tus tareas, cuidar tu enfoque y reducir la carga mental.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={sora.variable}
      data-theme="LUNAR_MIND"
      data-motion="NONE"
      lang="es"
    >
      <body>{children}</body>
    </html>
  );
}
