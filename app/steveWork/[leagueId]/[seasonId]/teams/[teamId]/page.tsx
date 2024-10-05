import TeamsLayout from './TeamsLayout';
import { addPlayer, getPlayersFromTeam } from "@/app/database";
import { revalidatePath } from "next/cache";
import TeamsContent from './TeamsContent';
import AdminFooter from '@/app/steveWork/components/admin/AdminFooter';

interface IPage {
  params: {
    leagueId: string;
    seasonId: string;
    teamId: string;
  };
}

export default async function TeamsPage({ params }: IPage) {

  return (
    <>
      <TeamsContent params={params} />
      <AdminFooter />
    </>);
}