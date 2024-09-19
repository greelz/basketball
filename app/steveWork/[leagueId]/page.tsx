import LeagueLayout from '../../steveWork/[leagueId]/LeagueLayout';

interface LeaguePageProps {
  params: { leagueId: string };
}

export default function LeaguePage({ params }: LeaguePageProps) {
  return (
    <div className="steveBox">
          <LeagueLayout params={params} />
      </div>
  );
}



// import AdminSidebar from '../../steveWork/AdminSidebar';
// import LeagueContent from '../../steveWork/[leagueId]/LeagueContent';
// import AdminFooter from '../../steveWork/AdminFooter';

// interface LeaguePageProps {
//   params: { leagueId: string };
// }

// export default function Layout({ params }: LeaguePageProps) {
//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 flex flex-col">
//         <LeagueContent params={params}/>
//         <AdminFooter />
//       </div>
//     </div>
//   );
// }
