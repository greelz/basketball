import NameChip from './NameChip';

interface IPersonSquare {
  hoursTo1000: number;
  hoursToDisplay: number;
  person_name: string;
  family_name: string;
  imgUrl?: string;
}

export default function PersonSquare({
  hoursTo1000,
  hoursToDisplay,
  person_name,
  family_name,
  imgUrl,
}: IPersonSquare) {
  const roundedPercentTo1000 = Math.min(100, Number((hoursTo1000 / 10).toFixed(0)));

  return (
    <div className="flex flex-col h-40 w-24 shadow-md rounded-sm border border-gray-200">
      <div className="relative">
        <NameChip
          person_name={person_name}
          family_name={family_name}
          color="bg-blue-400"
          textColor="text-white"
          imgUrl={imgUrl}
        />
      </div>
      <div className="text-4xl flex-1 text-center">{hoursToDisplay.toFixed(0)}</div>
      <div className="bg-green-500 h-1" style={{ width: `${roundedPercentTo1000}%` }}></div>
    </div>
  );
}
