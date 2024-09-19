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

export default function LinkListAdmin({ data, slug }: ILinkListProps) {
  return (
    <div className="container mx-auto">
      <div role="list" className="grid grid-cols-3 gap-4">
        {data.map((d) => (
          <div key={d.id} className="">
            <Link
              className="bg-white text-black p-6 shadow-lg text-center text-black transition duration-200 hover:bg-sky-100 hover:text-sky-600"
              href={`${slug}/${d.id}`}
            >
              {d.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};