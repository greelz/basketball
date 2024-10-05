

import React from "react";
import { getTeamStatsforGame, getGamesForSeason, getTeamPlayersFromGame, getThisTeamStatsFromGame, getPlayersFromTeam, getTeamNameByTeamId, findFinishedGameIdsByTeamId, findUpcomingGamesByTeamId, getTeamsForSeason } from "@/app/database";
import { Game, Player, PlayerStats, Team } from "@/app/types";
import localFont from "next/font/local";
import AdminSidebar from "@/app/steveWork/components/admin/AdminSidebar";
import RightSidebar from "@/app/steveWork/components/admin/RightSidebar";
import HighlightChart from "@/app/steveWork/components/web/HighlightChart";
import LEDTracker from "@/app/steveWork/components/web/stats/LEDTracker";
import PlayerStatBlock from "@/app/steveWork/components/web/stats/PlayerStatBlock";
import TextTicker from "@/app/steveWork/components/web/TextTicker";
import Tabber from "@/app/steveWork/components/web/Tabber";
import PlayerSeasonAverageBlock from "@/app/steveWork/components/web/stats/PlayerSeasonAverageBlock";
import MatchupRowMini from "@/app/steveWork/components/web/MatchupRowMini";
const statfont = localFont({ src: "../../../../../../public/fonts/dsdigi.ttf" });

//dummydata
// const foundGames =
//   ['EvWTPOCAPLVabXz203uT',
//     'MhmwelMVcoqTD5jP2Khv',
//     'XqiKpopCXjOoMCey38m9',
//     'fAcIMHHemlkdLUK3uiug',
//     'jiVX2lIuapvPBJOtRF0E',
//     'lyOBJNWPdDdLoQfX6yyf',
//     'qpeWXJToPHNXaEM512QV'
//   ];
// const leagueId = 'PzZH38lp1R6wYs5Luf67';
// const seasonId = 'NQ7C9eCOxkV6NWwi73Gj';
// const teamId = '1Z1jgCYq0hd9Pk9xXsls';

const filterGamesbyIds = (games, gameIds) => {
    if (!Array.isArray(gameIds)) {
        console.error("gameIds is not an array");
        return [];
    }
    return games.filter(game => gameIds.includes(game.id));
}

function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
    return teams.find((t) => t.id === teamId)?.name;
}




interface IPage {
    params: {
        leagueId: string;
        seasonId: string;
        teamId: string;
    };
}

