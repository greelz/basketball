import ButtonComponent from "../Components/ButtonComponent";
import Button from "../Components/ButtonComponent";
import PlayerListComponent from "../Components/PlayerListComponent";
import { DataSnapshot } from "firebase/database";

interface LobbyProps {
  onClickStartGame: () => void;
  gameId: string;
  gameData: DataSnapshot | undefined;
  name: string;
}

export function getMap(gameData: DataSnapshot | undefined, node: string) {
  if (!gameData) return;
  const nodeVal = gameData.child(`${node}`)?.val();
  if (!nodeVal) return;
  return new Map<string, number>(Object.entries(nodeVal));
}

export function getList(gameData: DataSnapshot | undefined, node: string) {
  let players: string[] = [];
  gameData?.child(`/${node}`).forEach((c) => {
    players.push(c.val());
  });
  console.log(players);
  return players;
}

export default function Lobby(props: LobbyProps) {
  const players = getList(props.gameData, "players");

  return (
    <div className="container">
      <div className="gameIdDiv">
        <h1>Your game id is {props.gameId}</h1>
        <div className="buttons">
          <ButtonComponent caption="Copy" />
          <ButtonComponent caption="Share" />
        </div>
      </div>
      <div className="playerList">
        <PlayerListComponent players={players} />
        <ButtonComponent
          onClick={() => props.onClickStartGame()}
          containerClassName="startButtonDiv"
          caption="Start game"
        />
      </div>
    </div>
  );
}
