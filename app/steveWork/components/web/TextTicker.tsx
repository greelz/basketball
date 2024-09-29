import localFont from "next/font/local";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

interface Props {
    content: string
    url?: string
    variant?: number
}
export default function TextTicker({ content, url, variant }: Props) {
    return (
        <>
            {variant ? (
                <div className={`flex flex-row relative w-full overflow-hidden h-12 items-center mx-40 ${url ? 'hover:border-white cursor-pointer' : ''}`}>
                    <div className="animate-scroll whitespace-nowrap flex justify-end mx-auto">
                        <a href={url} className={`${statfont.className} mx-5 inline-block text-4xl text-white`}>
                            {content}
                        </a>
                    </div>
                    <div className="animate-scroll whitespace-nowrap flex mx-auto">
                        <a href={url} className={`${statfont.className} mx-5 inline-block text-4xl text-white`}>
                            {content}
                        </a>
                    </div>
                </div>
            ) : (
                <div className={`flex flex-row relative w-full overflow-hidden h-16 items-center mx-40 ${url ? 'hover:border-white cursor-pointer' : ''}`}>
                    <div className="animate-scroll whitespace-nowrap flex justify-end mx-auto">
                        <a href={url} className={`${statfont.className} mx-5 inline-block text-4xl text-white`}>
                            {content}
                        </a>
                    </div>
                    <div className="animate-scroll whitespace-nowrap flex mx-auto">
                        <a href={url} className={`${statfont.className} mx-5 inline-block text-4xl text-white`}>
                            {content}
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

