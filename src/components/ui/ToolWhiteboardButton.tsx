'use client'

import { useState } from 'react';
import IconCollapse from './icons/IconCollapse';
import IconExpand from './icons/IconExpand';
import IconCircle from './icons/IconCircle';
import IconArrow from './icons/IconArrow';
import IconLetter from './icons/IconLetter';
import IconPen from './icons/IconPen';
import IconSquare from './icons/IconSquare';
import IconLine from './icons/IconLine';
import IconPalette from './icons/IconPalette';
import IconBorrar from './icons/IconBorrar';

type ColorId = 'red' | 'yellow' | 'lightGreen' | 'green' | 'cyan' | 'blue' | 'purple' | 'pink';

type PresetColor = string;

interface ColorItem {
    id: ColorId;
    bg: string;
}

export default function ToolWhiteboardButton() {

    const presets: PresetColor[] = [
        '#A200FF', '#FF00A2', '#808080', '#FFFF00', '#FF6600',
        '#00FFFF', '#00D4FF', '#FFFFFF', '#FFFFFF', '#FFFFFF'
    ];

    const [isOpen, setIsOpen] = useState(false)
    const colors: ColorItem[] = [
        { id: 'red', bg: 'bg-red-500' },
        { id: 'yellow', bg: 'bg-yellow-400' },
        { id: 'lightGreen', bg: 'bg-lime-400' },
        { id: 'green', bg: 'bg-green-500' },
        { id: 'cyan', bg: 'bg-cyan-400' },
        { id: 'blue', bg: 'bg-blue-600' },
        { id: 'purple', bg: 'bg-purple-600' },
        { id: 'pink', bg: 'bg-pink-500' },
    ];

return (
    <div className='flex relative w-max h-max'>
        <div className={`
            w-40 bg-surface rounded-lg p-5 flex flex-col gap-4 
            absolute left-[7.5%] -top-45 ring ring-border
            ${isOpen ? '' : 'hidden'}
        `}>
            <div className="
                w-30 h-30 rounded-sm relative
                bg-linear-to-br from-secondary to-black
            ">
            </div>
            <div className="w-30 h-4 rounded-full relative bg-linear-to-r from-red-500 via-yellow-500 to-pink-500" />
            <div className="flex items-center gap-3">
                    <input 
                        type="text" 
                        maxLength={6}
                        placeholder='#FFFFFF'
                        className="
                        bg-card py-1 p-1.5 w-22.5
                        ring ring-border
                        text-[10px] text-text-primary 
                    "/>
                <div 
                    className="w-5 h-5 rounded-xs bg-green-500"
                />
            </div>
            <div className="grid grid-cols-5 gap-1.25">
                {presets.map((color, index) => (
                    <button
                        key={`${color}-${index}`}
                        className="w-5 h-5 rounded-xs"
                        style={{ backgroundColor: color }}
                        aria-label={`Seleccionar color ${color}`}
                    />
                ))}
            </div>
        </div>

        <div className="flex flex-col items-end gap-0.5 p-6 justify-center">
            <div className={`
                    flex flex-col gap-1 p-2
                    bg-surface rounded-t-lg rounded-bl-lg
                    ${isOpen ? '' : 'hidden'}
            `}>
                <button>
                    <IconPen />
                </button>
                <button>
                    <IconBorrar />
                </button>
                <button>
                    <IconLetter />
                </button>
            </div>

            <div className="flex items-center gap-0.5">
                <div className={`
                        flex items-center gap-2 px-2 py-1.5 
                        bg-surface rounded-t-lg rounded-bl-lg
                        ${isOpen ? '' : 'hidden'}
                `}>
                    <div className="grid grid-cols-4 gap-x-0.5 gap-y-1">
                        {colors.map((color: ColorItem) => (
                            <button
                                key={color.id}
                                className={`w-3 h-3 rounded-full ${color.bg}`}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-1 text-purple-500">
                        <button>
                            <IconPalette />
                        </button>
                        <button>
                            <IconSquare />
                        </button>
                        <button>
                            <IconCircle />
                        </button>
                        <button>
                            <IconArrow />
                        </button>
                        <button>
                            <IconLine />
                        </button>
                    </div>
                </div>

                <div className="p-2 bg-surface flex items-center justify-center rounded-tl-lg rounded-br-lg">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen 
                            ? <IconExpand />
                            : <IconCollapse />
                        }
                    </button>
                </div>
            </div>
        </div>
    </div>
)}
