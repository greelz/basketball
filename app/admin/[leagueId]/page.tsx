import { revalidatePath } from "next/cache";
import { addSeason, addTeam, getSeasons } from "@/app/database";
import LinkList from "@/app/components/LinkList";

interface LeaguePageProps {
  params: { leagueId: string };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const seasons = await getSeasons(params.leagueId);
  return (
    <>
      <h1>Seasons</h1>
      <LinkList data={seasons} slug={`/admin/${params.leagueId}`} />
      <form
        action={async (formData) => {
          "use server";
          const seasonName = formData.get("seasonName") as string;
          await addSeason(seasonName, params.leagueId);
          revalidatePath("/");
        }}
      >
        <h3 className="text-black">Add a season</h3>
        <div className="text-black">
          <label htmlFor="seasonName">Season Name: </label>
          <input type="text" name="seasonName" autoComplete="off" className="text-black" />
        </div>
        <button type="submit">Add Season</button>
      </form>
    </>
  );
}