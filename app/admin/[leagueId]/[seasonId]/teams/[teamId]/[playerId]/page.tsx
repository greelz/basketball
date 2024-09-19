import LinkList from "@/app/components/LinkList";
import { addPlayer, getPlayersFromTeam } from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
  params: {
    leagueId: string;
    seasonId: string;
    teamId: string;
    playerId: string;
  };
}
export default async function SeasonPage({ params }: IPage) {
  const { leagueId, seasonId, teamId, playerId } = params;
  return (
    <div className="steveBox">
      <h1>Player Profile</h1>
      <h2>{playerId}</h2>
    </div>
  );
}
