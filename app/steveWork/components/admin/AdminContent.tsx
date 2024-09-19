// components/MainContent.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config";
import { League } from "../../../types";
import LinkList from "../../../components/LinkListAdmin";

interface LeaguesPageProps {
  leagues: League[];
}

export default async function AdminContent() {
  const data = await getData();
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-black">Dashboard Overview</h2>
        <LinkList data={data} slug="/steveWork" />
      </div>
    </main>
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


//   <main className="flex-1 p-6 bg-gray-100">
//   <div className="container mx-auto">
//     <h2 className="text-2xl font-semibold mb-6 text-black">Dashboard Overview</h2>
//     <div className="grid grid-cols-3 gap-4">
//       <div className="bg-white text-black p-6 shadow-lg">Widget 1</div>
//       <div className="bg-white text-black p-6 shadow-lg">Widget 2</div>
//       <div className="bg-white text-black p-6 shadow-lg">Widget 3</div>
//     </div>
//   </div>
// </main>