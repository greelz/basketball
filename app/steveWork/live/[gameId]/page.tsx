
import LiveLayout from './LiveLayout';

interface LiveGameParams {
  params: { gameId: string };
}
export default function AdminPage({params}: LiveGameParams) {
    return (
        <div className='steveBox'>
        <LiveLayout params={params}/>
        </div>
    );
}