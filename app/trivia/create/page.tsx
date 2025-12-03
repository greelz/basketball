import PrettyForm from "../Components/PrettyForm";
import { IJeopardyBoard, parseTsv } from "../Interfaces/Jeopardy";
import { db } from "@/app/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export default function Page() {
  // Form action to create a new game
  const createNewGame = async (formData: FormData) => {
    "use server";
    const author = formData.get("Host Name");
    const boardTitle = formData.get("Jeopardy Game Title");
    const generateStr = (len: number) => {
      const alpha: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let ret = "";
      for (let i = 0; i < len; ++i) {
        ret += alpha.charAt(Math.floor(Math.random() * 26));
      }
      return ret;
    };

    const file = formData.get("board") as Blob;
    const text = await file.text();
    const board: IJeopardyBoard = parseTsv(text);

    const newGameCode = generateStr(4);
    await Promise.all([
      setDoc(doc(db, `trivia/${newGameCode}`), {
        jeopardyGame: {
          author: author,
          board: board,
          title: boardTitle,
        },
        gameState: {
          currentState: "lobby",
        },
        metadata: {
          createInstant: serverTimestamp(),
        },
      }),
    ]);
    redirect(`/trivia/${newGameCode}/host`);
  };

  return (
    <div className="max-w-lg flex mx-auto">
      <PrettyForm
        title="Hey genius! Create a new game below -- hope you have your clues ready!"
        actionButtonText="Create"
        action={createNewGame}
        elements={["Host Name", "Jeopardy Game Title"]}
      >
        <input
          name="board"
          required
          type="file"
          className="w-full border-1 border-slate-700 focus:outline-1 outline-slate-700 px-4 py-2"
        ></input>
      </PrettyForm>
    </div>
  );
}
