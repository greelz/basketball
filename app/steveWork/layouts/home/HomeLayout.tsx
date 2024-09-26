import AdminFooter from '../../../steveWork/components/admin/AdminFooter';
import React from "react";
import HomeContent from './HomeContent';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config";
import { League } from "../../../types";

interface LeaguesPageProps {
  leagues: League[];
}

export default async function HomeLayout() {
  const data = await getData();
  console.log('Data in HomeLayout:', data);

  return (<>
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col">
        <HomeContent data={data} slug="/steveWork"/>
      </div>
      <AdminFooter />
    </div >
  </>
  );
}

async function getData(): Promise<League[]> {
  const leaguesSnapshot = await getDocs(collection(db, "leagues"));
  const leagues: League[] = leaguesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as League[];
  return leagues;
}