import PlayerLayout from "./PlayerLayout";

interface IPage {
  params: {
    leagueId: string;
    seasonId: string;
    teamId: string;
    playerId: string;
  };
}
export default function PlayerPage({ params }: IPage) {
  return (
    <div className="steveBox">
      <PlayerLayout params={params} />
    </div>
  );
}