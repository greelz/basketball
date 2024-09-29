"use client"
import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";

const shotfont = localFont({ src: "../../../../../public/fonts/alarmclock.ttf" });

interface Props {
    amount?: number; // Make amount optional
    color: string;
}

export default function LEDDisplayColor({ amount = 0, color }: Props) { // Default to 0
    const [displayValue, setDisplayValue] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Failsafe for undefined amount
        if (amount === undefined || amount === null) {
            setDisplayValue(0); // Set display value to 0 if amount is undefined
            return; // Exit early if amount is not ready
        }

        // Only start the animation if amount is greater than 0 (avoids load delays)
        if (amount > 0) {
            let start = 0;

            // Calculate a random duration between 0.2 and 0.5 seconds added to a base of 1 second
            const totalDuration = 1000 + Math.random() * 300; // 1000 ms + random from 0 to 300 ms

            // Calculate the increment amount based on the total duration and the target amount
            const incrementAmount = Math.ceil(amount / (totalDuration / 50)); // 50 ms increments

            const animate = () => {
                if (start < amount) {
                    start += incrementAmount;
                    setDisplayValue(Math.min(start, amount));
                    timeoutRef.current = window.setTimeout(animate, 50); // 50 ms increments
                } else {
                    setDisplayValue(amount); // Ensure it ends at the final amount
                }
            };

            animate(); // Start the animation

            return () => {
                if (timeoutRef.current) {
                    window.clearTimeout(timeoutRef.current);
                }
            };
        } else {
            setDisplayValue(0); // If amount is 0 or less, reset displayValue
        }
    }, [amount]);

    // Format displayValue with leading zero for single digits
    const formattedValue = displayValue.toString().padStart(2, '0');

    let places = 8;
    if (amount >= 10) places = 88;
    if (amount >= 100) places = 888;

    return (
        <div className="col-span-5 row-span-2 relative flex items-center justify-center  ">
            <div className={`${shotfont.className} z-10 text-5xl ${color}`}>
                {formattedValue}
            </div>
            <div className={`${shotfont.className} text-gray-900 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0 text-5xl`}>
                {places}
            </div>
        </div>
    );
}
