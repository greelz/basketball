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
    <ul role="list" className="divide-y divide-gray-200 border border-gray-200">
      {data.map((d) => (
        <li key={d.id} className="flex">
          <Link className="flex-1 p-2 hover:bg-sky-100" href={`${slug}/${d.id}`}>{d.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;