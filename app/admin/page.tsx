import {collection, getDocs} from "firebase/firestore";
import {db} from "../config";
import {League} from "../types";
import LinkList from "../components/LinkList";
import {addLeague} from "../database";
import Form from "@/app/components/BasketballForm";

export default async function LeaguesPage() {
  const data = await getData();

  async function createLeague(formData: FormData) {
    'use server'
    const name = formData.get('leagueName') as string;
    addLeague(name, name);
  }
  return (
    <div className="p-2 flex flex-col gap-5">
      <h1 className="text-center text-3xl">Leagues</h1>
      <LinkList data={data} slug="/admin" />
      <div className="max-w-80">
        <Form action={createLeague}
          title="Create a league"
        >
          <input className="input-default" placeholder="enter a league name" type="input" name="leagueName" id="leagueName">
          </input>
          <button className="btn-blue mt-4" type="submit">Create new league</button>
        </Form>
      </div>
    </div>
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
