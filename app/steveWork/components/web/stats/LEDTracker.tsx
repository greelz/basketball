import localFont from "next/font/local";

const shotfont = localFont({ src: "../../../../../public/fonts/alarmclock.ttf" });

export default function LEDTracker({ amount, variant }) {
    let places = 8;
    if (amount >= 10) places = 88;
    if (amount >= 100) places = 888;

    let sizeInd = "";
    let sizeBase = "";

    if (variant === 1) {
        sizeInd = `${shotfont.className} z-10 text-white text-9xl`;
        sizeBase = `${shotfont.className} text-gray-900 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0 text-9xl`;
    }
    if (variant === 2) {
        sizeInd = `${shotfont.className} z-10 text-white text-5xl`;
        sizeBase = `${shotfont.className} text-gray-900 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0 text-5xl`;
    }
    if (variant === 3) {
        sizeInd = `${shotfont.className} z-10 text-white text-2xl`;
        sizeBase = `${shotfont.className} text-gray-900 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0 text-2xl`;
    }

    return (
        <div className="col-span-5 row-span-2 relative flex items-center justify-center border-black border-8 bggrayd-nohov">
            <div className={sizeInd}>
                {amount}
            </div>
            <div className={sizeBase}>
                {places}
            </div>
        </div>
    );
}
