import { DataSnapshot, increment, push, set } from "firebase/database";
import { ChangeEvent, useCallback, useMemo, useRef } from "react";
import Button from "../Components/ButtonComponent";
import JeopardyBoard from "../Components/JeopardyBoard";
import IJeopardyGame, {
  getJeopardyGame,
  IJeopardyBoard,
  IJeopardyQuestion,
  parseTsv,
} from "../Interfaces/Jeopardy";
import { getList, getMap } from "./Lobby";
import ButtonComponent from "../Components/ButtonComponent";

interface IHostProps {
  gameData: DataSnapshot | undefined;
  name: string;
  gameId: string;
}

interface IBuzzResults {
  name: string;
  buzzEpoch: number;
  rank?: number;
}

interface IBuzzProcessed {
  buzzResults: IBuzzResults[];
  fastestBuzz: number;
}

function calcBuzzerState(
  buzzData: DataSnapshot | undefined
): IBuzzProcessed | undefined {
  if (!buzzData) return;
  let fastestBuzz = Number.MAX_VALUE;
  let tempProcessing: IBuzzResults[] = [];
  //   let whoBuzzed = "";
  //   let earliestBuzz = Number.MAX_VALUE;
  buzzData.forEach((ds) => {
    if (!ds.key) return;
    const t = ds.val();
    if (t < fastestBuzz) fastestBuzz = t;
    tempProcessing.push({ name: ds.key, buzzEpoch: t });
  });

  tempProcessing.sort((a, b) => {
    if (a.buzzEpoch > b.buzzEpoch) return 1;
    if (a.buzzEpoch < b.buzzEpoch) return -1;
    return 0;
  });

  tempProcessing.forEach((x, i) => {
    x.rank = i + 1;
  });

  return { buzzResults: tempProcessing, fastestBuzz: fastestBuzz };
}

function formatTimeDiff(t1?: number, t2?: number): string {
  if (!t1 || !t2) return "";
  if (isNaN(t1) || isNaN(t2)) return "";
  if (t1 === t2) return "";

  return ((t1 - t2) / 1000).toFixed(2);
}

async function setAnswering(
  gameState: DataSnapshot | undefined,
  pers?: string
) {
  if (!gameState) return;
  if (pers == null) return;

  const ansPRef = gameState.child("ansP").ref;
  const gameStatusRef = gameState.child("gameStatus").ref;
  const hasBuzzedInRef = gameState.child(`hasBuzzedIn`).ref;

  await set(ansPRef, pers);
  await set(gameStatusRef, "answering");
  await push(hasBuzzedInRef, pers);
}

