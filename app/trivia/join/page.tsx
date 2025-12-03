import { db } from "@/app/config";
import PrettyForm from "@/app/trivia/Components/PrettyForm";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <div className="mx-auto">
      <PrettyForm
        title="Get ready to play the funnest trivia you'll (possibly) ever play in your life."
        elements={["Name", "Game Code"]}
        action={async (formData) => {
          "use server";
          const gameId = formData.get("Game Code") as string;
          const name = formData.get("Name");
          updateDoc(doc(db, "trivia", `${gameId}`), {
            players: arrayUnion({
              name: name,
              score: 0,
            }),
          });
          redirect(`/trivia/${formData.get("Game Code")}/${name}`);
        }}
        actionButtonText="Join"
      ></PrettyForm>
    </div>
  );
}
