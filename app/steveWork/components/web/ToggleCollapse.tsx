"use client"
import { useState } from 'react';
import { JSXSource } from 'react/jsx-dev-runtime';

interface Props {
    title: string;
    content: JSX.Element | string;
}

function ToggleCollapse({ title, content }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-300 rounded-md shadow-sm mb-4 hover:bg-white min-w-fit">
            {/* Accordion Header */}
            <button
                className="w-full text-left p-4 bg-gray-100 text-gray-800 font-medium flex justify-between items-center focus:outline-none hover:bg-white"
                onClick={toggleAccordion}
            >
                {title}
                {/* Icon for expand/collapse */}
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </button>

            {/* Accordion Content - Expanded */}
            <div
                className={`shadow-md overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
                <div className="p-4 bg-white max-h-[calc(100vh-4rem)] overflow-auto whitespace-nowrap">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default ToggleCollapse;