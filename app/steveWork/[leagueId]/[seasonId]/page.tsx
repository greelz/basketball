import SeasonLayout from './SeasonLayout';

interface IPage {
  params: { leagueId: string; seasonId: string };
}

export default function SeasonPage({ params }: IPage) {
  // console.log('params in leagueid/seasonid/page:', params);
  return (
    <SeasonLayout params={params} />
  );
}