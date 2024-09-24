"use client"
import { useState } from "react";
import ShotTracker from "../../components/ShotTracker";
import ToggleCollapse from "../../components/web/ToggleCollapse";
import ShotTrackerPlayerList from "../../components/web/stats/ShotTrackerPlayerList";
import PlayerCard from "../../components/web/PlayerCard";
import Clock from "./ClockNew";
import BarChart from "../../components/web/stats/BarChart";
import MiniCard from "../../components/web/stats/MiniCard";
import PlayerStatBlock from "../../components/web/stats/PlayerStatBlock";
import LEDTracker from "../../components/web/stats/LEDTracker";

const Team1Stats = [{

    name: "Jonas L",
    id: "CRkCwB34bxCKFSUowV40",
    teamId: "Banana Boat Boys",
    assists: 1,
    two_point_miss: 6,
    turnovers: 4,
    three_point_made: 3,
    "O rebounds": 1,
    steals: 1,
    two_point_made: 3,
    three_point_miss: 3,
    "D rebounds": 4,
    points: 16,
},
{
    name: "Caleb C",
    id: "WBDcCNHozLy8P3fPdIxZ",
    teamId: "Banana Boat Boys",
    points: 25
},
{
    name: "Dillon C",
    id: "dKhU7oWusmsKUyCbH1FQ",
    teamId: "Banana Boat Boys",
    three_point_made: 4,
    steals: 5,
    two_point_miss: 11,
    two_point_made: 10,
    "D rebounds": 6,
    "O rebounds": 10,
    three_point_miss: 9,
    blocks: 2,
    turnovers: 2,
    assists: 3,
    points: 32,
},
{
    name: "Cam H",
    id: "orfYYIQ4siHtJKD8kkMH",
    teamId: "Banana Boat Boys",
    steals: 2,
    three_point_miss: 12,
    "O rebounds": 4,
    two_point_miss: 9,
    turnovers: 1,
    blocks: 1,
    assists: 4,
    two_point_made: 5,
    three_point_made: 6,
    "D rebounds": 10,
    points: 28,
},];

const Team2Stats = [
    {
        name: "Trace H",
        id: "LM6fxBKqZeFE3Gv0jgoR",
        teamId: "AC130",
        two_point_made: 5,
        turnovers: 1,
        "D rebounds": 4,
        assists: 3,
        "O rebounds": 2,
        two_point_miss: 3,
        points: 10,
    },
    {
        name: "Nathan H",
        id: "c5R2tEgHAzkV1q9XCbGS",
        teamId: "AC130",
        two_point_miss: 9,
        two_point_made: 11,
        assists: 6,
        turnovers: 5,
        three_point_miss: 9,
        "D rebounds": 15,
        "O rebounds": 4,
        three_point_made: 1,
        points: 25,
    },
    {
        name: "Jon V",
        id: "heW0UypymlmfEtagwvjn",
        teamId: "AC130",
        "D rebounds": 2,
        three_point_miss: 4,
        turnovers: 2,
        assists: 4,
        two_point_made: 10,
        two_point_miss: 5,
        three_point_made: 3,
        steals: 1,
        "O rebounds": 2,
        points: 29,
    },
    {
        name: "Roscoe Z",
        id: "pUYrb84Q1Lz8xX3uxwHo",
        teamId: "AC130",
        two_point_miss: 3,
        "O rebounds": 2,
        steals: 1,
        three_point_miss: 7,
        assists: 4,
        three_point_made: 4,
        "D rebounds": 3,
        turnovers: 2,
        points: 12,
    }];

