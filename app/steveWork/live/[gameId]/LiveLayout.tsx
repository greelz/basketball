import AdminSidebar from '../../../steveWork/components/admin/AdminSidebar';
import LiveContent from './LiveContent';
import AdminFooter from '../../../steveWork/components/admin/AdminFooter';

interface LiveGameParams {
  params: { gameId: string };
}

export default function LiveLayout({ params }: LiveGameParams) {
  return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <LiveContent params={params} />
          <AdminFooter />
        </div>
      </div>
  );
}