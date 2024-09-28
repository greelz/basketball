import LeagueIcon from "./Icons/LeagueIcon";

interface Props {
    url: string;
    content: string;
    variant?: number;
}

export default function BigButton({ url, content, variant }: Props) {

    let barColor;
    if (variant === 1) { barColor = "bgorangegrad w-full h-full p-4 rounded-md cursor-pointer border border-gray-800 flex align-center justify-center items-center text-md" }
    if (variant === 2) { barColor = "bgbluegrad w-full h-full p-4 rounded-md cursor-pointer border border-gray-800 flex align-center justify-center items-center text-md" }
    if (!variant) { barColor = "bggraygrad w-full h-full p-4 rounded-md cursor-pointer border border-black flex align-center justify-center items-center text-md" }



    return (

        <a
            className={barColor}
            href={url}
        >
            {content}
        </a>

    );
}
