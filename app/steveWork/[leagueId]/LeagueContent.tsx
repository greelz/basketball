
import AdminSidebar from "../components/admin/AdminSidebar";
import localFont from "next/font/local";

import HighlightChart from "../components/web/HighlightChart";
import RightSidebar from "../components/admin/RightSidebar";
import { revalidatePath } from "next/cache";
import { addSeason } from "@/app/database";


interface LeaguePageProps {
  params: { leagueId: string };
}
interface IIdAndName {
  id: string;
  name: string;
}
interface ILinkListProps {
  data: IIdAndName[];
  slug: string;
}
export default async function LeagueContent({ params, data, slug }: LeaguePageProps & ILinkListProps) {
  console.log('Data in LeagueContent:', data);
  return (
    <div className="flex h-screen">
      {/* Left Column */}
      <div className="row-span-5">
        <AdminSidebar />
      </div>
      {/* Center Column */}
      <div className="flex-1 flex flex-col justify-start items-center border-white border-r-8 m">
        <img src="/bballSVG.svg" alt="Basketball" className="max-w-sm align-center animate-bobbing" />
        <a className={` text-6xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap`}
        >{'Choose A League'}</a>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 w-full mt-5">
          {data.map((d) => (
            <div key={d.id} className="flex flex-col justify-center align-center mx-6">
              <HighlightChart
                key={`${d.id}.chart`}
                titleContent={<a href={`${slug}/${d.id}`}>{d.name}</a>}
                col1Title={'Teams'}
                col1data={['AC130s', 'Banana Boat Boys', 'Mean Machines']}
                col2Title={"W/L"}
                col2data={[`6 / 0 `, `4 / 2`, `1 / 5`]}
              />
            </div>))}


        </div>
      </div>
      {/* Right Column */}
      <div className="row-span-5">
        <RightSidebar />
      </div>
    </div >
  );
}
