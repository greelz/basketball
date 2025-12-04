"use client";

import { useCallback, useRef, useState } from "react";
import LiveBoard from "./LiveBoard";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "@/app/config";
import IJeopardyGame, {
  IJeopardyCategory,
  IJeopardyQuestion,
  IServerBoard,
} from "../Interfaces/Jeopardy";
import { usePlayerList } from "./hooks";
import { FaX } from "react-icons/fa6";
import { disableBuzzers, removeBuzzData } from "./apis";

interface IAdminLiveBoardProps {
  gameId: string;
}

async function getQuestion(
  questionId: string,
  gameId: string
): Promise<
  { question: IJeopardyQuestion; category: IJeopardyCategory } | undefined
> {
  const ref = doc(db, "trivia", gameId);
  const data = await getDoc(ref);

  if (!data.exists()) {
    return;
  }

  const board = (data.data() as IServerBoard).jeopardyGame?.board;

  if (!board) {
    return;
  }

  for (const cat of board.categories) {
    for (const question of cat.questions) {
      if (question.id === questionId) {
        return { question: question, category: cat };
      }
    }
  }
}

async function editQuestion(
  gameId: string,
  question: IJeopardyQuestion | undefined,
  editType: "show" | "reset"
) {
  if (!question) return;
  const ref = doc(db, "trivia", gameId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    console.error(`Couldn't find ${gameId}`);
    return;
  }

  disableBuzzers(gameId);
  removeBuzzData(gameId);

  const data = snap.data();
  const jeopardyGame = { ...(data.jeopardyGame as IJeopardyGame) };

  jeopardyGame.board = {
    ...jeopardyGame.board,
    categories: jeopardyGame.board.categories.map((cat) => ({
      ...cat,
      questions: cat.questions.map((q) => {
        if (q.id === question.id) {
          return {
            ...q,
            currentQuestion: editType === "show",
            hide: editType === "show",
          };
        }
        return q;
      }),
    })),
  };

  await updateDoc(ref, {
    jeopardyGame,
  });
}

export default function AdminLiveBoard({ gameId }: IAdminLiveBoardProps) {
  const questionPopupRef = useRef<HTMLDivElement>(null);

  const [question, setQuestion] = useState<IJeopardyQuestion>();
  const [category, setCategory] = useState("");

  const closeQuestionPopup = useCallback(() => {
    questionPopupRef.current?.hidePopover();
  }, []);

  return (
    <>
      <div className="min-h-100">
        <LiveBoard
          hostMode
          gameId={gameId}
          onResetClick={() => editQuestion(gameId, question, "reset")}
          onBoardClick={async (qId: string) => {
            const result = await getQuestion(qId, gameId);
            if (result) {
              setQuestion(result.question);
              setCategory(result.category.title);
              editQuestion(gameId, result.question, "show");
            }
          }}
        />
      </div>

      <div
        ref={questionPopupRef}
        id="adminBoardPopover"
        popover="auto"
        className="m-auto lg:w-[50%] w-[80%]
             bg-black text-white border border-slate-700 shadow-md rounded-md p-3"
      >
        {/* This one fills the popover and controls layout */}
        <div className="flex min-h-[30dvh] flex-col">
          <div className="flex justify-between mb-5">
            <div>
              {category} - {question?.value}
            </div>
            <button onClick={closeQuestionPopup} className="ml-auto btn-gray">
              <FaX />
            </button>
          </div>

          {/* Main content area that should grow */}
          <div className="flex-1 flex flex-col gap-2">
            <div>{question?.prompt}</div>
            <div className="text-lg italic">{question?.answer}</div>
          </div>

          {/* Buttons pinned to the bottom of the popover */}
          <div className="flex flex-wrap gap-2 text-xs pt-4">
            <button
              onClick={() => {
                if (question) {
                  editQuestion(gameId, question, "show");
                  closeQuestionPopup();
                }
              }}
              className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-800 active:bg-purple-900 hover:cursor-pointer"
            >
              Show Question
            </button>
            <button
              onClick={() => {
                if (question) {
                  editQuestion(gameId, question, "reset");
                  closeQuestionPopup();
                }
              }}
              title="Reset this question so it appears on the live board again"
              className="btn-red"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
