import React from "react";
import { Game, Team, TeamRecord } from "../types";
import { Timestamp } from "firebase/firestore";

interface IGameComponentProps {
  team1: Team;
  team2: Team;
  game: Game;
}

export default function GameComponent({
  team1,
  team2,
  game,
}: IGameComponentProps) {
  const { date, team1score, team2score, name } = game;
  return (
    <div className="gameComponentDiv">
      <div className="text-xs font-bold text-right">
        {date.toDate().toLocaleString(undefined, {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
          localeMatcher: "best fit",
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        })}
      </div>
      <TeamLine score={team1score} team={team1} />
      <TeamLine score={team2score} team={team2} />
      <div className="mt-auto text-xs text-slate-500">{name}</div>
    </div>
  );
}

interface ITeamLineProps {
  team: Team;
  score: number;
}
function TeamLine({ team, score }: ITeamLineProps) {
  return (
    <div className="teamLine">
      <div>{team.name}</div>
      <div className="text-lg font-bold">{score || ""}</div>
      <div>{`${team.wins || 0} - ${team.losses || 0}`}</div>
    </div>
  );
}
