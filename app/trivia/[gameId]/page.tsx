import LiveBoard from "@/app/trivia/Components/LiveBoard";
import PlayersAndPointsList from "../Components/PlayersAndPointsList";

export default async function Page(props: PageProps<"/trivia/[gameId]">) {
  const params = await props.params;
  const gameId = params.gameId;

  return (
    <div className="h-dvh flex-1">
      <div className="h-[80%]">
        <LiveBoard gameId={gameId} />
      </div>
      <div className="h-[20%]">
        <PlayersAndPointsList gameId={gameId} />
      </div>
    </div>
  );
}
