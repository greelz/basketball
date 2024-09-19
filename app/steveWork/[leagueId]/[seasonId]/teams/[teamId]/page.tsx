import TeamsLayout from './TeamsLayout';

interface IPage {
  params: {
    leagueId: string;
    seasonId: string;
    teamId: string;
  };
}

export default function TeamsPage({ params }: IPage) {
  return (
    <div className="steveBox">
      <TeamsLayout params={params} />
    </div>
  );
}