export default function LiveContentNew() {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedStat1, setSelectedStat1] = useState('points');
    const [selectedStat2, setSelectedStat2] = useState('points');


    const team1 = Team1Stats.map(n => n.teamId);
    const team2 = Team2Stats.map(n => n.teamId);
    const team1Players = Team1Stats.map(n => n.name);
    const team2Players = Team2Stats.map(n => n.name);
    const team1points = Team1Stats.map(p => p.points).reduce((acc, cv) => acc + cv, 0);
    const team2points = Team2Stats.map(p => p.points).reduce((acc, cv) => acc + cv, 0);;

    const newSelectedStat1 = (stat: string) => {
        setSelectedStat1((prevStat) => stat);
        console.log(stat);
    }

    const newSelectedStat2 = (stat: string) => {
        setSelectedStat2((prevStat) => stat);
        console.log(stat);
    }

    return (
        <main className="flex-1 min-h-0 bg-gray-100 homeRadial ">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-4 gap-4 text-black mt-2 ">
                {/* Left Column - Score, Player Names, Stats */}
                <div className="col-span-1 bg-white p-4 rounded-lg shadow-md min-w-fit">
                    <div id="score" className="mb-2 text-center"><span className=" text-9xl "><LEDTracker amount={team1points} variant={1} /></span></div>
                    <h2 className="text-4xl font-bold mb-4 border-t-2  border-b-2">{team1[0]}</h2>
                    <h3 className="font-semibold mb-2">Players</h3>
                    <div className="flex-1 flex-col mx-2 ">
                        <ShotTrackerPlayerList
                            team={team1Players}
                            selectedPlayer={selectedPlayer}
                            onPlayerClick={setSelectedPlayer}
                            Team1Stats={Team1Stats}
                            Team2Stats={Team2Stats}
                        />
                    </div>

                    <div className="bggraygrad rounded-md">
                        <h3 className="font-semibold ">Team Stats</h3>
                        <div className="w-full text-left p-4  bgdgray text-white flex flex-row justify-between items-center ">
                            <button className={`py-2 px-4 text-white rounded-lg ${selectedStat1 === 'points' ? 'bgorange' : 'bggraygrad'}`} onClick={() => newSelectedStat1('points')}> Points</button>
                            <button className={`py-2 px-4 text-white rounded-lg ${selectedStat1 === 'assists' ? 'bgorange' : 'bggraygrad'}`} onClick={() => newSelectedStat1('assists')}> Assists</button>
                            <button className={`py-2 px-4 text-white rounded-lg ${selectedStat1 === 'steals' ? 'bgorange' : 'bggraygrad'}`} onClick={() => newSelectedStat1('steals')}> Steals</button>
                            <button className={`py-2 px-4 text-white rounded-lg ${selectedStat1 === 'turnovers' ? 'bgorange' : 'bggraygrad'}`} onClick={() => newSelectedStat1('turnovers')}> TNO</button>
                        </div>
                    </div>
                    <div className="w-full text-left p-4 rounded-b-md bgdgray text-white">
                        <div className="grid grid-cols-2 grid-rows-4 gap-2 min-w-fit">
                            <div className="col-span-2 row-span-2 mb-4 flex items-center justify-center">
                                <BarChart team={Team1Stats} stat={selectedStat1} variant={1} />
                            </div>
                            <div className="row-start-3"><MiniCard team={Team1Stats} stat={'assists'} variant={1} /></div>
                            <div className="col-start-1 row-start-4"><MiniCard team={Team1Stats} stat={'steals'} variant={2} /></div>
                            <div className="col-start-2 row-start-3"><MiniCard team={Team1Stats} stat={'points'} variant={3} /></div>
                            <div className="row-start-4"><MiniCard team={Team1Stats} stat={'points'} variant={4} /></div>
                        </div>
                    </div>

                </div>

                {/* Center Column - Main Information */}
                <div className="col-span-2 bg-white p-4 rounded-lg shadow-md min-w-fit">
                    <Clock />
                    <div className="mb-5 flex flex-col items-center justify-center"><ShotTracker selectedPlayer={selectedPlayer} /></div>
                    <div className={selectedPlayer ? "content" : "hidden"}>
                        <PlayerStatBlock Team1Stats={Team1Stats} Team2Stats={Team2Stats} selectedPlayer={selectedPlayer} />
                    </div>


                </div>

                {/* Right Column - Score, Player Names, Stats */}
                <div className="col-span-1 bg-white p-4 rounded-lg shadow-md min-w-fit">
                    <div className="mb-2 text-center"><span className="text-9xl  "><LEDTracker amount={team2points} variant={1} /></span></div>
                    <h2 className="text-4xl font-bold mb-4 border-t-2 border-b-2">{team2[0]}</h2>
                    <h3 className="font-semibold mb-2">Players</h3>
                    <div className="flex-1 flex-col mx-2 mb-6">
                        <ShotTrackerPlayerList
                            team={team2Players}
                            selectedPlayer={selectedPlayer}
                            onPlayerClick={setSelectedPlayer}
                            Team1Stats={Team1Stats}
                            Team2Stats={Team2Stats}
                        />
                    </div>
                    <div className="w-full text-left p-4 rounded-md bgdgray text-white mb-10">
                        <h3 className="font-semibold mb-2 border-b">Team Stats</h3>
                        <div className="w-full text-left p-4 rounded-md bgdgray text-white flex flex-row justify-between items-center mb-10">
                            <button className={`py-2 px-4 text-white rounded-lg ${selectedStat2 === 'points' ? 'bgorange' : 'bggraygrad'}`} onClick={() => newSelectedStat2('points')}> Points</button>
                            <button className={`py-2 px-4 text-white rounded-lg ${selectedStat2 === 'assists' ? 'bgorange' : 'bggraygrad'}`} onClick={() => newSelectedStat2('assists')}> Assists</button>
                            <button className={`py-2 px-4 text-white rounded-lg ${selectedStat2 === 'steals' ? 'bgorange' : 'bggraygrad'}`} onClick={() => newSelectedStat2('steals')}> Steals</button>
                            <button className={`py-2 px-4 text-white rounded-lg ${selectedStat2 === 'turnovers' ? 'bgorange' : 'bggraygrad'}`} onClick={() => newSelectedStat2('turnovers')}> TNO</button>
                        </div>
                        <div className="grid grid-cols-2 grid-rows-4 gap-2">
                            <div className="col-span-2 row-span-2 mb-4"><BarChart team={Team2Stats} stat={selectedStat2} variant={1} /></div>
                            <div className="row-start-3"><MiniCard team={Team2Stats} stat={'points'} variant={1} /></div>
                            <div className="col-start-1 row-start-4"><MiniCard team={Team2Stats} stat={'points'} variant={2} /></div>
                            <div className="col-start-2 row-start-3 "><MiniCard team={Team2Stats} stat={'points'} variant={3} /></div>
                            <div className="row-start-4"><MiniCard team={Team2Stats} stat={'points'} variant={4} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
