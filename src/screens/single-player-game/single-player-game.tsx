import React, { FC, useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Board, GradientBackground, Text, Button } from "@components";
import { BoardState, getBestMove, isEmpty, isTerminal, Cell, Winner } from "@utils";
import { useSounds } from "@hooks";
import styles from "./single-player-game.styles";
import { useSettings, difficulties } from "@contexts/settings.context";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const SinglePlayerGame: FC = () => {
    const playSound = useSounds();
    const { settings } = useSettings();

    // prettier-ignore
    const [state, setState] = useState<BoardState>([
        null, null, null,
        null, null, null,
        null, null, null,
    ]);
    const [turn, setTurn] = useState<"HUMAN" | "BOT">(Math.random() < 0.5 ? "HUMAN" : "BOT");
    // maximizing => true => 'X'
    // maximizing => false => 'O'
    const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
    const [gameCounts, setGameCounts] = useState({
        wins: 0,
        losses: 0,
        draws: 0
    });

    const gameResult = isTerminal(state);

    // printFormattedBoard(state);
    // console.log(isEmpty(state));
    // console.log(isFull(state));
    // console.log(getAvailableMoves(state));
    // console.log(isTerminal(state));

    const insertCell = (cell: number, symbol: "X" | "O"): void => {
        const stateCopy: BoardState = [...state];
        if (stateCopy[cell] || isTerminal(stateCopy)) return;

        stateCopy[cell] = symbol;
        setState(stateCopy);

        try {
            symbol === "X" ? playSound("pop1") : playSound("pop2");
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnCellPress = (cell: number): void => {
        if (turn !== "HUMAN") return;
        // symbol will calculate based on "maximizing"
        insertCell(cell, isHumanMaximizing ? "X" : "O");
        setTurn("BOT");
    };

    const getWinner = (winnerSymbol: Cell): Winner => {
        if (winnerSymbol === "X") {
            return isHumanMaximizing ? "HUMAN" : "BOT";
        }
        if (winnerSymbol === "O") {
            return isHumanMaximizing ? "BOT" : "HUMAN";
        }

        return "DRAW";
    };

    useEffect(() => {
        if (gameResult) {
            // handle game finished
            // alert("Game Over");
            const winner = getWinner(gameResult.winner);
            switch (winner) {
                case "HUMAN":
                    playSound("win");
                    // alert("You Won");
                    setGameCounts(prev => ({ ...prev, wins: prev.wins + 1 }));
                    break;

                case "BOT":
                    playSound("loss");
                    // alert("You Lost!!!");
                    setGameCounts(prev => ({ ...prev, losses: prev.losses + 1 }));
                    break;

                case "DRAW":
                    playSound("draw");
                    // alert("It's Draw!");
                    setGameCounts(prev => ({ ...prev, draws: prev.draws + 1 }));
                    break;

                default:
                    break;
            }
        } else {
            if (turn === "BOT") {
                if (isEmpty(state)) {
                    const centerAndCorners = [0, 2, 4, 6, 8];
                    const firstMove =
                        centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
                    insertCell(firstMove, "X");
                    // switching turn
                    setIsHumanMaximizing(false);
                    setTurn("HUMAN");
                } else {
                    // maxDepth === is for different level of difficulty
                    const best = getBestMove(
                        state,
                        !isHumanMaximizing,
                        0,
                        parseInt(settings ? settings.difficulty : "-1")
                    );
                    insertCell(best, isHumanMaximizing ? "O" : "X");
                    setTurn("HUMAN");
                }
            }
        }
    }, [state, turn]);

    const handleNewGame = () => {
        setState([null, null, null, null, null, null, null, null, null]);
        setTurn(Math.random() < 0.5 ? "HUMAN" : "BOT");
        setIsHumanMaximizing(true);
    };

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View>
                    <Text style={styles.difficulty}>
                        Difficulty : {settings ? difficulties[settings.difficulty] : "Impossible"}
                    </Text>
                    <View style={styles.results}>
                        <View style={styles.resultsBox}>
                            <Text style={styles.resultsTitle}>Wins</Text>
                            <Text style={styles.resultsCount}>{gameCounts.wins}</Text>
                        </View>
                        <View style={styles.resultsBox}>
                            <Text style={styles.resultsTitle}>Draws</Text>
                            <Text style={styles.resultsCount}>{gameCounts.draws}</Text>
                        </View>
                        <View style={styles.resultsBox}>
                            <Text style={styles.resultsTitle}>Losses</Text>
                            <Text style={styles.resultsCount}>{gameCounts.losses}</Text>
                        </View>
                    </View>
                </View>
                <Board
                    disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"}
                    onCellPress={index => handleOnCellPress(index)}
                    state={state}
                    size={SCREEN_WIDTH - 60}
                    gameResult={gameResult}
                />
                {gameResult && (
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>
                            {getWinner(gameResult.winner) === "HUMAN" && "You Won"}
                            {getWinner(gameResult.winner) === "BOT" && "You Lost"}
                            {getWinner(gameResult.winner) === "DRAW" && "It's a Draw"}
                        </Text>
                        <Button onPress={handleNewGame} title="Play Again" />
                    </View>
                )}
            </View>
        </GradientBackground>
    );
};

export default SinglePlayerGame;
