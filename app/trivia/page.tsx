'use client'

import { useState } from "react";
import HomePage, { IGameInfo } from "./pages/HomePage";
import Game from "./pages/Game";
import { push, ref, set } from "firebase/database";
import { database } from "./Hooks/FirebaseApp";

export default function TriviaPage() {
    const [gameId, setGameId] = useState("");
    const [name, setName] = useState("");

    const addUserToGame = async (gameId: string) => {
        console.log("Adding a user to a game...");
        return push(ref(database, `games/${gameId}/players`), name);
    };

    const onCreateNewGame = (gameInfo: IGameInfo) => {
        console.log("creating a new game...");
        setGameId(gameInfo.gameId);
        const reference = ref(database, `games/${gameInfo.gameId}`);
        set(reference, {
            status: "lobby",
        });

        addUserToGame(gameInfo.gameId);
    };

    if (gameId !== "" && name !== "") {
        return <div className="triviaBackground">
            <Game gameId={gameId} name={name} />
        </div>
    } else {
        return (
            <div className="triviaBackground">
                <HomePage
                    name={name}
                    onSetName={(name) => setName(name)}
                    onCreateNewGame={(gameInfo) => {
                        onCreateNewGame(gameInfo);
                    }}
                    onJoinGame={async (gameId, exists) => {
                        setGameId(gameId);
                        if (!exists) addUserToGame(gameId);
                    }}
                />
            </div>
        );
    }
}
