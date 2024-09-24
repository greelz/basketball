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

export function LinkList({ data, slug }: ILinkListProps) {



  return (
    <ul role="list" className={data.length >= 10 ? "flex space-x-4 border border-black grid-list-xl overflow-x-auto whitespace-nowrap" : "flex space-x-4 border border-black grid-list overflow-x-auto whitespace-nowrap min-w-full"}>
      {data.map((d) => (
        <li key={d.id} className="flex-1">
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

export default LinkList;