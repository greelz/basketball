"use client";
import localFont from "next/font/local";
import AdminSidebar from "../../components/admin/AdminSidebar";
import HeaderContainer from "../../components/web/HeaderContainer";
import HighlightChart from "../../components/web/HighlightChart";
import BigButton from "../../components/web/BigButton";
import RightSidebar from "../../components/admin/RightSidebar";
import { useState } from "react";
import { useRouter } from "next/router";
import LEDTracker from "../../components/web/stats/LEDTracker";
import TextTicker from "../../components/web/TextTicker";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

// Dummy Data
const col1a = [
    "Lakeside Hoopers",
    "Mountain Eagles",
    "River City Royals",
    "Downtown Dribblers",
    "Coastline Crushers",
    "Skyline Slammers",
    "Valley Hustlers",
    "Parkside Panthers",
    "Sunset Ballers",
    "Ridgeview Raptors"
];
const col1b = [
    "10W/5L",
    "12W/3L",
    "8W/7L",
    "15W/2L",
    "9W/6L",
    "11W/4L",
    "6W/9L",
    "13W/2L",
    "7W/8L",
    "14W/1L"
];
const col1c = [
    "Hoops",
    "Sky",
    "Dash",
    "Swish",
    "Flash",
    "Ace",
    "Jet",
    "Beast",
    "Rook",
    "Maverick"
];
const col2a = [
    'John Doe',
    'Michael Smith',
    'Chris Johnson',
    'Alex Brown',
    'David Lee',
    'James Wilson'
];
const col2b = [
    'Assists',
    'Steals',
    'Points',
    'Rebounds',
    'Blocks',
    'Turnovers'
];
const col2c = [
    (<div className="text-white !important"><LEDTracker variant={2} amount={43} /></div>),
    (<div className="text-white !important"><LEDTracker variant={2} amount={23} /></div>),
    (<div className="text-white !important"><LEDTracker variant={2} amount={17} /></div>),
    (<div className="text-white !important"><LEDTracker variant={2} amount={10} /></div>),
    (<div className="text-white !important"><LEDTracker variant={2} amount={6} /></div>),
    (<div className="text-white !important"><LEDTracker variant={2} amount={4} /></div>),

];

interface IIdAndName {
    id: string;
    name: string;
}
interface ILinkListProps {
    data: IIdAndName[];
    slug: string;
}
export default function HomeContent({ data, slug }: ILinkListProps) {
    const [isHovered, setisHovered] = useState(false);
    // console.log('Data in HomeContent:', data);
    return (
        <div className="flex h-screen">
            {/* Left Column */}
            <div className="row-span-5">
                <AdminSidebar />
            </div>
            {/* Center Column */}
            <div className="flex-1 flex flex-col justify-start items-center border-white border-r-8 m">
                <img src="/bballSVG.svg" alt="Basketball" className="max-w-sm align-center animate-bobbing" />
                <div className="border-2 border-transparent bggrayd-nohov w-full whitespace-nowrap">
                    <div className="flex flex-row flex-1 items-center">
                        <TextTicker content={"Welcome to Slab League"} url={`${slug}/${data[0].id}`} />
                    </div>
                </div>
                <HeaderContainer />
                <div className="grid grid-cols-2 grid-rows-1 w-full h-full mt-5 overflow-y-auto gap-2 ">
                    <div className="flex flex-1 flex-col justify-start align-center mx-4">
                        <HighlightChart
                            titleContent={'Top Teams'}
                            col1Title={'Teams'}
                            col1data={col1a}
                            col2Title={"W/L"}
                            col2data={col1b}
                            col3Title={'MVP'}
                            col3data={col1c}
                        />
                    </div>
                    <div className="flex flex-1 flex-col justify-start align-center mx-4">
                        <HighlightChart
                            titleContent={'Top Players'}
                            col1Title={'Player'}
                            col1data={col2a}
                            col2Title={"Stat"}
                            col2data={col2b}
                            col3Title={'Score'}
                            col3data={col2c}
                        />
                    </div>
                </div>
            </div>
            {/* Right Column */}
            <div className="row-span-5">
                <RightSidebar />
            </div>
        </div>
    );
}
