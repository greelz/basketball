"use client"
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import React, { useState } from "react";

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownSelectorProps {
    options: DropdownOption[];
    onSelect: (value: string) => void;
    label: string;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ options, onSelect, label }) => {
    if (!options || options.length === 0) {
        return <div>Loading...</div>; // loader
    }
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const { label, value } = options;

    const handleSelect = (value: string) => {
        setSelected(value);
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left w-full">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-between items-center bggraygrad w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none transition-all duration-300 ease-in-out"
                >
                    {selected ? options.find((o) => o.value === selected)?.label : label}
                    <ChevronDownIcon className={`w-5 h-5 ml-2 -mr-1 text-white transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            <div
                className={`transition-all  duration-300 ease-in-out origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-20 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <div className="py-2">
                    {options.map((option, idx) => (
                        <button
                            key={`${option.value}.${idx}`}
                            onClick={() => handleSelect(option.value)}
                            className="block w-full text-left px-4 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200 ease-in-out  w-full h-full p-4 rounded-md cursor-pointer border border-black flex align-center justify-center items-center text-md"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropdownSelector;
