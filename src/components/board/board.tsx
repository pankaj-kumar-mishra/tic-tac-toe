import { BoardResult, BoardState } from "@utils";
import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../text/text";
import BoardLine from "./board-line";
import styles from "./board.styles";

/**
 *
 * @param Example
 * @returns
 * [
 * 'X',null,'O',
 * 'X',null,'O',
 * 'X',null,'O',
 * ]
 */

type BoardProps = {
    state: BoardState;
    size: number;
    disabled?: boolean;
    gameResult?: BoardResult | false;
    onCellPress: (index: number) => void;
};

const Board: FC<BoardProps> = ({ state, size, disabled, gameResult, onCellPress }) => {
    return (
        <View
            style={[
                styles.board,
                {
                    width: size,
                    height: size
                }
            ]}
        >
            {state.map((cell, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        disabled={Boolean(cell) || disabled}
                        onPress={() => onCellPress(index)}
                        style={[styles.cell, styles[`cell${index}` as "cell"]]}
                    >
                        <Text weight="700" style={[styles.cellText, { fontSize: size / 5 }]}>
                            {cell}
                        </Text>
                    </TouchableOpacity>
                );
            })}
            {/* {true && (
                <BoardLine
                    size={size}
                    gameResult={{ winner: "O", diagonal: "COUNTER", direction: "D" }}
                />
            )} */}
            {gameResult && <BoardLine size={size} gameResult={gameResult} />}
        </View>
    );
};

export default Board;
