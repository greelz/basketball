import AdminSidebar from '../../../steveWork/components/admin/AdminSidebar';
import LiveContent from './LiveContentNew';
import AdminFooter from '../../../steveWork/components/admin/AdminFooter';

interface LiveGameParams {
  params: { gameId: string };
}

export default function LiveLayout({ }: LiveGameParams) {
  return (<>
    <div className="flex min-h-screen ">
      <AdminSidebar />
      <div className="flex-1 flex flex-row min-h-max">
        <LiveContent />
      </div>
    </div>
    <AdminFooter />
  </>
  );
}


// export default function LiveLayout({ params }: LiveGameParams) {
//   return (<>
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 flex flex-row">
//         <LiveContent params={params} />
//       </div>
//     </div>
//     <AdminFooter />
//   </>
//   );
// }