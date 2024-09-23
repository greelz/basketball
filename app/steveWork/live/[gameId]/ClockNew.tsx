import React, { useRef, useState } from "react";
import localFont from "next/font/local";
const shotfont = localFont({ src: "../../../../public/fonts/sevensegment.ttf" });

export default function ClockNew() {
    const [time, setTime] = useState(960);
    const [isPlaying, setPlaying] = useState(false)
    const interval = useRef<NodeJS.Timeout | null>(null);

    const mins = Math.floor(time / 60);
    let secs = time % 60 || "00";
    if (secs !== "00" && (secs as number) < 10) {
        secs = "0" + secs;
    }


    const handlePlayStopClick = () => {
        if (!isPlaying) {
            console.log(interval.current);
            if (!interval.current) {
                interval.current = setInterval(
                    () => setTime((prev) => --prev),
                    1000);
            };
            togglePlayStop();
        }
        else {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            };
            togglePlayStop();
        }
    }

    const togglePlayStop = () => {
        setPlaying(!isPlaying);
    };


    return (
        <div className="grid grid-cols-7 grid-rows-2 gap-4 mb-4">
            <div className="">
                <button className="min-w-full bggraygrad text-xl " onClick={() => setTime((prev) => ++prev)}>▲</button>
            </div>
            <div className="col-span-5 row-span-2 flex align-center items-center justify-center  border-black border-8">
                <div className={`${shotfont.className} text-9xl`}>
                    {mins}:{secs}
                </div>
            </div>
            <div className="col-start-7">
                <div className={isPlaying ? "hidden" : "contents"}>
                    <button
                        className="min-w-full bggraygrad text-xl"
                        onClick={handlePlayStopClick}
                    >
                        ▶
                    </button>
                </div>
                <div className={isPlaying ? "contents" : "hidden"}>
                    <button
                        className="min-w-full bggraygrad text-xl"
                        onClick={handlePlayStopClick}
                    >
                        <span style={{ color: 'white' }}>⏸</span>
                    </button>
                </div>
            </div>
            <div className="row-start-2"><button className="min-w-full bggraygrad text-xl" onClick={() => setTime((prev) => --prev)}>
                ▼
            </button>
            </div>
            <div className="col-start-7 row-start-2"><button className="min-w-full bggraygrad text-xl" onClick={() => setTime(960)}>
                <span style={{ color: 'white' }}>⏮︎</span>
            </button></div>
        </div>

    );
}