export default async function TeamsContent({ params }: IPage) {
    const { leagueId, seasonId, teamId } = params;
    //aggregate season data and format date/time
    const teams = await getTeamsForSeason(leagueId, seasonId);
    const games = await getGamesForSeason(leagueId, seasonId);
    //isolateTeamName and team
    const teamName = await getTeamNameByTeamId(leagueId, seasonId, teamId);
    const myTeam = teams.find(t => teamId === t.id);

    // console.log(`teamName: ${JSON.stringify(teamName, null, 2)}`);

    games.forEach((game) => {

        let teamA = getTeamNameFromCachedTeams(game.team1, teams);
        let teamB = getTeamNameFromCachedTeams(game.team2, teams);
        let opponent;
        if (game.team1 && game.team2) {
            if (teamName === teamA && teamName !== teamB) {
                opponent = teamB;
            } else if (teamName === teamB && teamName !== teamA) {
                opponent = teamA;
            }
            game.name = opponent ? `${opponent}` : `${teamA} vs ${teamB}`;
        }
    });
    //sort games into order
    games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());

    //filtergames into finished and unfinished for THIS team (id:string, Game[])
    const unfinishedGameIds = await findUpcomingGamesByTeamId(teamId, games);
    const finishedGameIds = await findFinishedGameIdsByTeamId(teamId, games);
    //separate Game[]data into upcoming and completedgames
    const upcomingGameData: Game[] = filterGamesbyIds(games, unfinishedGameIds);
    const completedGamesData: Game[] = filterGamesbyIds(games, finishedGameIds);

    //set date and time of upcominggames to strings
    const upcomingGameDateData = upcomingGameData.map((game: Game) => {
        const dateObj = game.date.toDate();
        const date = dateObj.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit'
        });
        const time = game.date.toDate().toLocaleTimeString();
        return { date: date, time: time };
    });

    //set date and time of completedGames to strings
    const completedGameDateData = completedGamesData.map((game: Game) => {
        const dateObj = game.date.toDate();
        const date = dateObj.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit'
        });
        const time = game.date.toDate().toLocaleTimeString();
        return { date: date, time: time };
    });

    //Isolate Dates/Times to array for matchupRows
    const upcomingGameDates = upcomingGameDateData.map((d) => d.date);
    const upcomingGameTimes = upcomingGameDateData.map((d) => d.time);
    const completedGameDates = completedGameDateData.map((d) => d.date);
    const completedGameTimes = completedGameDateData.map((d) => d.time);

    //get all player stats from all finished games of the season
    const seasonGameStats = await Promise.all(
        finishedGameIds.map((g) => {
            return getTeamStatsforGame(leagueId, seasonId, g, teamId);
        }));
    //loop over games of the season and sort into Player:{stats}
    const seasonGameStatArray = seasonGameStats.map((g) => g.teamPlayerStats);
    const combinePlayerStats = (seasonGameStatArray) => {
        const playerStatTotals = {};
        seasonGameStatArray.flat().forEach(player => {
            const { id, teamId, name, ...stats } = player;
            // If the player already exists in the playerStatTotals, accumulate their stats
            if (playerStatTotals[id]) {
                Object.keys(stats).forEach(stat => {
                    playerStatTotals[id][stat] += stats[stat];
                });
            } else {
                playerStatTotals[id] = {
                    id, teamId, name, ...stats,
                };
            }
        });
        // Convert the playerStatsTotals object back into an array
        return Object.values(playerStatTotals);
    };
    //sum up all playerStats
    const seasonPlayerValues = combinePlayerStats(seasonGameStatArray);

    //map variables for charting
    const teamScore: number[] = completedGamesData.map((g) => {
        return teamId === g.team1 ? g.team1score : g.team2score;
    });
    const opponentScore: number[] = completedGamesData.map((g) => {
        return teamId === g.team1 ? g.team2score : g.team1score;
    });

    const teamPlayerNames: string[] = seasonPlayerValues.map((p) => p.name);
    const upcomingOpponents: string[] = upcomingGameData.map((g) => g.name);
    const previousOpponents: string[] = completedGamesData.map((g) => g.name);

    const tabPanel = [
        {
            title: 'Season Stats',
            content:
                (<div className="grid pb-10 gap-4 m-5 grid-flow-row bggrayd-nohov rounded-lg">
                    {teamPlayerNames.map((n, idx) => (
                        <div key={`statBlock${idx}`} className="flex flex-1 flex-col justify-center items-center">
                            <PlayerStatBlock allPlayers={seasonPlayerValues} selectedPlayer={teamPlayerNames[idx]} />
                        </div>
                    ))}
                </div>)
        },
        {
            title: 'Player Averages',
            content:
                (<div className="grid pb-10 gap-4 m-5 grid-flow-row bggrayd-nohov rounded-lg">
                    {teamPlayerNames.map((n, idx) => (
                        <div key={`avgBlocks${idx}`} className="flex flex-1 flex-col justify-center items-center">
                            <PlayerSeasonAverageBlock allPlayers={seasonPlayerValues} selectedPlayer={teamPlayerNames[idx]} divisor={finishedGameIds.length} />
                        </div>
                    ))}
                </div>)
        },
    ];

    return (
        <>
            <div className="flex flex-col min-h-screen max-h-full">
                <div className="flex-1 flex flex-col h-full">
                    <div className="flex h-full overflow-hidden homeRadial ">
                        {/* Left Column */}
                        <div className="row-span-5 hidden 2xl:contents">
                            <AdminSidebar />
                        </div>

                        {/* Center Column */}
                        <div className="flex flex-col flex-1 justify-start items-center overflow-y-auto">
                            <img src="/bballSVG.svg" alt="Basketball" className="h-[150px] align-center animate-bobbing" />
                            <a className={`${statfont.className} text-6xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer`}>
                                {teamName} Stats
                            </a>
                            <div className="flex flex-row justify-evenly items-center max-h-[210px] w-full my-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex grow-[5]">
                                        <LEDTracker variant={1} amount={myTeam!.wins} />
                                    </div>
                                    <p className="text-center font-bold">Wins</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex grow-[5]">
                                        <LEDTracker variant={1} amount={myTeam!.losses} />
                                    </div>
                                    <p className="text-center font-bold">Losses</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex grow-[5]">
                                        <LEDTracker variant={1} amount={completedGamesData.length} />
                                    </div>
                                    <p className="text-center font-bold">Games Played</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 my-6 w-full xl:grid-cols-2 ">
                                {/* Upcoming Games */}
                                <div className="mx-5">
                                    <div className="flex flex-col w-full my-2 xl:my-0">
                                        <div className="text-center bgorangegrad py-2 col-span-2  lg:col-span-1">Upcoming games</div>
                                        <div className="grid grid-flow-col bgbluegrad grid-cols-2 w-full">
                                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Date</div>
                                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Opponenent</div>
                                        </div>
                                        <div className="max-h-[250px] w-full overflow-y-auto">
                                            {upcomingOpponents.map((o, idx) => (
                                                <a key={`matchup.next.${idx}`} href={`/steveWork/live/${unfinishedGameIds[idx]}`}>  <MatchupRowMini date={upcomingGameDates[idx]} opponent={o} /></a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Past Games */}
                                <div className="mx-5">
                                    <div className="flex flex-col w-full my-2 xl:my-0">
                                        <div className="text-center bgorangegrad py-2 col-span-1  lg:col-span-1">Past games</div>
                                        <div className="grid grid-flow-col bgbluegrad grid-cols-4">
                                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Date</div>
                                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Opponent</div>
                                            <div className="text-center  col-span-2 border-white border-2 lg:col-span-2">Score</div>
                                        </div>
                                        <div className="max-h-[250px] w-full overflow-y-auto">
                                            {previousOpponents.map((o, idx) => (
                                                <a href={`/steveWork/hist/${finishedGameIds[idx]}`} key={`matchup.past.${idx}`}> <MatchupRowMini date={completedGameDates[idx]} opponent={o} teamScore={teamScore[idx]} opponentScore={opponentScore[idx]} override={true} /></a>
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
                    </div>
                </div>
            </div >
        </>
    );
}


