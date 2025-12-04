import PrettyForm from "@/app/trivia/Components/PrettyForm";
import { redirect } from "next/navigation";
import { tryAddPlayerFormData } from "@/app/trivia/Components/apis";

export default function Page() {
  return (
    <div className="mx-auto">
      <PrettyForm
        title="Get ready to play the funnest trivia you'll (possibly) ever play in your life."
        elements={["Name", "Game Code"]}
        action={async (formData) => {
          "use server";
          const gameId = formData.get("Game Code")?.toString().toUpperCase();
          if (!gameId || gameId.length !== 4) {
            return;
          }

          const nameForDb = await tryAddPlayerFormData(gameId, formData);
          if (nameForDb) {
            redirect(`/trivia/${gameId}/${nameForDb}`);
          }
        }}
        actionButtonText="Join"
      ></PrettyForm>
    </div>
  );
}
