import Link from "next/link";

export default function TriviaPage() {
  return (
    <div className="flex flex-1 h-dvh items-center text-white justify-center">
      <div className="border-full p-2 flex flex-col gap-30 max-w-lg items-center">
        <div className="items-center flex flex-col gap-6">
          <div className="text-center">
            Have someone else hosting a game for you? First, say &quot;wow, that
            host is super cool!&quot;-- and dive right in!
          </div>
          <Link href="/trivia/join" className="text-lg btn-blue">
            Join a game
          </Link>
        </div>
        <div className="items-center flex flex-col gap-6">
          <div className="text-center">Know what you&apos;re doing?</div>
          <Link href="/trivia/create" className="btn-green">
            Create a game
          </Link>
        </div>
      </div>
    </div>
  );
}
