import { getPlayersList } from "@/app/trivia/Components/apis";
import Link from "next/link";

export default async function Page(props: PageProps<"/trivia/join/[gameId]">) {
  const { gameId } = await props.params;
  const players = await getPlayersList(gameId);

  const classes = [
    "btn-blue",
    "btn-yellow",
    "btn-purple",
    "btn-green",
    "btn-red",
    "btn-gray",
  ];
  return (
    <div className="mx-auto max-w-[80%] lg:w-200 flex flex-col p-5 border-x-1 shadow-lg/50 border-slate-700">
      <div className="text-center">
        You're about to join into the <span className="text-2xl">{gameId}</span>{" "}
        lobby
      </div>
      <div>Pick a team!</div>
      <div className="flex gap-4 p-4">
        {players.map((p, idx) => (
          <Link
            className={`${classes[idx % classes.length]}`}
            key={p.name}
            href={`/trivia/${gameId}/${p.name}`}
          >
            Join the {p.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
