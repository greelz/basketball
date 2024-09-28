
import AdminSidebar from "../components/admin/AdminSidebar";
import localFont from "next/font/local";

import HighlightChart from "../components/web/HighlightChart";
import RightSidebar from "../components/admin/RightSidebar";
import { revalidatePath } from "next/cache";
import { addSeason } from "@/app/database";
import TextTicker from "../components/web/TextTicker";
import BigButton from "../components/web/BigButton";


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
        <div className="border-2 border-transparent bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer">
          <div className="flex flex-row flex-1 items-center">
            <TextTicker content={"Choose Your Division"} />
          </div>
        </div>
        <div className="grid grid-flow-col gap-4 w-full mt-5">
          {data.map((d) => (
            <div key={d.id} className="flex flex-col justify-center align-center mx-6">
              <BigButton url={`${slug}/${d.id}`} content={d.name} />
            </div>))}
        </div>
      </div>
      {/* Right Column */}
      <div className="row-span-5" >
        <RightSidebar />
      </div >
    </div >
  );
}
