"use server"

import {
    getDocs,
    increment,
    onSnapshot,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import {
    Game,
    GameForSeason,
    League,
    Player,
    PlayerStat,
    PlayerStats,
    Season,
    Team,
    TeamRecord,
} from "./types";
import { db } from "./config";
import { ref } from "firebase/database";
import { getGamesForSeason, getTeamsForSeason } from "./database";


// ************** GET FUNCTIONS ***************** //

export async function getSeasonGamesTeams(leagueId: string, seasonId: string) {
    const teams = await getTeamsForSeason(leagueId, seasonId);
    const games = await getGamesForSeason(leagueId, seasonId);

    // Format games with team names and timestamps
    games.forEach((game) => {
        const teamA = getTeamNameFromCachedTeams(game.team1, teams);
        const teamB = getTeamNameFromCachedTeams(game.team2, teams);
        // const timestamp = game.date.toDate().toLocaleString();
        game.name = `${teamA} vs ${teamB}${game.name ? ` [${game.name}]` : ""}`;

    });

    // Sort games by date
    games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());
    //Separate Date and Time of games to variable
    const gameDates = games.map((game) => {
        const dateObj = game.date.toDate();
        const date = dateObj.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit'
        });
        const time = game.date.toDate().toLocaleTimeString();
        return { date: date, time: time };
    });
    return { games, teams }
}

export async function getMainLeague() {
    //queryDB for getting the "mainLeague"
    const mainLeague = "PzZH38lp1R6wYs5Luf67";
    return mainLeague;
}

//#region Add functions

// ************** CALC FUNCTIONS ***************** //
export default async function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
    return teams.find((t) => t.id === teamId)?.name;
}