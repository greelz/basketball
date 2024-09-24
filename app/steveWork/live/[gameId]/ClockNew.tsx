import React, { useRef, useState } from "react";
import localFont from "next/font/local";
const shotfont = localFont({ src: "../../../../public/fonts/alarmclock.ttf" });

export default function ClockNew() {
    const [time, setTime] = useState(960);
    const [isPlaying, setPlaying] = useState(false)
    const interval = useRef<NodeJS.Timeout | null>(null);

    let mins = Math.floor(time / 60);
    if (mins !== "00" && (mins as number) < 10) {
        mins = "0" + mins;
    }
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
            <div className="col-span-5 row-span-2 relative flex items-center justify-center border-black border-8 bggrayd-nohov">
                <div className={`${shotfont.className} text-9xl z-10 text-white`}>
                    {mins}:{secs}
                </div>
                <div className={`${shotfont.className} text-9xl text-gray-900 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0`}>
                    88:88
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
