import localFont from "next/font/local";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

interface Props {
    content: string
}
export default function TextTicker({ content }: Props) {
    return (
        <div className="flex flex-row relative w-full overflow-hidden h-16 items-center mx-40 ">
            <div className="animate-scroll whitespace-nowrap flex justify-end items-center mx-auto">
                <span className={`${statfont.className} mx-10 inline-block text-4xl text-white`}>PLAYER STAT TRACKER</span>
            </div>
            <div className="animate-scroll whitespace-nowrap flex mx-auto items-center ">
                <span className={`${statfont.className} mx-10 inline-block text-4xl text-white`}>PLAYER STAT TRACKER</span>
            </div>

        </div >
    );
};
