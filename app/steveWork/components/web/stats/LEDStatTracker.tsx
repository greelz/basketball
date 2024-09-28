import localFont from "next/font/local";

const statfont = localFont({ src: "../../../../../public/fonts/alarmclock.ttf" });
const shotfont = localFont({ src: "../../../../../public/fonts/dsdigi.ttf" });

export default function LEDStatTracker({ player, stat, variant }) {

    let totalStats = player ? (player[stat] ?? 0) : 0;
    const dummy1 = player ? (player[stat] ?? 0) : 0;
    const dummy2 = stat ? (stat ?? 0) : 0;

    let places = 8;
    if (totalStats <= 10) places = 88;
    if (totalStats >= 100) places = 888;
    if (isNaN(totalStats)) totalStats = 0;

    let sizeInd = "";
    let sizeBase = "";
    let statSize = "";
    let statTrackerSize = "";
    let borderBox = "";

    if (variant === 1) {
        sizeInd = `${shotfont.className} z-10 text-white text-9xl`;
        sizeBase = `${shotfont.className} text-gray-900 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0 text-9xl`;
        statSize = `${statfont} text-lg text-center bggraygrad`;
        statTrackerSize = `bggrayd-nohov w-full max-w-[150px] h-full max-h-[150px] m-2`
        borderBox = "relative flex items-center justify-center border-black border-8 bggrayd-nohov"
    }
    if (variant === 2) {
        sizeInd = `${shotfont.className} z-10 text-inherit text-7xl`;
        sizeBase = `${shotfont.className} text-gray-900 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0 text-7xl`;
        statSize = `${shotfont.className} text-md text-center bggraygrad no-wrap whitespace-nowrap overflow-hidden`;
        statTrackerSize = `bggrayd-nohov w-full max-w-[75px] h-full max-h-[75px] m-2 flex-none `;
        borderBox = "relative flex items-center justify-center border-black border-4 bggrayd-nohov";
    }
    if (variant === 3) {
        sizeInd = `${shotfont.className} z-10 text-white text-2xl`;
        sizeBase = `${shotfont.className} text-gray-900 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0 text-2xl`;
        statSize = `${shotfont.className} hidden`;
        statTrackerSize = `bggrayd-nohov w-full max-w-[50px] h-full max-h-[60px] m-2`;
        borderBox = "relative flex items-center justify-center border-black border-2 bggrayd-nohov"
    }

    return (
        <div className={statTrackerSize}>
            <div className={statSize}>{stat}</div>
            <div className={borderBox}>
                <div className={sizeInd}>
                    {totalStats}
                </div>
                <div className={sizeBase}>
                    {places}
                </div>
            </div>
        </div>
    );
}
