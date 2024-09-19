import SeasonLayout from './SeasonLayout';

interface IPage {
  params: { leagueId: string; seasonId: string };
}

export default function SeasonPage({ params }: IPage) {
  return (
    <div className="steveBox">
      <SeasonLayout params={params} />
    </div>
  );
}