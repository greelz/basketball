import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { League } from "../types";
import LinkList from "../components/LinkList";

interface LeaguesPageProps {
  leagues: League[];
}

export default async function LeaguesPage() {
  const data = await getData();
  console.log('getLeagues data:');
  console.log(data);
  return (
    <>
      <div className=' bg-white/75 my-20 px-36 pb-20 pt-10 h-3/4' >
        <h1>Leagues</h1>
        <LinkList data={data} slug="/admin" />
      </div>
    </>
  );
}

async function getData(): Promise<League[]> {
  const leaguesSnapshot = await getDocs(collection(db, "leagues"));
  const leagues: League[] = leaguesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as League[];
  console.log('getdataFunction:*******************************************');
  console.log('leaguessnapshot::*******************************************');
  console.log(leaguesSnapshot);
  console.log('leagues::*******************************************');
  console.log(leagues);
  return leagues;
}
