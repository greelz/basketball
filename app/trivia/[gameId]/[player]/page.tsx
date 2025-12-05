import Buzzer from '@/app/trivia/Components/Buzzer';

interface IPlayerPageProps {
  showBoard?: boolean;
}

export default async function Page(
  props: PageProps<'/trivia/[gameId]/[player]'> & IPlayerPageProps
) {
  const params = await props.params;
  const { gameId, player } = params;

  const decodedPlayer = decodeURI(player);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col gap-1 justify-center relative items-center">
        <h1 className="text-xl">Good luck, {decodedPlayer}!</h1>
        <h3 className="text-sm">Buzz in when the buzzer turns green!</h3>
      </div>
      <div className="flex-1">
        <Buzzer player={decodedPlayer} gameId={gameId} />
      </div>
    </div>
  );
}
