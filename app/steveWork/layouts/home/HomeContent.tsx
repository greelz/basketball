
"use client"
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
import { findFinishedGameIdsByTeamId, findUpcomingGamesByTeamId, getAllPlayerStats, getGamesForSeason, getSeasons, getSeasonSchedule, getTeamsForSeason } from "@/app/database";
import next from "next";
import { Game, PlayerStats, Season, Team } from "@/app/types";
import MatchupBoardLarge from "../../components/web/MatchupBoardLarge";
import MatchupRowMini from "../../components/web/MatchupRowMini";
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
    unfinishedGames: Game[];
    finishedGames: Game[];
    upcomingGames: Game[];
    seasons: Season[];
    teams: Team[];
    games: Game[];
}

// placeholder
// HomeContent({ data, unfinishedGames, finishedGames, upcomingGames, seasons, teams, games }: ILinkListProps) {
export default function HomeContent() {
    const data = "data"
    const games: Game[] = [
        {
            name: "game.name1",
            id: "game1gg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name", gameover: 1,
            date: { date: "07/26", time: "who cares" },
            team1score: 200,
            team2score: 100,
        },
        {
            name: "game.name2",
            id: "game2nogg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name",
            date: { date: "09/11", time: "who cares" },
            team1score: 199,
            team2score: 99,
        },
        {
            name: "game.name3",
            id: "game3nogg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name",
            date: { date: "08/11", time: "who cares" },
            team1score: 199,
            team2score: 99,
        },
        {
            name: "game.name4",
            id: "game4nogg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name",
            date: { date: "07/11", time: "who cares" },
            team1score: 199,
            team2score: 99,
        },
        {
            name: "game.name5",
            id: "game5nogg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name",
            date: { date: "05/11", time: "who cares" },
            team1score: 199,
            team2score: 99,
        },
        {
            name: "game.name1",
            id: "game1gg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name", gameover: 1,
            date: { date: "07/26", time: "who cares" },
            team1score: 200,
            team2score: 100,
        },
        {
            name: "game.name2",
            id: "game2nogg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name",
            date: { date: "09/11", time: "who cares" },
            team1score: 199,
            team2score: 99,
        },
        {
            name: "game.name3",
            id: "game3nogg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name",
            date: { date: "08/11", time: "who cares" },
            team1score: 199,
            team2score: 99,
        },
        {
            name: "game.name4",
            id: "game4nogg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name",
            date: { date: "07/11", time: "who cares" },
            team1score: 199,
            team2score: 99,
        },
        {
            name: "game.name5",
            id: "game5nogg",
            team1: "team1",
            team2: "team2",
            team1name: "team1name",
            team2name: "team2name",
            date: { date: "05/11", time: "who cares" },
            team1score: 199,
            team2score: 99,
        }
    ];
    const teams: Team[] = [
        {
            name: "TeamName1",
            id: "team1",
            wins: 3,
            losses: 2,
            ties: 0,
        },
        {
            name: "TeamName2",
            id: "team2",
            wins: 3,
            losses: 2,
            ties: 0,
        },
        {
            name: "TeamName3",
            id: "team3",
            wins: 3,
            losses: 2,
            ties: 0,
        },
        {
            name: "TeamName4",
            id: "team4",
            wins: 3,
            losses: 2,
            ties: 0,
        },
    ]
    games.sort((a, b) => a.date.date - b.date.date);
    games.forEach((game) => {
        // const teamA = getTeamNameFromCachedTeams(game.team1, teams);
        // const teamB = getTeamNameFromCachedTeams(game.team2, teams);
        const teamA = game.team1;
        const teamB = game.team2;
        // const dateObj = game.date.toDate();
        const dateObj = game.date.date;
        const formattedDate = dateObj;
        game.date = { date: formattedDate };
        game.name = `${teamA} vs ${teamB}`;
        game.team1name = teamA;
        game.team2name = teamB;

        if (game.gameover && game.team1score > game.team2score) {
            game.victor = game.team1name;
            game.loser = game.team2name;
            game.victorScore = game.team1score;
            game.loserScore = game.team2score;
        } else if (game.gameover && game.team1score < game.team2score) {
            game.victor = game.team2name;
            game.loser = game.team1name;
            game.victorScore = game.team2score;
            game.loserScore = game.team1score;
        }
    });
    // const seasons = await getSeasons('PzZH38lp1R6wYs5Luf67');
    const seasons = [
        { name: "Season1", id: "season1" },
        { name: "Season2", id: "season2" },
        { name: "Season3", id: "season3" },
    ]
    if (!games) {
        return <div>Loading Content...</div>; // loader
    }



    // console.log('schedule in HomeLayout:', games);

    const tabPanel = [
        { title: 'Top Teams', content: <Card><WebSectionList /></Card> },
        { title: 'League History', content: <Card><MatchupBoardLarge games={games} /></Card> },
        { title: 'Standings', content: <Card><TournamentBracket /></Card> },
        { title: 'Login/Register', content: <Form /> },
    ];

    return (
        <>
            <div className="flex flex-col min-h-screen max-h-full overflow-y-auto homeRadial">
                <div className="flex-1 flex flex-col h-full">
                    <div className="flex flex-1 ">
                        {/* Left Column */}
                        <div className="row-span-5 hidden 2xl:contents">
                            <AdminSidebar />
                        </div>
                        {/* Center Column */}
                        <div className="flex flex-col flex-1 justify-start items-center overflow-y-auto pt-4">
                            <img src="/bballSVG.svg" alt="Basketball" className="h-[150px] align-center animate-bobbing" />
                            <a className={`${statfont.className} text-6xl border-2 border-transparent text-center  w-full whitespace-nowrap hover:border-white cursor-pointer`}>
                                Welcome to Slab League!
                            </a>
                            <div className="border-2 border-transparent bggrayd-nohov w-full whitespace-nowrap">
                                <div className="flex flex-row flex-1 items-center">
                                    <TextTicker content={"Active Leagues"} />
                                </div>
                            </div>
                            <div className="flex flex-row justify-evenly items-center max-h-[210px] w-full mt-4">
                                {seasons.map((s, i) => (
                                    <div key={`${s}${i}`} className="flex flex-col items-center">
                                        <div className="flex grow-[5]">
                                            <BigButton url={`/steveWork/PzZH38lp1R6wYs5Luf67/${s.id}/`} content={s.name} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 my-6 w-full xl:grid-cols-2 ">
                                {/* Upcoming Games */}
                                <div className="mx-5">
                                    <div className="flex flex-col w-full my-2 xl:my-0">
                                        <div className="text-center bgorangegrad py-2 col-span-2  lg:col-span-1">Upcoming games</div>
                                        <div className="grid grid-flow-col bgbluegrad grid-cols-2 w-full">
                                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Date</div>
                                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Matchup</div>
                                        </div>
                                        <div className="max-h-[250px] w-full overflow-y-auto">
                                            {games.map((g, idx) => (
                                                <a key={`matchup.next.${idx}`} href={`/steveWork/live/${g.id}`}>  <MatchupRowMini date={g.date.date} opponent={g.name} /></a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Past Games */}
                                <div className="mx-5">
                                    <div className="flex flex-col w-full my-2 xl:my-0">
                                        <div className="text-center bgorangegrad py-2 col-span-1  lg:col-span-1">Recent games</div>
                                        <div className="grid grid-flow-col bgbluegrad grid-cols-4">
                                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Date</div>
                                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Matchup</div>
                                            <div className="text-center  col-span-2 border-white border-2 lg:col-span-2">Score</div>
                                        </div>
                                        <div className="max-h-[250px] w-full overflow-y-auto">
                                            {games.map((g, idx) => (
                                                <a href={`/steveWork/hist/${g.id}`} key={`matchup.past.${g.id}`}> <MatchupRowMini date={g.date.date} opponent={g.name} teamScore={g.team1score} opponentScore={g.team2score} /></a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-2 border-transparent bggrayd-nohov w-full whitespace-nowrap">
                                <div className="flex flex-row flex-1 items-center">
                                    <TextTicker content={"Player Stat Tracker"} />
                                </div>
                            </div>
                            <Tabber tabPanel={tabPanel} />
                        </div>
                        {/* Right Column */}
                        <div className="row-span-5 hidden">
                            <RightSidebar />
                        </div>
                    </div >
                </div >
            </div >
        </>

    )
}


