import {revalidatePath} from "next/cache";
import {addSeason, getSeasons} from "@/app/database";
import LinkList from "@/app/components/LinkList";
import Form from "@/app/components/BasketballForm";

interface LeaguePageProps {
  params: Promise<{leagueId: string}>;
}

export default async function LeaguePage(props: LeaguePageProps) {
  const params = await props.params;
  const seasons = await getSeasons(params.leagueId);
  return (
    <div className="p-2 flex flex-col gap-6">
      <h1 className="text-3xl text-center">Seasons</h1>
      <LinkList data={seasons} slug={`/admin/${params.leagueId}`} />
      <div className="max-w-100">

        <Form
          title="Add a season"
          action={async (formData) => {
            "use server";
            const seasonName = formData.get("seasonName") as string;
            await addSeason(seasonName, params.leagueId);
            revalidatePath("/");
          }}
        >
          <div className="flex flex-col gap-8">
            <div className="flex gap-3 align-center">
              <label htmlFor="seasonName">Season Name: </label>
              <input className="input-default" type="text" id="seasonName" name="seasonName" autoComplete="off" />
            </div>
            <button className="btn-blue text-white w-40" type="submit">Add Season</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