export default function Host(props: IHostProps) {
  function setSelectedQuestion(
    q?: IJeopardyQuestion,
    cIdx?: number,
    qIdx?: number
  ) {
    console.log("here");
    if (!gameState) return;
    set(gameState?.child("question")?.ref, q ?? null);

    if (cIdx != null && qIdx != null) markQuestionAsAsked(cIdx, qIdx);

    reset();
  }

  const gameData = props.gameData;
  const players = getList(gameData, "players");
  const playersPoints = getMap(gameData, "points");
  const gameState = gameData?.child("gameState");
  const buzzData = gameState?.child("buzzers");
  const buzzStateValues = useMemo(() => calcBuzzerState(buzzData), [buzzData]);
  const buzzersEnabled = gameState?.child("buzzersEnabled").val() === "Y";
  const answerer = gameState?.child("ansP").val();
  const askedQuestions = getList(gameData, "gameState/askedQuestions");
  console.log(askedQuestions);
  const question: IJeopardyQuestion = gameState?.child("question").val();
  const jGame: IJeopardyGame | undefined = getJeopardyGame(gameData);

  const pendingBuzzCheck = useRef<boolean>(false);

  const shouldPickBuzzer =
    answerer == null &&
    buzzStateValues != null &&
    buzzStateValues.buzzResults.length > 0;

  if (shouldPickBuzzer && !pendingBuzzCheck.current) {
    pendingBuzzCheck.current = true;
    setTimeout(async () => {
      if (gameState) {
        await setAnswering(gameState, buzzStateValues.buzzResults[0].name);
      }
      pendingBuzzCheck.current = false;
    }, 500);
  }

  const toggleBuzzers = useCallback(
    (toOn: boolean) => {
      if (!gameState) return;
      set(gameState.child("buzzersEnabled").ref, toOn ? "Y" : "N");
    },
    [gameState]
  );

  const reset = useCallback(() => {
    if (gameState) {
      set(gameState.child("hasBuzzedIn").ref, null);
      set(gameState.child("buzzersEnabled").ref, "N");
      set(gameState.child("ansP").ref, null);
      set(gameState.child("buzzers").ref, null);
      set(gameState.child("gameStatus").ref, "showQuestion");
    }
  }, [gameState]);

  const allowNewBuzzes = useCallback(() => {
    if (!gameState) return;
    toggleBuzzers(false);
    set(gameState.child("question").ref, question);
    set(gameState.child("buzzersEnabled").ref, "Y");
    set(gameState.child("ansP").ref, null);
    set(gameState.child("gameStatus").ref, "showQuestion");
    set(gameState.child("buzzers").ref, null);
  }, [toggleBuzzers, gameState, question]);

  const markQuestionAsAsked = (cIdx: number, qIdx: number) => {
    if (gameState) {
      push(gameState.child("askedQuestions").ref, cIdx + "," + qIdx);
    }
  };

  const markQuestionCorrect = useCallback(
    (wasCorrect: boolean): void => {
      if (gameData) {
        set(
          gameData.child(`points/${answerer}`).ref,
          increment(wasCorrect ? question.value : -question.value)
        );
      }
      if (wasCorrect) {
        // Give the player the points, and reset the state of the game
        reset();
        if (gameData) set(gameData.child("gameState/question").ref, null);
      } else {
        // they got it wrong
        allowNewBuzzes();
      }
    },
    [gameData, answerer, question, reset, allowNewBuzzes]
  );

  return (
    <div className="hostContainer">
      <div className="_hostTop">{`Welcome to the Host Panel - ${props.gameId}`}</div>
      <div className="_hostBottom">
        <div className="playersGrid">
          {players.map((p) => {
            const processedBuzz = buzzStateValues?.buzzResults.find(
              (a) => a.name === p
            );

            return (
              <>
                <div
                  key={p + "row"}
                  className="_hostPlayerRow"
                  onClick={() => setAnswering(gameState, p)}
                >
                  <div key={p}>{p}</div>
                  <div key={p + "pts"}>{playersPoints?.get(p) ?? 0}</div>
                  <div key={p + "buzz"}>{processedBuzz?.rank || ""}</div>
                  <div key={p + "buzzDiff"}>
                    {formatTimeDiff(
                      processedBuzz?.buzzEpoch,
                      buzzStateValues!.fastestBuzz
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="controlGrid">
          <div className="_controlButtons">
            {question && (
              <ButtonComponent
                caption={`${buzzersEnabled ? "Disable" : "Enable"} Buzzers`}
                onClick={() => toggleBuzzers(!buzzersEnabled)}
              />
            )}
            {answerer && (
              <>
                <ButtonComponent
                  caption="Correct"
                  onClick={() => markQuestionCorrect(true)}
                />
                <ButtonComponent
                  caption="Wrong"
                  onClick={() => markQuestionCorrect(false)}
                />
              </>
            )}
          </div>
          <JeopardyBoard
            askedQuestions={askedQuestions}
            game={jGame}
            selectedQuestion={question}
            setSelectedQuestion={(q, cIdx, qIdx) =>
              setSelectedQuestion(q, cIdx, qIdx)
            }
            onFileChange={async (e: ChangeEvent<HTMLInputElement>) => {
              if (!gameData || !e.target.files) return;
              const file = e.target.files[0];
              const text = await file.text();
              // Tab-delimited file that looks like the template
              const board: IJeopardyBoard = parseTsv(text);
              set(gameData?.child("jeopardyGame").ref, {
                title: "Matt's test",
                author: "Greeley",
                board: board,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
