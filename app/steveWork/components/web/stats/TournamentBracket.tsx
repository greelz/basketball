import React from 'react';
import LEDDisplayColor from './LEDDisplayColor';
import LeaderboardRowMini from '../LeaderboardRowMini';

interface TeamData {
    id: number;
    name: string;
    points: number;
}

interface RoundProps {
    title: string;
    teams: { team1: TeamData; team2: TeamData }[];
}

const Round = ({ title, teams }: RoundProps) => {
    return (
        <div className=" flex flex-col items-center p-4 bggrayd-nohov">

            {/* Round Header */}
            <h2 className="text-center text-white text-lg font-bold mb-4">{title}</h2>

            {/* Bracket for each matchup */}
            {teams.map((matchup, index) => (
                <a className="w-full" key={index} href="/"> <div className="relative group w-full flex flex-col mb-6 border-black border-2 rounded-lg ">
                    {/* Team 1 */}
                    <div className="grid grid-cols-6 text-white p-2 rounded-md bggrayd-nohov h-[80px]">
                        <span className="text-center col-span-1 flex items-center justify-center">{matchup.team1.id}</span>
                        <span className="text-center col-span-3 flex items-center justify-center z-10">{matchup.team1.name}</span>
                        <span className='flex items-center justify-center col-span-2'><LEDDisplayColor color={"text-green-300"} amount={matchup.team1.points} /></span>
                    </div>
                    <div className='absolute left-[45%] top-[40%]'>VS</div>
                    {/* Team 2 */}
                    <div className="grid grid-cols-6 text-white  p-2 rounded-md bggrayd-nohov h-[80px]">
                        <span className="text-center col-span-1 flex items-center justify-center">{matchup.team2.id}</span>
                        <span className="text-center col-span-3 flex items-center justify-center z-10">{matchup.team2.name}</span>
                        <span className='flex items-center justify-center col-span-2'><LEDDisplayColor color={"text-red-200"} amount={matchup.team2.points} /></span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ">
                        <span className="text-white text-xl font-bold">View Match</span>
                    </div>
                </div></a>
            ))}
        </div>
    );
};

export default function TournamentBracket() {
    const rounds = [
        {
            title: 'Round 1',
            teams: [
                { team1: { id: 1, name: 'Banana Boat Boys', points: 90 }, team2: { id: 2, name: 'Lockdown', points: 85 } },
                { team1: { id: 3, name: 'Stretch Fours', points: 88 }, team2: { id: 4, name: 'Hooligans Inc', points: 84 } },
            ],
        },
        {
            title: 'Round 2',
            teams: [
                { team1: { id: 1, name: 'Banana Boat Boys', points: 95 }, team2: { id: 3, name: 'Stretch Fours', points: 90 } },
            ],
        },
        {
            title: 'Semifinals',
            teams: [
                { team1: { id: 1, name: 'Banana Boat Boys', points: 100 }, team2: { id: 5, name: 'Prepare 2B Boarded', points: 95 } },
            ],
        },
        {
            title: 'Finals',
            teams: [
                { team1: { id: 1, name: 'Banana Boat Boys', points: 105 }, team2: { id: 6, name: 'Make it Take it', points: 100 } },
            ],
        },
    ];

    return (
        <><div className=' grid grid-flow-cols grid-cols-3 mt-6 mx-4 gap-4'>
            <a href="/" className=" hover:shadow-lg hover:shadow-white hover:text-lg"><LeaderboardRowMini place={1} name={"Banana Boat Boys"} wins={5} loss={0} /></a>
            <a href="/" className=" hover:shadow-lg hover:shadow-white hover:text-lg"> <LeaderboardRowMini place={2} name={"Make it Take it"} wins={4} loss={1} /></a>
            <a href="/" className=" hover:shadow-lg hover:shadow-white hover:text-lg"> <LeaderboardRowMini place={3} name={"Prepare 2B Boarded"} wins={3} loss={2} /></a>
        </div>
            <div className="grid grid-cols-4 gap-8 p-4 bggrayd-nohov">
                {rounds.map((round, index) => (
                    <Round key={index} title={round.title} teams={round.teams} />
                ))}

            </div>
        </>
    );
}
