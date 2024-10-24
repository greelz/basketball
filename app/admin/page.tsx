import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { League } from "../types";
import LinkList from "../components/LinkList";
import { addLeague } from "../database";

interface LeaguesPageProps {
  leagues: League[];
}

export default async function LeaguesPage() {
  const data = await getData();

  async function createLeague(formData: FormData) {
    'use server'
    addLeague("SlabLeague", formData.get('seasonName') as string);
  }
  return (
    <>
      <h1>Leagues</h1>
      <LinkList data={data} slug="/admin" />
      <form action={createLeague} className="text-black">
        <input placeholder="enter a season name" type="input" id="seasonName">
        </input>
        <button type="submit">Create new season</button>
      </form>
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