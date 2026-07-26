import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "CleanMind",
  description: "CleanMind frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={sora.variable} data-theme="DEEP_SERENITY" lang="es">
      <body>
        {children}
        </body>
    </html>
  );
}
