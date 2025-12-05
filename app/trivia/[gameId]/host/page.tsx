'use server';

import AdminComponent from '@/app/trivia/Components/AdminComponent';
import AdminLiveBoard from '@/app/trivia/Components/AdminLiveBoard';
import ShowBoardButton from '@/app/trivia/Components/ShowBoardButton';
import EnableBuzzersButton from '@/app/trivia/Components/EnableBuzzersButton';
import DeleteBuzzDataButton from '@/app/trivia/Components/DeleteBuzzDataButton';
import PrettyForm from '@/app/trivia/Components/PrettyForm';
import { tryAddPlayer } from '@/app/trivia/Components/apis';
import { IoMdAdd } from 'react-icons/io';
import Link from 'next/link';

async function addPlayerLocal(gameId: string, formData: FormData) {
  'use server';
  await tryAddPlayer(gameId, formData.get('Name')?.toString() ?? '');
}

export default async function Page(props: PageProps<'/trivia/[gameId]/host'>) {
  const params = await props.params;
  const { gameId } = params;

  return (
    <>
      <div className="flex flex-col flex-1">
        <div className="flex p-2">
          <h1 className="flex-1 text-xl text-center pt-1">Host Mode - {gameId}</h1>
          <Link className="btn-yellow text-xs" href={`/trivia/join/${gameId}`}>
            Join
          </Link>
        </div>
        <div className="flex-1 flex flex-col">
          <AdminComponent gameId={gameId} />
          <div className="flex gap-2 lg:gap-3 lg:text-base p-2 text-xs flex-wrap justify-center">
            <button
              className="btn-blue max-w-30 text-xs"
              popoverTarget="addPlayerPopover"
              title="Add a player"
            >
              <IoMdAdd />
            </button>
            <EnableBuzzersButton gameId={gameId} />
            <DeleteBuzzDataButton gameId={gameId} />
            <ShowBoardButton gameId={gameId} />
          </div>
        </div>
        <AdminLiveBoard gameId={gameId} />
      </div>
      <div
        popover="auto"
        id="addPlayerPopover"
        className="bg-black text-white border-1 border-slate-700 rounded-md shadow-lg m-auto p-3"
      >
        <PrettyForm
          title="Add Player"
          elements={['Name']}
          actionButtonText="Add"
          action={addPlayerLocal.bind(null, gameId)}
        />
      </div>
    </>
  );
}
