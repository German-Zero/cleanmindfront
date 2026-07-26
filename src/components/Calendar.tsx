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
        { numero: 20, esMesActual: true }, { numero: 21, esMesActual: true },
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
        { numero: 4, esMesActual: false }, { numero: 5, esMesActual: false },
    ];

    return (
    <div className="w-7xl h-auto ">
        <div className='bg-surface px-14 py-7.5 rounded-2xl'>
            <div className="mx-auto flex flex-col gap-4">
                <div className="flex items-center justify-between py-2 px-1">
                    <div className='flex items-center gap-3'>
                        <button>
                            <IconLeftArrow />
                        </button>
                        <h1 className="text-2xl font-bold text-text-primary">Mayo 2026</h1>
                        <button>
                            <IconRigthArrow />
                        </button>

                    </div>
                    <button>
                        <IconNewTask />
                    </button>
                </div>

                <div className='flex flex-col gap-y-2'>
                    <div className="grid grid-cols-7 gap-2">
                        {diasSemana.map((dia) => (
                        <div 
                            key={dia} 
                            className="
                            bg-card ring ring-border rounded-xs
                            text-center text-text-primary text-[12px]
                            font-semibold py-1
                        ">
                            {dia}
                        </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2 auto-rows-[minmax(90px,1fr)] bg-card/">
                        {diasEjemplo.map((dia, index) => (
                        <div
                            key={index}
                            className={`
                                p-2 ring ring-border flex rounded-sm flex-col justify-between relative
                                ${dia.esMesActual ? 'bg-card' : 'bg-card/10'}
                            `}
                        >

                            <div className="flex items-start justify-between">
                                <span 
                                    className={`
                                        text-xs px-1.5 py-0.5
                                        ${!dia.esMesActual ? 'text-text-secondary' : 'text-secondary'}
                                        ${dia.hoy ? 'bg-primary rounded-full text-text-primary ' : ''}
                                    `}
                                >
                                    {dia.numero}
                                </span>
                            </div>

                            <div className="mt-2 space-y-1 z-10 w-full">
                                {dia.eventos?.map((evento) => (
                                    <div
                                        key={evento.id}
                                        className={`text-[10px] px-2 py-1 rounded-md truncate w-full ${evento.color}`}
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
