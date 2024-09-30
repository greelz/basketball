import localFont from "next/font/local";
import LeaderboardRow from "./LeaderboardRow";

const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

interface LeaderboardLIVEProps {
    teamSlug: string;
    leaderboard: Array<{
        name: string;
        wins: number;
        losses: number;
    }>;
}

export default function LeaderboardLIVE({ teamSlug, leaderboard }: LeaderboardLIVEProps) {
    if (!leaderboard || leaderboard.length === 0) {
        return <div>Loading...</div>; // loader
    }

    return (
        <>
            <div className="grid grid-flow-col bgbluegrad grid-cols-10">
                <div className="text-center col-span-1 border-white border-2 lg:col-span-2">Place</div>
                <div className="text-center col-span-6 border-white border-2 lg:col-span-4">Teams</div>
                <div className="text-center col-span-2 border-white border-2 lg:col-span-3">Record</div>
                <div className="text-center col-span-1 border-white border-2 lg:col-span-1">MVP</div>
            </div>
            {leaderboard.map((t, idx) => (
                <a
                    key={`${teamSlug}/${t.id}`}
                    href={`${teamSlug}/${t.id}`}
                    className="hover:shadow-lg hover:shadow-white hover:text-lg"
                >
                    <LeaderboardRow place={idx + 1} name={t.name} wins={t.wins ?? 0} loss={t.losses ?? 0} />
                </a>
            ))}
        </>
    );
}
