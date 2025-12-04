import Link from "next/link";

export default function TriviaPage() {
  return (
    <div className="flex flex-col gap-20 flex-1 h-dvh items-center text-white justify-center max-w-[80%] mx-auto">
      <div className="items-center flex flex-col gap-4">
        <div className="text-center">
          Have someone else hosting a game for you? First, say &quot;wow, that
          host is super cool!&quot;-- and dive right in!
        </div>
        <Link href="/trivia/join" className="text-lg btn-blue">
          Join a game
        </Link>
      </div>
      <div className="items-center flex flex-col gap-4">
        <div className="text-center">Know what you&apos;re doing?</div>
        <Link href="/trivia/create" className="btn-green">
          Create a game
        </Link>
      </div>
    </div>
  );
}
