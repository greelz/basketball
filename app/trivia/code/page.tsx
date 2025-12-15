import PrettyForm from "@/app/trivia/Components/PrettyForm";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <div className="mx-auto">
      <PrettyForm
        title="Get ready to play the funnest trivia you'll (possibly) ever play in your life."
        elements={["Game Code"]}
        action={async (formData) => {
          "use server";
          const gameId = formData.get("Game Code")?.toString().toUpperCase();
          if (!gameId || gameId.length !== 4) {
            return;
          }

          redirect(`/trivia/join/${gameId}`);
        }}
        actionButtonText="Join"
      ></PrettyForm>
    </div>
  );
}
