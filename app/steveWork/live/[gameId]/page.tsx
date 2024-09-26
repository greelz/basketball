
import LiveLayout from './LiveLayout';
import React from "react";

interface LiveGameParams {
  params: { gameId: string };
}

export default function LiveGame({ params }: LiveGameParams) {

  return (
    <div className='steveBox '>
      <LiveLayout params={params} />
    </div>
  );
}