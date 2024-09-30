
import GameHistory from './GameHistory';
import LiveLayout from './LiveLayout';
import React from "react";

interface LiveGameParams {
    params: { gameId: string };
}

export default async function LiveGame({ params }: LiveGameParams) {

    return (
        <div className='steveBox '>
            <GameHistory params={params} />
        </div>
    );
}