import Image from "next/image";
import court from "../public/images/court.png";

export default function Home() {
  return (
    <div className="courtDiv">
      <Team teamId={1} players={["mike", "john", "bill"]} />
      <div className="courtImageDiv">
        <Image alt="court" src={court.src} fill />
      </div>
      <Team teamId={2} players={["mike longnamejackson", "john", "bill"]} />
    </div>
  );
}

interface IPlayerProps {
  name: string;
}
function Player(props: IPlayerProps) {
  return <div className="hover:bg-slate-100 player">{props.name}</div>;
}

interface ITeamProps {
  players: string[];
  teamId: number;
}
function Team(props: ITeamProps) {
  return (
    <div className="team" key={props.teamId}>
      {props.players.map((p, i) => (
        <Player name={p} key={p + i} />
      ))}
    </div>
  );
}
