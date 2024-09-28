"use client"
import { useEffect, useState } from 'react';

interface Props {
    title: JSX.Element | string;
    content: JSX.Element | string;
    variant?: number;
}

export default function ToggleCollapse({ title, content, variant }: Props) {
    const [isOpen, setIsOpen] = useState(false);


    const toggleAccordion = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }

    let barColor;
    if (variant === 1) { barColor = "w-full text-left p-4 rounded-t-md bgorangegrad text-white font-medium flex justify-between items-center" }
    if (variant === 2) { barColor = "w-full text-left p-4 rounded-md bgbluegrad text-white font-medium flex justify-between items-center" }
    if (!variant) { barColor = "w-full text-left p-4 rounded-md bggraygrad text-white font-medium flex justify-between items-center" }

    return (
        <div className="rounded-t-md shadow-sm w-fit cursor-pointer">
            {/* Accordion Header */}
            <div
                className={barColor}
                onClick={toggleAccordion}
            >
                {title}
                {/* Icon for expand/collapse */}
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </div>

            {/* Accordion Content - Expanded */}
            <div
                className={` bgdgray rounded-b-md shadow-sm  overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
                <div className=" bgdgray max-h-[calc(100vh-4rem)] min-h-[calc(100vh-50)] w-fit rounded-b-md px-8">
                    {content}
                </div>
            </div>
        </div>
    );
}