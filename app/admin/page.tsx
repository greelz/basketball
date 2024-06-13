import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { League } from "../types";
import LinkList from "../components/LinkList";

interface LeaguesPageProps {
  leagues: League[];
}

export default async function LeaguesPage() {
  const data = await getData();
  return (
    <>
      <h1>Leagues</h1>
      <LinkList data={data} slug="/admin" />
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
