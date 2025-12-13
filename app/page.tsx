import Image from 'next/image';
import Link from 'next/link';
import court from '../public/images/champs.jpg';

export default function Home() {
  return (
    <div className="relative min-h-dvh flex">
      <Image className="z-0 absolute h-full object-cover opacity-50" alt="Champs" src={court} />
      <div className="p-4 flex-1 flex flex-col gap-2">
        <Link className="btn-blue h-10 w-40 text-white text-center z-1" href="/admin">
          Play Ball
        </Link>
        <Link className="btn-purple h-10 w-40 text-white text-center z-1" href="/trivia">
          Play Trivia
        </Link>
        <div className="flex-1 grid grid-cols-4 gap-4">
          <span className="text-2xl text-white text-shadow-lg/40 z-2 col-start-1 col-span-3">
            Winning isn't everything, it's the only thing.
          </span>
          <span className="text-2xl text-white text-shadow-lg/40 z-2 col-span-2 col-start-3">
            Be a winner.
          </span>
          <span className="text-2xl text-white text-shadow-lg/40 z-2 col-span-3 col-start-2">
            Teamwork makes the dreamwork.
          </span>
          <span className="text-2xl text-white text-shadow-lg/40 z-2 col-start-1 col-span-3">
            Let's just have some fun here.
          </span>
        </div>
      </div>
    </div>
  );
}
