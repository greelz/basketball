import localFont from "next/font/local";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RightSidebar from "../../components/admin/RightSidebar";
import LEDTracker from "../../components/web/stats/LEDTracker";
import TextTicker from "../../components/web/TextTicker";
import Tabber from "../../components/web/Tabber";
import Form from "../../components/web/Form";
import Card from "../../components/web/Card";
import TournamentBracket from "../../components/web/stats/TournamentBracket";
import { Game, Season, Team } from "@/app/types";
import MatchupBoardLarge from "../../components/web/MatchupBoardLarge";
import MatchupRowMini from "../../components/web/MatchupRowMini";
import LeaderboardLIVE from "../../components/web/LeaderboardLIVE";
import { getSeasonStatisticsUXsb, getTeamsForSeason } from "@/app/database";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

// Dummy Data
// const col1a = [
//     "Lakeside Hoopers",
//     "Mountain Eagles",
//     "River City Royals",
//     "Downtown Dribblers",
//     "Coastline Crushers",
//     "Skyline Slammers",
//     "Valley Hustlers",
//     "Parkside Panthers",
//     "Sunset Ballers",
//     "Ridgeview Raptors"
// ];
// const col1b = [
//     "10W/5L",
//     "12W/3L",
//     "8W/7L",
//     "15W/2L",
//     "9W/6L",
//     "11W/4L",
//     "6W/9L",
//     "13W/2L",
//     "7W/8L",
//     "14W/1L"
// ];
// const col1c = [
//     "Hoops",
//     "Sky",
//     "Dash",
//     "Swish",
//     "Flash",
//     "Ace",
//     "Jet",
//     "Beast",
//     "Rook",
//     "Maverick"
// ];
// const col2a = [
//     'John Doe',
//     'Michael Smith',
//     'Chris Johnson',
//     'Alex Brown',
//     'David Lee',
//     'James Wilson'
// ];
// const col2b = [
//     'Assists',
//     'Steals',
//     'Points',
//     'Rebounds',
//     'Blocks',
//     'Turnovers'
// ];
// const col2c = [
//     (<div className="text-white !important"><LEDTracker variant={2} amount={43} /></div>),
//     (<div className="text-white !important"><LEDTracker variant={2} amount={23} /></div>),
//     (<div className="text-white !important"><LEDTracker variant={2} amount={17} /></div>),
//     (<div className="text-white !important"><LEDTracker variant={2} amount={10} /></div>),
//     (<div className="text-white !important"><LEDTracker variant={2} amount={6} /></div>),
//     (<div className="text-white !important"><LEDTracker variant={2} amount={4} /></div>),

