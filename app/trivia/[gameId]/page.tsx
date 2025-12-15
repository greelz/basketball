import LiveBoardSelf from '@/app/trivia/Components/LiveBoardSelf';
import PlayersAndPointsList from '@/app/trivia/Components/PlayersAndPointsList';

export default async function Page(props: PageProps<'/trivia/[gameId]'>) {
  const params = await props.params;
  const gameId = params.gameId;

  return (
    <div className="flex flex-col w-full">
      <div className="h-[78%]">
        <LiveBoardSelf gameId={gameId} />
      </div>
      <div className="h-[22%]">
        <PlayersAndPointsList gameId={gameId} />
      </div>
    </div>
  );
}
