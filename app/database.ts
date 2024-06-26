import {
  getDocs,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { Game, League, Player, PlayerStats, Season, Team } from "./types";
import { db } from "./config";
import { ref } from "firebase/database";

// ************** ADD FUNCTIONS ***************** //

//#region Add functions
export async function addLeague(leagueName: string, season: string) {
  try {
    const leagueRef = await addDoc(collection(db, "leagues"), {
      name: leagueName,
      season: season,
    });
  } catch (e) {
    throw new Error(`Error adding league ${e}`);
  }
}

export async function addSeason(seasonName: string, leagueId: string) {
  const seasonRef = await addDoc(
    collection(db, `leagues/${leagueId}/seasons`),
    {
      name: seasonName,
    }
  );
}

export async function addTeam(
  leagueId: string,
  seasonId: string,
  teamName: string
) {
  const teamRef = await addDoc(
    collection(db, `leagues/${leagueId}/seasons/${seasonId}/teams`),
    {
      name: teamName,
    }
  );
}

export async function addPlayer(
  leagueId: string,
  seasonId: string,
  teamId: string,
  playerName: string
) {
  const playerRef = await addDoc(
    collection(
      db,
      `leagues/${leagueId}/seasons/${seasonId}/teams/${teamId}/players`
    ),
    {
      name: playerName,
    }
  );
}

export async function addGame(
  leagueId: string,
  seasonId: string,
  team1: string,
  team2: string,
  gameName: string,
  date: Date
) {
  const gameRef = await addDoc(
    collection(db, `leagues/${leagueId}/seasons/${seasonId}/games`),
    {
      team1: team1,
      team2: team2,
      date: date,
      name: gameName,
    }
  );
}
//#endregion

//#region Get functions
export async function getSeasons(leagueId: string) {
  const seasonsSnapshot = await getDocs(
    collection(db, "leagues", leagueId, "seasons")
  );

  const seasons: Season[] = [];
  seasonsSnapshot.forEach((s) => {
    const seasonData = s.data() as Season;
    seasonData.id = s.id;
    seasons.push(seasonData);
  });

  return seasons;
}

export async function getTeamsForSeason(
  leagueId: string,
  seasonId: string
): Promise<Team[]> {
  const teams: Team[] = [];
  const teamsSnapshot = await getDocs(
    collection(db, "leagues", leagueId, "seasons", seasonId, "teams")
  );

  teamsSnapshot.forEach((doc) => {
    const teamData = doc.data() as Team;
    teamData.id = doc.id;
    teams.push(teamData);
  });

  return teams;
}

export async function getGamesForSeason(
  leagueId: string,
  seasonId: string
): Promise<Game[]> {
  const games: Game[] = [];
  const gamesSnapshot = await getDocs(
    collection(db, "leagues", leagueId, "seasons", seasonId, "games")
  );

  gamesSnapshot.forEach((doc) => {
    const gameData = doc.data() as Game;
    gameData.id = doc.id;
    games.push(gameData);
  });

  return games;
}

export async function getPlayersFromTeam(
  leagueId: string,
  seasonId: string,
  teamId: string
): Promise<Player[]> {
  const players: Player[] = [];
  const playersSnapshot = await getDocs(
    collection(
      db,
      "leagues",
      leagueId,
      "seasons",
      seasonId,
      "teams",
      teamId,
      "players"
    )
  );

  playersSnapshot.forEach((p) => {
    const playerData = p.data() as Player;
    playerData.id = p.id;
    playerData.teamId = teamId;
    players.push(playerData);
  });

  return players;
}

export async function getTeamsIdsForGame(
  leagueId: string,
  seasonId: string,
  gameId: string
) {
  const data = await getDoc(
    doc(db, `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}`)
  );
  return {
    team1: data.get("team1") as string,
    team2: data.get("team2") as string,
  };
}

export async function getTeamPlayersFromGame(
  leagueId: string,
  seasonId: string,
  gameId: string
) {
  const { team1, team2 } = await getTeamsIdsForGame(leagueId, seasonId, gameId);
  const team1players = await getPlayersFromTeam(leagueId, seasonId, team1);
  const team2players = await getPlayersFromTeam(leagueId, seasonId, team2);
  return { team1, team2, team1players, team2players };
}

export async function isGameOver(
  leagueId: string,
  seasonId: string,
  gameId: string
) {
  const gameSnapshot = await getDoc(
    doc(db, `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}`)
  );
  return gameSnapshot.get("gameover") == 1;
}

export async function getTeamNameByTeamId(
  leagueId: string,
  seasonId: string,
  teamId: string
) {
  const snapshot = await getDoc(
    doc(db, `leagues/${leagueId}/seasons/${seasonId}/teams/${teamId}`)
  );

  return snapshot.get("name");
}

//#endregion

//#region Utility functions
export async function finalizeGame(
  leagueId: string,
  seasonId: string,
  gameId: string
) {
  const initialPath = `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}`;

  await updateDoc(doc(db, initialPath), { gameover: 1 });
}
export async function incrementStat(
  leagueId: string,
  seasonId: string,
  gameId: string,
  playerId: string,
  fieldName: string,
  incrementValue: number
) {
  const initialPath = `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}/playerStatistics`;
  if (playerId.length !== 20) return;
  let dataToUpdate = { [fieldName]: increment(incrementValue) };
  if (fieldName === "two_point_made") {
    dataToUpdate = {
      two_point_miss: increment(incrementValue),
      two_point_made: increment(incrementValue),
      points: increment(2 * incrementValue),
    };
  } else if (fieldName === "three_point_made") {
    dataToUpdate["three_point_miss"] = increment(incrementValue);
    dataToUpdate["points"] = increment(3 * incrementValue);
  }

  try {
    const snapshot = doc(db, `${initialPath}/${playerId}`);
    await updateDoc(snapshot, dataToUpdate);
  } catch (e) {
    await setDoc(doc(db, initialPath, playerId), dataToUpdate);
  }
}

export async function findLeagueAndSeasonByGameId(gameId: string) {
  try {
    // Step 1: Fetch all leagues
    const leaguesSnapshot = await getDocs(collection(db, "leagues"));
    for (const leagueDoc of leaguesSnapshot.docs) {
      const leagueId = leagueDoc.id;

      // Step 2: Fetch all seasons for this league
      const seasonsSnapshot = await getDocs(
        collection(db, "leagues", leagueId, "seasons")
      );
      for (const seasonDoc of seasonsSnapshot.docs) {
        const seasonId = seasonDoc.id;

        // Step 3: Fetch all games for this season and check for the gameId
        const gamesSnapshot = await getDocs(
          collection(db, "leagues", leagueId, "seasons", seasonId, "games")
        );
        for (const gameDoc of gamesSnapshot.docs) {
          if (gameDoc.id === gameId) {
            // Found the matching gameId
            return { leagueId, seasonId };
          }
        }
      }
    }

    // If no matching gameId is found
    return null;
  } catch (error) {
    console.error("Error finding league and season by gameId: ", error);
    throw new Error("Unable to find league and season.");
  }
}

//#endregion
