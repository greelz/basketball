"use server";

import AdminComponent from "../../Components/AdminComponent";
import AdminLiveBoard from "../../Components/AdminLiveBoard";
import ShowBoardButton from "../../Components/ShowBoardButton";
import EnableBuzzersButton from "../../Components/EnableBuzzersButton";
import DeleteBuzzDataButton from "../../Components/DeleteBuzzDataButton";
import PrettyForm from "../../Components/PrettyForm";
import {tryAddPlayer} from "../../Components/apis";
import {IoMdAdd} from "react-icons/io";
import AwardPointsButton from "../../Components/AwardPointsButton";

async function addPlayerLocal(gameId: string, formData: FormData) {
  'use server'
  tryAddPlayer(gameId, formData.get("Name")?.toString() ?? "");
}

export default async function Page(props: PageProps<"/trivia/[gameId]/host">) {
  const params = await props.params;
  const {gameId} = params;

  return (
    <>
      <div className="flex flex-col flex-1">
        <div className="flex p-2">
          <h1 className="flex-1 text-xl text-center pt-1">Host Mode</h1>
        </div>
        <div className="flex-1 flex flex-col">
          <AdminComponent gameId={gameId} />
          <div className="flex gap-2 p-2 text-xs flex-wrap justify-center">
            <button className="btn-blue max-w-30 text-xs" popoverTarget="addPlayerPopover"><IoMdAdd /></button>
            <EnableBuzzersButton gameId={gameId} />
            <ShowBoardButton gameId={gameId} />
            <DeleteBuzzDataButton gameId={gameId} />
            <AwardPointsButton gameId={gameId} />
          </div>
        </div>
        <AdminLiveBoard gameId={gameId} />
      </div>
      <div popover="auto" id="addPlayerPopover" className="bg-black text-white border-1 border-slate-700 rounded-md shadow-lg m-auto p-3">
        <PrettyForm title="Add Player" elements={["Name"]} actionButtonText="Add" action={addPlayerLocal.bind(null, gameId)} />
      </div>
    </>
  );
}
