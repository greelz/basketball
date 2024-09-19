import Link from "next/link";

// Just need something that has ids and names

interface IIdAndName {
  id: string;
  name: string;
}
interface ILinkListProps {
  data: IIdAndName[];
  slug: string;
}

export function LinkListGames({ data, slug }: ILinkListProps) {
  return (
    <ul role="list" className="flex space-x-4 grid-list-xl">
      {data.map((d) => (
        <li key={d.id} className="">
          <Link
            className="block p-4 text-center text-black bg-white transition duration-200 hover:bg-sky-100 hover:text-sky-600"
            href={`${slug}/${d.id}`}
          >
            {d.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LinkListGames;