// ];

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
export default function HomeContent() {
    const activeLeagueId = "PzZH38lp1R6wYs5Luf67";
    const activeSeasonId = "hSIVrUtOGh69EeTZRwat";

    // const [records, games] = await getSeasonStatisticsUXsb(activeLeagueId, activeSeasonId);
    // console.log(`RECORDS: ${JSON.stringify(records, null, 2)}`);
    // console.log(`GAMES: ${JSON.stringify(games, null, 2)}`);


    // const teams: Team[] = await getTeamsForSeason(activeLeagueId, activeSeasonId);
    // console.log(`TEAMS: ${JSON.stringify(teams, null, 2)}`);



    // const data = "data"
    const games: Game[] = [
        {
            "team2": "sJPB64R40EmMww9Nzw18",
            "team2score": 82,
            "team1": "Dgl0Qaer1fR9iVRW2rWU",
            "date": {
                "seconds": 1727376000,
                "nanoseconds": 0
            },
            "team1score": 73,
            "name": "Hooligans & Co. vs Lockdown",
            "gameover": 1,
            "id": "3H0Q5lVamWJRUtqGZd91",
            "team1name": "Hooligans & Co.",
            "team2name": "Lockdown",
            "formattedDate": "09/26",
            "victor": "Lockdown",
            "loser": "Hooligans & Co.",
            "victorScore": 82,
            "loserScore": 73
        },
        {
            "name": "Stretch Fours vs Lockdown",
            "team1score": 68,
            "date": {
                "seconds": 1725561600,
                "nanoseconds": 0
            },
            "gameover": 1,
            "team1": "74k0M13yM3kY6Gd92vO8",
            "team2": "sJPB64R40EmMww9Nzw18",
            "team2score": 66,
            "id": "5thB2NvYnFtsZF5kkHV1",
            "team1name": "Stretch Fours",
            "team2name": "Lockdown",
            "formattedDate": "09/05",
            "victor": "Stretch Fours",
            "loser": "Lockdown",
            "victorScore": 68,
            "loserScore": 66
        },
        {
            "team1score": 47,
            "team2score": 69,
            "date": {
                "seconds": 1725559200,
                "nanoseconds": 0
            },
            "team1": "GAFyxTV3zhWcXjar7Koc",
            "name": "Firm Handshakes vs Lockdown",
            "team2": "sJPB64R40EmMww9Nzw18",
            "gameover": 1,
            "id": "63Tjx1N9cBriaTP6gzAU",
            "team1name": "Firm Handshakes",
            "team2name": "Lockdown",
            "formattedDate": "09/05",
            "victor": "Lockdown",
            "loser": "Firm Handshakes",
            "victorScore": 69,
            "loserScore": 47
        },
        {
            "name": "Concrete Conquistadors vs Prepare to be Boarded",
            "team1": "U89b93HpOFa0kEqHwonf",
            "team2": "oHdQWrbwkcHZKb8313Eo",
            "date": {
                "seconds": 1726771200,
                "nanoseconds": 0
            },
            "id": "9lwLcsVqd9x8MvL78orq",
            "team1name": "Concrete Conquistadors",
            "team2name": "Prepare to be Boarded",
            "formattedDate": "09/19"
        },
        {
            "team1score": 60,
            "date": {
                "seconds": 1725566400,
                "nanoseconds": 0
            },
            "name": "Hooligans & Co. vs Concrete Conquistadors",
            "team2": "U89b93HpOFa0kEqHwonf",
            "team2score": 52,
            "gameover": 1,
            "team1": "Dgl0Qaer1fR9iVRW2rWU",
            "id": "Af7YhCHJYt5DS3EChCvY",
            "team1name": "Hooligans & Co.",
            "team2name": "Concrete Conquistadors",
            "formattedDate": "09/05",
            "victor": "Hooligans & Co.",
            "loser": "Concrete Conquistadors",
            "victorScore": 60,
            "loserScore": 52
        },
        {
            "gameover": 1,
            "team2score": 61,
            "date": {
                "seconds": 1724959200,
                "nanoseconds": 0
            },
            "team1score": 69,
            "name": "Firm Handshakes vs Concrete Conquistadors",
            "team2": "U89b93HpOFa0kEqHwonf",
            "team1": "GAFyxTV3zhWcXjar7Koc",
            "id": "CEQTNGZOAXbjKIhHfj0f",
            "team1name": "Firm Handshakes",
            "team2name": "Concrete Conquistadors",
            "formattedDate": "08/29",
            "victor": "Firm Handshakes",
            "loser": "Concrete Conquistadors",
            "victorScore": 69,
            "loserScore": 61
        },
        {
            "team2score": 62,
            "gameover": 1,
            "team1score": 52,
            "name": "Prepare to be Boarded vs Lockdown",
            "team1": "oHdQWrbwkcHZKb8313Eo",
            "team2": "sJPB64R40EmMww9Nzw18",
            "date": {
                "seconds": 1727977800,
                "nanoseconds": 0
            },
            "id": "Hv3eNv1NiUcibmkANvKX",
            "team1name": "Prepare to be Boarded",
            "team2name": "Lockdown",
            "formattedDate": "10/03",
            "victor": "Lockdown",
            "loser": "Prepare to be Boarded",
            "victorScore": 62,
            "loserScore": 52
        },
        {
            "team2": "oHdQWrbwkcHZKb8313Eo",
            "date": {
                "seconds": 1726161540,
                "nanoseconds": 0
            },
            "team1": "aZt9ylONxqzfu9r1yN6T",
            "name": "Make it, Take it vs Prepare to be Boarded",
            "team2score": 87,
            "team1score": 70,
            "gameover": 1,
            "id": "Jgg8fq1ZPsQIbY7AV0IU",
            "team1name": "Make it, Take it",
            "team2name": "Prepare to be Boarded",
            "formattedDate": "09/12",
            "victor": "Prepare to be Boarded",
            "loser": "Make it, Take it",
            "victorScore": 87,
            "loserScore": 70
        },
        {
            "team1": "GAFyxTV3zhWcXjar7Koc",
            "team2": "oHdQWrbwkcHZKb8313Eo",
            "date": {
                "seconds": 1727371200,
                "nanoseconds": 0
            },
            "gameover": 1,
            "team2score": 56,
            "team1score": 65,
            "name": "Firm Handshakes vs Prepare to be Boarded",
            "id": "KH1aBOn0tsdoqXXdmkpi",
            "team1name": "Firm Handshakes",
            "team2name": "Prepare to be Boarded",
            "formattedDate": "09/26",
            "victor": "Firm Handshakes",
            "loser": "Prepare to be Boarded",
            "victorScore": 65,
            "loserScore": 56
        },
        {
            "team2": "aZt9ylONxqzfu9r1yN6T",
            "gameover": 1,
            "team1score": 61,
            "date": {
                "seconds": 1727373600,
                "nanoseconds": 0
            },
            "team2score": 98,
            "team1": "74k0M13yM3kY6Gd92vO8",
            "name": "Stretch Fours vs Make it, Take it",
            "id": "TPc83YhdRpOX2jU8xhIx",
            "team1name": "Stretch Fours",
            "team2name": "Make it, Take it",
            "formattedDate": "09/26",
            "victor": "Make it, Take it",
            "loser": "Stretch Fours",
            "victorScore": 98,
            "loserScore": 61
        },
        {
            "gameover": 1,
            "name": "Make it, Take it vs Lockdown",
            "team1score": 80,
            "team2score": 77,
            "team1": "aZt9ylONxqzfu9r1yN6T",
            "team2": "sJPB64R40EmMww9Nzw18",
            "date": {
                "seconds": 1726768800,
                "nanoseconds": 0
            },
            "id": "U8dMKUilH99E0beWJcTR",
            "team1name": "Make it, Take it",
            "team2name": "Lockdown",
            "formattedDate": "09/19",
            "victor": "Make it, Take it",
            "loser": "Lockdown",
            "victorScore": 80,
            "loserScore": 77
        },
        {
            "team2": "GAFyxTV3zhWcXjar7Koc",
            "name": "Stretch Fours vs Firm Handshakes",
            "date": {
                "seconds": 1726773600,
                "nanoseconds": 0
            },
            "team1": "74k0M13yM3kY6Gd92vO8",
            "id": "VeOardECvh5zLrZGqGK4",
            "team1name": "Stretch Fours",
            "team2name": "Firm Handshakes",
            "formattedDate": "09/19"
        },
        {
            "team1": "74k0M13yM3kY6Gd92vO8",
            "team2": "Dgl0Qaer1fR9iVRW2rWU",
            "team1score": 76,
            "name": "Stretch Fours vs Hooligans & Co.",
            "team2score": 75,
            "gameover": 1,
            "date": {
                "seconds": 1726164000,
                "nanoseconds": 0
            },
            "id": "aO1JB7WH8yNgv4KHFPUP",
            "team1name": "Stretch Fours",
            "team2name": "Hooligans & Co.",
            "formattedDate": "09/12",
            "victor": "Stretch Fours",
            "loser": "Hooligans & Co.",
            "victorScore": 76,
            "loserScore": 75
        },
        {
            "gameover": 1,
            "team2score": 75,
            "team2": "GAFyxTV3zhWcXjar7Koc",
            "team1": "Dgl0Qaer1fR9iVRW2rWU",
            "team1score": 79,
            "name": "Hooligans & Co. vs Firm Handshakes",
            "date": {
                "seconds": 1726161600,
                "nanoseconds": 0
            },
            "id": "bHfky1qUD5TIa2ywa4Sq",
            "team1name": "Hooligans & Co.",
            "team2name": "Firm Handshakes",
            "formattedDate": "09/12",
            "victor": "Hooligans & Co.",
            "loser": "Firm Handshakes",
            "victorScore": 79,
            "loserScore": 75
        },
        {
            "gameover": 1,
            "team2score": 82,
            "team1score": 68,
            "team1": "U89b93HpOFa0kEqHwonf",
            "team2": "aZt9ylONxqzfu9r1yN6T",
            "date": {
                "seconds": 1727378400,
                "nanoseconds": 0
            },
            "name": "Concrete Conquistadors vs Make it, Take it",
            "id": "cJKEe8Hph5xJfeQ34DAl",
            "team1name": "Concrete Conquistadors",
            "team2name": "Make it, Take it",
            "formattedDate": "09/26",
            "victor": "Make it, Take it",
            "loser": "Concrete Conquistadors",
            "victorScore": 82,
            "loserScore": 68
        },
        {
            "name": "Concrete Conquistadors vs Lockdown",
            "team1": "U89b93HpOFa0kEqHwonf",
            "gameover": 1,
            "team1score": 54,
            "team2score": 68,
            "date": {
                "seconds": 1726168800,
                "nanoseconds": 0
            },
            "team2": "sJPB64R40EmMww9Nzw18",
            "id": "eCI7ru0lU38ZHzfH5EGj",
            "team1name": "Concrete Conquistadors",
            "team2name": "Lockdown",
            "formattedDate": "09/12",
            "victor": "Lockdown",
            "loser": "Concrete Conquistadors",
            "victorScore": 68,
            "loserScore": 54
        },
        {
            "team1": "Dgl0Qaer1fR9iVRW2rWU",
            "name": "Hooligans & Co. vs Prepare to be Boarded",
            "team1score": 57,
            "gameover": 1,
            "team2": "oHdQWrbwkcHZKb8313Eo",
            "team2score": 60,
            "date": {
                "seconds": 1726766400,
                "nanoseconds": 0
            },
            "id": "h5nws2fbSvbxy6X13zuH",
            "team1name": "Hooligans & Co.",
            "team2name": "Prepare to be Boarded",
            "formattedDate": "09/19",
            "victor": "Prepare to be Boarded",
            "loser": "Hooligans & Co.",
            "victorScore": 60,
            "loserScore": 57
        },
        {
            "team1": "oHdQWrbwkcHZKb8313Eo",
            "team2score": 40,
            "team1score": 57,
            "gameover": 1,
            "team2": "sJPB64R40EmMww9Nzw18",
            "date": {
                "seconds": 1724956800,
                "nanoseconds": 0
            },
            "name": "Prepare to be Boarded vs Lockdown",
            "id": "kj0jAW1QT4z3JqoYhSpQ",
            "team1name": "Prepare to be Boarded",
            "team2name": "Lockdown",
            "formattedDate": "08/29",
            "victor": "Prepare to be Boarded",
            "loser": "Lockdown",
            "victorScore": 57,
            "loserScore": 40
        },
        {
            "team2": "aZt9ylONxqzfu9r1yN6T",
            "date": {
                "seconds": 1724954400,
                "nanoseconds": 0
            },
            "team1score": 91,
            "team1": "Dgl0Qaer1fR9iVRW2rWU",
            "team2score": 83,
            "name": "Hooligans & Co. vs Make it, Take it",
            "gameover": 1,
            "id": "lrCR1iV1lg9oiVyA9nce",
            "team1name": "Hooligans & Co.",
            "team2name": "Make it, Take it",
            "formattedDate": "08/29",
            "victor": "Hooligans & Co.",
            "loser": "Make it, Take it",
            "victorScore": 91,
            "loserScore": 83
        },
        {
            "team2": "oHdQWrbwkcHZKb8313Eo",
            "date": {
                "seconds": 1725564000,
                "nanoseconds": 0
            },
            "gameover": 1,
            "team2score": 61,
            "team1": "74k0M13yM3kY6Gd92vO8",
            "name": "Stretch Fours vs Prepare to be Boarded",
            "team1score": 54,
            "id": "n84pXfXKKquRJhEQqXpH",
            "team1name": "Stretch Fours",
            "team2name": "Prepare to be Boarded",
            "formattedDate": "09/05",
            "victor": "Prepare to be Boarded",
            "loser": "Stretch Fours",
            "victorScore": 61,
            "loserScore": 54
        },
        {
            "team1": "74k0M13yM3kY6Gd92vO8",
            "team2": "U89b93HpOFa0kEqHwonf",
            "name": "Stretch Fours vs Concrete Conquistadors",
            "date": {
                "seconds": 1724961600,
                "nanoseconds": 0
            },
            "team2score": 76,
            "team1score": 75,
            "gameover": 1,
            "id": "nxIQxmZ53A6LAoPlWdTW",
            "team1name": "Stretch Fours",
            "team2name": "Concrete Conquistadors",
            "formattedDate": "08/29",
            "victor": "Concrete Conquistadors",
            "loser": "Stretch Fours",
            "victorScore": 76,
            "loserScore": 75
        },
        {
            "team1": "GAFyxTV3zhWcXjar7Koc",
            "team2score": 99,
            "team1score": 91,
            "gameover": 1,
            "date": {
                "seconds": 1727980200,
                "nanoseconds": 0
            },
            "name": "Firm Handshakes vs Make it, Take it",
            "team2": "aZt9ylONxqzfu9r1yN6T",
            "id": "u987zmBUwJOdoBdoWEXb",
            "team1name": "Firm Handshakes",
            "team2name": "Make it, Take it",
            "formattedDate": "10/03",
            "victor": "Make it, Take it",
            "loser": "Firm Handshakes",
            "victorScore": 99,
            "loserScore": 91
        },
        {
            "date": {
                "seconds": 1725556800,
                "nanoseconds": 0
            },
            "name": "Firm Handshakes vs Make it, Take it",
            "team1score": 77,
            "team1": "GAFyxTV3zhWcXjar7Koc",
            "gameover": 1,
            "team2score": 66,
            "team2": "aZt9ylONxqzfu9r1yN6T",
            "id": "zhoXg7njTj6vkVadbvLy",
            "team1name": "Firm Handshakes",
            "team2name": "Make it, Take it",
            "formattedDate": "09/05",
            "victor": "Firm Handshakes",
            "loser": "Make it, Take it",
            "victorScore": 77,
            "loserScore": 66
        }
    ];

    const teams: Team[] = [
        {
            name: "TeamName1",
            id: "team1",
            wins: 0,
            losses: 2,
            ties: 0,
        },
        {
            name: "TeamName2",
            id: "team2",
            wins: 2,
            losses: 4,
            ties: 0,
        },
        {
            name: "TeamName3",
            id: "team3",
            wins: 3,
            losses: 6,
            ties: 0,
        },
        {
            name: "TeamName4",
            id: "team4",
            wins: 5,
            losses: 8,
            ties: 0,
        },
    ];
    games.sort((a, b) => a.formattedDate - b.formattedDate);


    if (!games) {
        return <div>Loading Content...</div>; // loader
    }

    const sortTeamsByWins = (teams: Team[]) => {
        return teams.sort((a, b) => b.wins - a.wins);
    };

    const leaderboard = sortTeamsByWins(teams);

    // console.log('schedule in HomeLayout:', games);

    const tabPanel = [
        { title: 'Top Teams', content: <Card><LeaderboardLIVE teamSlug={`/steveWork/${activeLeagueId}/${activeSeasonId}`} leaderboard={leaderboard} /></Card> },
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
                            {/* Seasons Display Buttons */}
                            {/* <div className="flex flex-row justify-evenly items-center max-h-[210px] w-full mt-4">
                                {seasons.map((s, i) => (
                                    <div key={`${s}${i}`} className="flex flex-col items-center">
                                        <div className="flex grow-[5]">
                                            <BigButton url={`/steveWork/PzZH38lp1R6wYs5Luf67/${s.id}/`} content={s.name} />
                                        </div>
                                    </div>
                                ))}
                            </div> */}

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
                                            {games.filter((g) => !g.gameover).map((g, idx) => (
                                                <a key={`matchup.next.${idx}`} href={`/steveWork/live/${g.id}`}>  <MatchupRowMini date={g.formattedDate} opponent={g.name} /></a>
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
                                            {games.filter((g) => g.gameover).map((g, idx) => (
                                                <a href={`/steveWork/hist/${g.id}`} key={`matchup.past.${g.id}`}> <MatchupRowMini date={g.formattedDate} opponent={g.name} /></a> //teamScore={g.team1score} opponentScore={g.team2score}
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


