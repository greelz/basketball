import Buzzer from "@/app/trivia/Components/Buzzer";
import LiveBoard from "@/app/trivia/Components/LiveBoard";
import PlayerChipList from "@/app/trivia/Components/PlayerChipList";

interface IPlayerPageProps {
  showBoard?: boolean
}

export default async function Page(
  props: PageProps<"/trivia/[gameId]/[player]"> & IPlayerPageProps
) {
  const params = await props.params;
  const {gameId, player} = params;

  const decodedPlayer = decodeURI(player);

  return (
    <div className="flex flex-col flex-1">
      <h1 className="flex-0 text-xl text-center pt-1">Good luck, {decodedPlayer}!</h1>
      <div className="mx-auto">
        <PlayerChipList gameId={gameId} />
      </div>
      <div className="flex-1">
        <Buzzer player={decodedPlayer} gameId={gameId} />
      </div>
      {props.showBoard && <div className="flex-0">
        <LiveBoard fontsize="text-xs/6" gameId={gameId} />
      </div>
      }
    </div>
  );
}
