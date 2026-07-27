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
        <div className="flex w-full min-w-0 items-start justify-center p-3 text-text-primary sm:p-4 md:p-6 xl:p-6">
            <div className="grid w-full min-w-0 max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
                <div className="min-w-0 rounded-2xl bg-surface p-4 sm:p-6 xl:p-6">
                    <div>
                        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">Vista General</span>
                        <h2 className="mt-1 mb-6 text-2xl font-bold sm:text-3xl">Tu Progreso</h2>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex h-20 min-w-0 w-full flex-col justify-between rounded-xl bg-card p-3 ring ring-border sm:h-24 sm:p-4 xl:h-24 xl:w-37.5 xl:p-4">
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
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-surface p-4 sm:p-6 xl:p-6">
                            <div className="relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
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
                        <div className="min-h-50 flex-1 rounded-2xl bg-surface p-4 sm:p-6 xl:p-6">
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
