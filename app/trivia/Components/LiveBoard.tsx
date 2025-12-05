'use client';

import { ILiveBoardProps, IJeopardyBoard } from '@/app/trivia/Interfaces/Jeopardy';
import { RxReset } from 'react-icons/rx';

export interface ILiveBoardPageProps {
  board?: IJeopardyBoard;
  fontsize?: string;
  onBoardClick?: (questionId: string) => void;
  onResetClick?: () => void;
  hostMode?: boolean;
}

export default function Page(props: ILiveBoardProps & ILiveBoardPageProps) {
  const board = props.board;

  if (!board) {
    return <div>Loading the board...</div>;
  }

  const allQuestions = board.categories.flatMap((cat) => cat.questions);
  const currentQuestion = allQuestions.find((q) => q.currentQuestion);

  // If there's a current question, render it fullscreen
  if (currentQuestion) {
    return (
      <div
        className={`relative flex flex-col gap-4 w-full h-full p-10 text-shadow-lg/50 text-center items-center justify-center bg-jeopardy uppercase ${
          props.fontsize
            ? props.fontsize
            : 'lg:text-6xl/20 md:text-4xl/15 sm:text-3xl/12 text-2xl/10 '
        }`}
      >
        <div className="max-w-300">{currentQuestion.prompt}</div>
        {props.hostMode && (
          <>
            <div className="relative">
              <div className="max-w-300 text-sm">{currentQuestion.answer}</div>

              <div className="max-w-300 text-sm">${currentQuestion.value}</div>
            </div>
            <button
              className="text-xs btn-red absolute top-px right-px"
              onClick={props.onResetClick}
            >
              <RxReset />
            </button>
          </>
        )}
      </div>
    );
  }

  // Render the entire board if there are no questions currently being asked
  if (!currentQuestion) {
    return (
      <div
        className={`mx-auto h-full grid grid-cols-${board.categories.length} grid-rows-[1fr_10fr] gap-1
        text-xs sm:text-sm md:text-normal lg:text-xl`}
      >
        {board.categories.map((cat) => (
          <div
            className="flex items-center text-shadow-lg/50 justify-center text-center bg-jeopardy text-white font-bold overflow-auto min-h-15"
            key={cat.title}
          >
            {cat.title}
          </div>
        ))}
        {board.categories.map((cats) => {
          return (
            <div className="flex flex-col justify-center gap-1" key={cats.title}>
              {cats.questions
                .sort((a, b) => a.value - b.value) // Ensure lowest values at the bottom
                .map((q) => (
                  <div
                    className={`text-jeopardytext text-shadow-lg/50 text-outline-black flex-1 bg-jeopardy w-full 
                      text-base sm:text-lg md:text-3xl lg:text-4xl xl:text-6xl xxl:text-8xl
                      text-center flex justify-center items-center ${
                        props.onBoardClick
                          ? 'hover:cursor-pointer hover:bg-blue-700 active:bg-blue-800'
                          : ''
                      }`}
                    key={q.value}
                    onClick={() => {
                      if (props.onBoardClick) {
                        props.onBoardClick(q.id);
                      }
                    }}
                  >
                    {!q.hide && '$' + q.value}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    );
  }
}
