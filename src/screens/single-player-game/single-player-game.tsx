import React, { FC, useState } from "react";
import { View } from "react-native";
import { Board, GradientBackground } from "@components";
import {
    BoardState,
    getAvailableMoves,
    isEmpty,
    isFull,
    isTerminal,
    printFormattedBoard
} from "@utils";
import styles from "./single-player-game.styles";

const SinglePlayerGame: FC = () => {
    // prettier-ignore
    const [state, setState] = useState<BoardState>([
        null, null, null,
        null, null, null,
        null, null, null,
    ]);
    // printFormattedBoard(state);
    // console.log(isEmpty(state));
    // console.log(isFull(state));
    // console.log(getAvailableMoves(state));
    // console.log(isTerminal(state));

    const handleOnCellPress = (cell: number): void => {
        const stateCopy: BoardState = [...state];
        if (stateCopy[cell] || isTerminal(stateCopy)) return;

        stateCopy[cell] = "X";
        setState(stateCopy);
    };

    return (
        <GradientBackground>
            <View style={styles.container}>
                <Board
                    disabled={Boolean(isTerminal(state))}
                    onCellPress={index => handleOnCellPress(index)}
                    state={state}
                    size={350}
                />
            </View>
        </GradientBackground>
    );
};

export default SinglePlayerGame;
