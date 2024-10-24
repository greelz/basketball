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

export async function addScoreToGame(
  leagueId: string,
  seasonId: string,
  gameId: string,
  team1score: number,
  team2score: number
) {
  const ref = doc(
    db,
    `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}`
  );
  return await updateDoc(ref, {
    team1score: team1score,
    team2score: team2score,
  });
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
//Function by Steve to grab player records for a specific team
export async function getThisTeamStatsFromGame(
  leagueId: string,
  seasonId: string,
  gameId: string,
  teamId: string,
) {
  const { team1, team2 } = await getTeamsIdsForGame(leagueId, seasonId, gameId);
  const team1players = await getPlayersFromTeam(leagueId, seasonId, team1);
  const team2players = await getPlayersFromTeam(leagueId, seasonId, team2);
  return { team1, team2, team1players, team2players };
}

export async function findFinishedGameIdsByTeamId(
  teamId: string,
  games: Game[],
) {
  return games
    .filter(game => game.team1 === teamId && game.gameover || game.team2 === teamId && game.gameover)
    .map(game => game.id);
}

export async function findUpcomingGamesByTeamId(
  teamId: string,
  games: Game[],
) {
  return games
    .filter(game => game.team1 === teamId && !game.gameover || game.team2 === teamId && !game.gameover)
    .map(game => game.id);
}

//Get player stats for a team from every game in the season completed so far
export async function getTeamStatsforGame(
  leagueId: string,
  seasonId: string,
  gameId: string,
  teamId: string,
) {
  const { team1, team2, team1players, team2players } =
    await getTeamPlayersFromGame(leagueId, seasonId, gameId);
  const allGamePlayersStats: PlayerStats[] =
    [...team1players, ...team2players].map((p) => ({ ...p }));
  const seasonSnap = await getDocs(
    collection(
      db,
      `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}/playerStatistics`
    )
  );
  seasonSnap.docs.forEach((s) => {
    const data = s.data();
    const two_point_made = data["two_point_made"] ?? 0;
    const three_point_made = data["three_point_made"] ?? 0;
    const specificPlayerIdx = allGamePlayersStats.findIndex((a) => a.id === s.id);
    if (specificPlayerIdx === -1) return;
    allGamePlayersStats[specificPlayerIdx] = {
      ...allGamePlayersStats[specificPlayerIdx],
      ...(data as PlayerStat),
      points: two_point_made * 2 + three_point_made * 3,
    };
  });
  let gameTotalPoints = 0;
  allGamePlayersStats.forEach((p) => {
    if (p.teamId === teamId) gameTotalPoints += p.points ?? 0;
  });
  const teamPlayerStats: PlayerStats[] = allGamePlayersStats.filter(player => teamId === player.teamId)
  return {
    teamPlayerStats: teamPlayerStats,
    game: { gameTotalPoints, gameId }
  }
}

//SeasonTeamAverages
export async function getSeasonTeamStatsforAverages(
  leagueId: string,
  seasonId: string,
  gameId: string,
  teamId: string,
) {
  const { team1, team2, team1players, team2players } =
    await getTeamPlayersFromGame(leagueId, seasonId, gameId);
  const allGamePlayersStats: PlayerStats[] =
    [...team1players, ...team2players].map((p) => ({ ...p }));
  const seasonSnap = await getDocs(
    collection(
      db,
      `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}/playerStatistics`
    )
  );
  seasonSnap.docs.forEach((s) => {
    const data = s.data();
    const two_point_made = data["two_point_made"] ?? 0;
    const three_point_made = data["three_point_made"] ?? 0;
    const specificPlayerIdx = allGamePlayersStats.findIndex((a) => a.id === s.id);
    if (specificPlayerIdx === -1) return;
    allGamePlayersStats[specificPlayerIdx] = {
      ...allGamePlayersStats[specificPlayerIdx],
      ...(data as PlayerStat),
      points: two_point_made * 2 + three_point_made * 3,
    };
  });
  let gameTotalPoints = 0;
  allGamePlayersStats.forEach((p) => {
    if (p.teamId === teamId) gameTotalPoints += p.points ?? 0;
  });
  const teamPlayerStats: PlayerStats[] = allGamePlayersStats.filter(player => teamId === player.teamId)
  return {
    teamPlayerStats: teamPlayerStats,
    teamId: teamId
  }
}

//START GREELZ *********************************
export async function getPlayerStatisticsFromGame(
  leagueId: string,
  seasonId: string,
  gameId: string
) {
  const { team1, team2, team1players, team2players } =
    await getTeamPlayersFromGame(leagueId, seasonId, gameId);

  const playerStatistics: PlayerStats[] = team1players
    .concat(team2players)
    .map((p) => ({ ...p }));

  const snapshot = await getDocs(
    collection(
      db,
      `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}/playerStatistics`
    )
  );

  snapshot.docs.forEach((s) => {
    const data = s.data();
    const two_point_made = data["two_point_made"] ?? 0;
    const three_point_made = data["three_point_made"] ?? 0;
    const specificPlayerIdx = playerStatistics.findIndex((a) => a.id === s.id);
    if (specificPlayerIdx === -1) return;
    playerStatistics[specificPlayerIdx] = {
      ...playerStatistics[specificPlayerIdx],
      ...(data as PlayerStat),
      points: two_point_made * 2 + three_point_made * 3,
    };
  });

  let team1Score = 0;
  let team2Score = 0;
  playerStatistics?.forEach((p) => {
    if (p.teamId === team1) team1Score += p.points ?? 0;
    if (p.teamId === team2) team2Score += p.points ?? 0;
  });

  return {
    playerStatistics: playerStatistics,
    team1: { id: team1, score: team1Score },
    team2: { id: team2, score: team2Score },
  };
}

export async function getSeasonSchedule(
  leagueId: string,
  seasonId: string
): Promise<GameForSeason[]> {
  const teams = await getTeamsForSeason(leagueId, seasonId);
  const games = await getGamesForSeason(leagueId, seasonId);

  const teamMap = new Map<string, Team>();
  teams.forEach((t) => teamMap.set(t.id, t));

  return games
    .filter((g) => teamMap.has(g.team1) && teamMap.has(g.team2))
    .map((game) => ({
      ...game,
      team1ref: teamMap.get(game.team1)!,
      team2ref: teamMap.get(game.team2)!,
    }));
}

// Special case if things are generated appropriately
export async function getSeasonStatisticsRegenerate(
  leagueId: string,
  seasonId: string,
  games?: Game[]
) {
  if (!games) games = await getGamesForSeason(leagueId, seasonId);

  let records: Map<string, TeamRecord> = new Map();
  for (const g of games) {
    if (g.gameover === 1) {
      const stats = await getPlayerStatisticsFromGame(leagueId, seasonId, g.id);
      const team1 = stats.team1.id;
      const team2 = stats.team2.id;

      if (!records.has(team1)) {
        records.set(team1, { teamId: team1, wins: 0, losses: 0, ties: 0 });
        console.log(`Adding ${team1} to map`);
      }
      if (!records.has(team2)) {
        records.set(team2, { teamId: team2, wins: 0, losses: 0, ties: 0 });
        console.log(`Adding ${team2} to map`);
      }

      addScoreToGame(
        leagueId,
        seasonId,
        g.id,
        stats.team1.score,
        stats.team2.score
      );

      // Add the loss and the win
      if (stats.team1.score > stats.team2.score) {
        records.get(team1)!.wins += 1;
        records.get(team2)!.losses += 1;
      } else if (stats.team1.score < stats.team2.score) {
        records.get(team1)!.losses += 1;
        records.get(team2)!.wins += 1;
      } else {
        records.get(team1)!.ties += 1;
        records.get(team2)!.ties += 1;
        // a tie?
      }
    }
  }

  return records;
}

//STEVE UPDATE TO GETSEASONSTATISTICSGENERATE FOR HOMEPAGE DATAPOPULATION
export async function getSeasonStatisticsUXsb(
  leagueId: string,
  seasonId: string,
  games?: Game[]
) {
  if (!games) games = await getGamesForSeason(leagueId, seasonId);

  let records: Map<string, TeamRecord> = new Map();
  for (const g of games) {
    if (g.gameover) {
      try {
        const stats = await getPlayerStatisticsFromGame(leagueId, seasonId, g.id);
        const team1 = stats.team1.id;
        const team2 = stats.team2.id;

        // Initialize records if not already present
        if (!records.has(team1)) {
          records.set(team1, { teamId: team1, wins: 0, losses: 0, ties: 0 });
        }
        if (!records.has(team2)) {
          records.set(team2, { teamId: team2, wins: 0, losses: 0, ties: 0 });
        }

        // Update win/loss/tie records
        if (stats.team1.score > stats.team2.score) {
          records.get(team1)!.wins += 1;
          records.get(team2)!.losses += 1;
        } else if (stats.team1.score < stats.team2.score) {
          records.get(team1)!.losses += 1;
          records.get(team2)!.wins += 1;
        } else {
          records.get(team1)!.ties += 1;
          records.get(team2)!.ties += 1;
        }
      } catch (error) {
        console.error(`Error fetching stats for game ${g.id}:`, error);
        continue; // Skip game if error occurs
      }

      // Fetch team names and update game information in parallel
      try {
        const [teamA, teamB] = await Promise.all([
          getTeamNameByTeamId(leagueId, seasonId, g.team1),
          getTeamNameByTeamId(leagueId, seasonId, g.team2)
        ]);

        const dateObj = g.date.toDate();
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit'
        });
        g.name = `${teamA} vs ${teamB}`;
        g.team1name = teamA;
        g.team2name = teamB;
        g.formattedDate = formattedDate; // formattedDate to avoid messing w g.date

        // Mark victor and loser
        if (g.team1score > g.team2score) {
          g.victor = g.team1name;
          g.loser = g.team2name;
          g.victorScore = g.team1score;
          g.loserScore = g.team2score;
        } else {
          g.victor = g.team2name;
          g.loser = g.team1name;
          g.victorScore = g.team2score;
          g.loserScore = g.team1score;
        }
      } catch (error) {
        console.error(`Error fetching team names for game ${g.id}:`, error);
      }
    } else {
      try {
        const [teamA, teamB] = await Promise.all([
          getTeamNameByTeamId(leagueId, seasonId, g.team1),
          getTeamNameByTeamId(leagueId, seasonId, g.team2)
        ]);

        const dateObj = g.date.toDate();
        console.log(`this is the dateObj ${dateObj} for g.date: ${g.date}`)
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit'
        });
        const formattedTime = dateObj.toLocaleTimeString();
        g.name = `${teamA} vs ${teamB}`;
        g.team1name = teamA;
        g.team2name = teamB;
        g.formattedDate = formattedDate; // formattedDate to avoid messing w g.date
      } catch (error) {

        console.error(`Error fetching data for UNFINALIZED game ${g.id}:`, error);
      }
    }
  }
  return [records, games];
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

  try {
    const snapshot = doc(db, `${initialPath}/${playerId}`);
    await updateDoc(snapshot, dataToUpdate);
  } catch (e) {
    await setDoc(doc(db, initialPath, playerId), dataToUpdate);
  }
}

export const incrementPlayerStat = async (
  leagueId: string,
  seasonId: string,
  gameId: string,
  playerId: string,
  field: string,
  val: number
) => {

  await incrementStat(leagueId, seasonId, gameId, playerId, field, val);
};

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
