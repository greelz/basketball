
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
import Tabber from "../../components/web/Tabber";

import Form from "../../components/web/Form";
import WebSectionList from "../../components/web/WebSectionList";
import WebSectionList2 from "../../components/web/WebSectionList2";
import Card from "../../components/web/Card";
import TournamentBracket from "../../components/web/stats/TournamentBracket";
import { getAllPlayerStats, getSeasons, getSeasonSchedule } from "@/app/database";
import next from "next";
import { Team } from "@/app/types";
import MatchupBoardLarge from "../../components/web/MatchupBoardLarge";
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


export default async function HomeContent({ data, slug }: ILinkListProps) {

    const leagueUrl = "placeholder";
    const leagueName = "placeholder";
    const amount = 3;

    const seasons = await getSeasons('PzZH38lp1R6wYs5Luf67');
    console.log(seasons);
    const games = await getSeasonSchedule("PzZH38lp1R6wYs5Luf67", "NQ7C9eCOxkV6NWwi73Gj");


    games.forEach((game) => {
        const team1 = game.team1ref.name;
        const team2 = game.team2ref.name;
        game.name = `${team1} vs ${team2}`;
        const dateObj = game.date.toDate();
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit'
        });
        game.newDate = formattedDate;
        game.team2ref.name = game.team2ref.name;
    });

    games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());
    console.log('schedule in HomeLayout:', games);
    const gameDates = games.map((game) => {
        const dateObj = game.date.toDate();
        const date = dateObj.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit'
        });
        return { date: date };
    });

    const tabPanel = [
        { title: 'Top Teams', content: <Card><WebSectionList /></Card> },
        { title: 'League History', content: <Card><MatchupBoardLarge games={games.filter((g) => !g.gameover)} dates={games.filter((g) => !g.gameover).map((g) => g.newDate || next)} /></Card> },
        { title: 'Standings', content: <Card><TournamentBracket /></Card> },
        { title: 'Login/Register', content: <Form /> },
    ];

    return (
        <>
            <div className="flex flex-col min-h-screen max-h-full">
                <div className="flex-1 flex flex-col h-full">
                    <div className="flex h-full overflow-hidden homeRadial ">
                        {/* Left Column */}
                        <div className="row-span-5 ">
                            <AdminSidebar />
                        </div>

                        {/* Center Column */}
                        <div className="flex flex-col flex-1 justify-start items-center overflow-y-auto pt-2">
                            <img src="/bballSVG.svg" alt="Basketball" className="h-[150px] align-center animate-bobbing" />
                            <a className={`${statfont.className} text-6xl border-2 border-transparent text-center  w-full whitespace-nowrap hover:border-white cursor-pointer`}>
                                Welcome to Slab League!
                            </a>

                            <div className="border-2 border-transparent bggrayd-nohov h-12 whitespace-nowrap mt-8 w-full">
                                <div className="flex flex-row flex-1 items-center">
                                    <TextTicker content={"Active Leagues"} variant={1} />
                                </div>
                            </div>
                            <div className="flex flex-row justify-evenly items-center max-h-[210px] w-full my-4">
                                {seasons.map((s, i) => (
                                    <div key={`${s}${i}`} className="flex flex-col items-center">
                                        <div className="flex grow-[5]">
                                            <BigButton url={`/steveWork/PzZH38lp1R6wYs5Luf67/${s.id}/`} content={s.name} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                {/* Upcoming Games */}
                                <div className="flex flex-col justify-start items-center w-full max-h-[250px] overflow-hidden">
                                    <HighlightChart
                                        titleContent={"Upcoming Events"}
                                        col1Title={"Date"}
                                        col2Title={"Team"}
                                        col3Title={"Team"}
                                        col1data={games.filter((g) => !g.gameover).map((g) => g.newDate || next)}
                                        col2data={games.filter((g) => !g.gameover).map((g) => g.team1ref.name || next)}
                                        col3data={games.filter((g) => !g.gameover).map((g) => g.team2ref.name || next)}
                                        variant={1}
                                    />
                                </div>
                                {/* Past Games */}
                                <div className="flex flex-col justify-start items-center w-full max-h-[250px] overflow-hidden mb-4">
                                    <HighlightChart
                                        titleContent={"Upcoming Games"}
                                        col1Title={"Date"}
                                        col2Title={"Opponents"}
                                        col3Title={"Team"}
                                        col4Title={"Opps"}
                                        col1data={amount}
                                        col2data={amount}
                                        col3data={amount}
                                        col4data={amount}
                                        variant={1}
                                    />
                                </div>
                            </div>
                            <a className={`${statfont.className} text-4xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer`}>
                                What's new in the slab?
                            </a>
                            <Tabber tabPanel={tabPanel} />
                        </div>
                        {/* Right Column */}
                        <div className="row-span-5 hidden 2xl:contents">
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

function getTeamNameFromCachedTeams(teamId: string, games: Team[]) {
    return games.find((g) => t.team1 === teamId)?.name;
}
