'use client'

import IconPause from "./ui/icons/IconPause";
import IconStop from "./ui/icons/IconStop";

export default function Pomodoro() {
    const stats = [
        { label: 'Total', value: 0 },
        { label: 'Pendientes', value: 0 },
        { label: 'En Curso', value: 0 },
        { label: 'Completadas', value: 0 },
    ];

    const eisenhower = [
        { label: 'Hacer Ahora', count: 0, color: 'border-l-now' },
        { label: 'Planificar', count: 0, color: 'border-l-plan' },
        { label: 'Delegar', count: 0, color: 'border-l-delegate' },
        { label: 'Eliminar', count: 0, color: 'border-l-delete' },
    ];

    return (
        <div className="text-text-primary p-6 flex justify-center items-start">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-surface rounded-2xl p-6">
                    <div>
                        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">Vista General</span>
                        <h2 className="text-3xl font-bold mt-1 mb-6">Tu Progreso</h2>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-card p-4 rounded-xl ring ring-border flex flex-col justify-between w-37.5 h-24">
                                    <span className="text-3xl font-bold">{stat.value}</span>
                                    <span className="text-xs text-text-secondary">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-medium mb-2">
                                <span>Progreso de Tareas</span>
                                <span className="text-text-secondary">0%</span>
                            </div>
                            <div className="w-full bg-card h-2 rounded-full overflow-hidden">
                                <div className="bg-now h-full w-[0%] transition-all duration-300"></div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-3">Distribución Eisenhower</h3>
                            <div className="space-y-2">
                                {eisenhower.map((item, index) => (
                                    <div key={index} className={`bg-card p-3 rounded-lg border-l-4 ${item.color} flex justify-between items-center text-sm`}>
                                        <span className="font-medium">{item.label}</span>
                                        <span className="text-xs font-bold text-text-secondary px-2 py-0.5 rounded-full">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {['Para Hoy', 'Vencidas', 'Próximas'].map((text, idx) => (
                                <button key={idx} className="bg-card py-3 rounded-lg text-center hover:bg-card-hover ring ring-border transition-colors">
                                    <div className="text-sm font-bold mb-1">0</div>
                                    <div className="text-[10px] text-text-secondary font-medium">{text}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <>
                        <div className="bg-surface rounded-2xl p-6 flex flex-col items-center justify-center">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="42" stroke="var(--card)" strokeWidth="6" fill="transparent" />
                                    <circle 
                                        cx="50" cy="50" r="42" 
                                        stroke="var(--primary)" strokeWidth="6" fill="transparent" 
                                        strokeDasharray="264" strokeDashoffset="66"
                                        strokeLinecap="round" 
                                    />
                                </svg>
                                <span className="absolute text-3xl font-bold tracking-wider">15:20</span>
                            </div>

                            <div className="flex gap-4 mt-6 text-text-secondary">
                                <IconPause />
                                <IconStop />
                            </div>
                        </div>
                        <div className="bg-surface rounded-2xl p-6 flex-1 min-h-50">
                            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">Últimos 7 días</span>
                            <h3 className="text-xl font-bold mt-1">Historial Pomodoro</h3>
                            <span className="text-2xl font-semibold text-accent block mt-1">00:00</span>
                            <hr className="border-border mt-4" />
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}