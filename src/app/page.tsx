import type { Metadata } from "next";
import LandingPage from "@/features/landing/components/LandingPage";

export const metadata: Metadata = {
  title: "CleanMind | Mente limpia, conciencia tranquila",
  description:
    "Organiza tus tareas, prioriza lo importante y trabaja con mayor calma mediante calendario, Pomodoro, matriz de Eisenhower y pizarra.",
  keywords: [
    "organizaci\u00f3n personal",
    "gesti\u00f3n de tareas",
    "Pomodoro",
    "matriz de Eisenhower",
    "bienestar digital",
  ],
};

export default function HomePage() {
  return <LandingPage />;
}
