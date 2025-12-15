interface IPlayerChipProps {
  name: string;
  buzzingIn?: boolean;
}

function abbreviateName(name: string) {
  const split = name.split(" ").slice(0, 2); // only take first two initials
  return split.map((letter) => letter[0]);
}

export default function Page({ name, buzzingIn }: IPlayerChipProps) {
  return (
    <div
      className={`aspect-square min-h-8 h-full border-1 border-slate-600 shadow-md 
                items-center justify-center flex rounded-full bg-black text-white text-sm
                ${buzzingIn ? "outline-1 outline-green-600" : ""}`}
    >
      {abbreviateName(name)}
    </div>
  );
}
