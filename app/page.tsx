import React from "react";
import HomeLayout from "./steveWork/layouts/home/HomeLayout";
import HomeContent from "./steveWork/layouts/home/HomeContent";
import AdminFooter from "./steveWork/components/admin/AdminFooter";
import { getSeasons } from "./database";
import { getMainLeague } from "./uxDb";
import { Season } from "./types";

export default async function Home() {
  const mainLeague = "PzZH38lp1R6wYs5Luf67";
  const seasons: Season[] = await getSeasons(mainLeague);



  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col">
          <HomeContent />
          {/* <HomeContent seasons={seasons} leagueId={mainLeague}/> */}
        </div>
        <AdminFooter />
      </div >
    </>
  )
};