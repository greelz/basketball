import GameComponent from "@/app/components/GameComponent";
import {
  getGamesForSeason,
  getSeasonSchedule,
  getSeasonStatisticsRegenerate,
  getTeamsForSeason,
} from "@/app/database";
import { TeamRecord } from "@/app/types";
import React from "react";

interface IPage {
  params: { leagueId: string; seasonId: string };
}

export default async function SeasonPage({ params }: IPage) {
  const leagueId = params.leagueId;
  const seasonId = params.seasonId;
  const schedule = await getSeasonSchedule(leagueId, seasonId);

  if (!schedule) return "Nothing to show";
  else {
    return (
      <div className="flex flex-wrap gap-2 m-2">
        {schedule
          .sort((a, b) => a.date.seconds - b.date.seconds)
          .map((s) => (
            <GameComponent
              key={s.id}
              game={s}
              team1={s.team1ref}
              team2={s.team2ref}
            />
          ))}
      </div>
    );
  }
}
