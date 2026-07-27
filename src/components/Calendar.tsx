import React from 'react';
import IconLeftArrow from './ui/icons/IconLeftArrow';
import IconRigthArrow from './ui/icons/IconRigthArrow';
import IconNewTask from './ui/icons/IconNewTask';


interface Evento {
    id: string;
    titulo: string;
    color: string;
}

interface DiaCalendario {
    numero: number;
    esMesActual: boolean;
    hoy?: boolean;
    eventos?: Evento[];
}

export const Calendar: React.FC = () => {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const diasEjemplo: DiaCalendario[] = [
        { numero: 26, esMesActual: false }, { numero: 27, esMesActual: false }, { numero: 28, esMesActual: false },
        { numero: 29, esMesActual: false }, { numero: 30, esMesActual: false }, { numero: 1, esMesActual: true },
        { numero: 2, esMesActual: true },
        { numero: 3, esMesActual: true }, { numero: 4, esMesActual: true }, { numero: 5, esMesActual: true },
        { numero: 6, esMesActual: true }, { numero: 7, esMesActual: true }, { numero: 8, esMesActual: true },
        { numero: 9, esMesActual: true },
        { numero: 10, esMesActual: true }, { numero: 11, esMesActual: true }, { numero: 12, esMesActual: true },
        { numero: 13, esMesActual: true }, { numero: 14, esMesActual: true }, { numero: 15, esMesActual: true },
        { numero: 16, esMesActual: true },
        { numero: 17, esMesActual: true }, { numero: 18, esMesActual: true }, { numero: 19, esMesActual: true },
        { numero: 20, esMesActual: true },
        { 
            numero: 21, 
            esMesActual: true, 
            hoy: true,
            eventos: [
                { id: '1', titulo: 'Diseñar Frontend', color: 'bg-now text-white font-medium' },
                { id: '2', titulo: 'Limpieza Semanal', color: 'bg-delegate text-white' }
            ]
        },
        { numero: 22, esMesActual: true },
        { numero: 23, esMesActual: true }, { numero: 24, esMesActual: true }, { numero: 25, esMesActual: true },
        { numero: 26, esMesActual: true }, { numero: 27, esMesActual: true }, { numero: 28, esMesActual: true },
        { numero: 29, esMesActual: true },
        { numero: 30, esMesActual: true }, { numero: 31, esMesActual: true },
        { numero: 1, esMesActual: false }, { numero: 2, esMesActual: false }, { numero: 3, esMesActual: false },
        { numero: 4, esMesActual: false }, { numero: 5, esMesActual: false }, { numero: 6, esMesActual: false },
    ];

    return (
    <div className="h-full min-h-[36rem] w-full min-w-0 max-w-7xl xl:h-auto xl:min-h-0">
        <div className="flex h-full w-full flex-col bg-transparent px-1 sm:px-2 xl:h-auto xl:rounded-2xl xl:bg-surface xl:px-10 xl:py-6 2xl:px-14 2xl:py-7.5">
            <div className="mx-auto flex h-full min-h-0 w-full flex-col gap-1 sm:gap-2 xl:h-auto xl:gap-4">
                <div className="flex h-16 shrink-0 items-center justify-between px-1 py-2 xl:h-auto">
                    <div className="flex items-center gap-1 pl-14 sm:gap-3 sm:pl-16 xl:pl-0">
                        <button type="button" aria-label="Mes anterior" className="hidden size-9 place-items-center xl:grid">
                            <IconLeftArrow />
                        </button>
                        <h1 className="flex items-center gap-1.5 text-lg font-bold text-text-primary xl:text-2xl">
                            <span className="xl:hidden">Mayo</span>
                            <span className="hidden xl:inline">Mayo 2026</span>
                            <span
                                aria-hidden="true"
                                className="mb-1 size-1.5 rotate-45 border-r border-b border-text-secondary xl:hidden"
                            />
                        </h1>
                        <button type="button" aria-label="Mes siguiente" className="hidden size-9 place-items-center xl:grid">
                            <IconRigthArrow />
                        </button>

                    </div>
                    <button type="button" aria-label="Crear nueva tarea" className="grid size-11 place-items-center">
                        <IconNewTask />
                    </button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-y-1 xl:flex-none xl:gap-y-2">
                    <div className="grid shrink-0 grid-cols-7 gap-0.5 sm:gap-1 xl:gap-2">
                        {diasSemana.map((dia) => (
                        <div 
                            key={dia}
                            aria-label={dia}
                            className="
                                py-1 text-center text-[8px] font-semibold text-text-secondary
                                sm:text-[10px]
                                xl:rounded-xs xl:bg-card xl:text-xs xl:text-text-primary
                                xl:ring xl:ring-border
                            "
                        >
                            <span className="xl:hidden" aria-hidden="true">{dia.slice(0, 3).toLowerCase()}.</span>
                            <span className="hidden xl:inline" aria-hidden="true">{dia}</span>
                        </div>
                        ))}
                    </div>

                    <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6 gap-0.5 sm:gap-1 xl:flex-none xl:grid-rows-none xl:auto-rows-[minmax(4.5rem,1fr)] xl:gap-2 2xl:auto-rows-[minmax(5.625rem,1fr)]">
                        {diasEjemplo.map((dia, index) => (
                        <div
                            key={index}
                            className={`
                                relative flex min-h-0 min-w-0 flex-col justify-start overflow-hidden
                                rounded-[3px] p-1 ring ring-border sm:p-1.5
                                xl:justify-between xl:rounded-sm xl:p-2
                                ${dia.esMesActual ? 'bg-card' : 'bg-card/10'}
                            `}
                        >

                            <div className="flex items-start justify-center xl:justify-between">
                                <span 
                                    className={`
                                        inline-grid h-5 min-w-5 place-items-center px-1
                                        text-[10px] sm:h-6 sm:min-w-6 sm:text-xs
                                        ${!dia.esMesActual ? 'text-text-secondary' : 'text-secondary'}
                                        ${dia.hoy ? 'rounded-full bg-primary text-text-primary' : ''}
                                    `}
                                >
                                    {dia.numero}
                                </span>
                            </div>

                            <div className="z-10 mt-1 w-full space-y-0.5 xl:mt-2 xl:space-y-1">
                                {dia.eventos?.map((evento) => (
                                    <div
                                        key={evento.id}
                                        title={evento.titulo}
                                        className={`
                                            w-full truncate rounded-sm px-0.5 py-0.5
                                            text-[6px] leading-none
                                            sm:px-1 sm:text-[8px]
                                            xl:rounded-md xl:px-1.5 xl:text-[9px] xl:leading-normal
                                            2xl:px-2 2xl:py-1 2xl:text-[10px]
                                            ${evento.color}
                                        `}
                                    >
                                    {evento.titulo}
                                    </div>
                                ))}
                            </div>
                        </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    </div>
)}
