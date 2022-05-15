import { BoardState } from "@utils";
import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../text/text";

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
    onCellPress: (index: number) => void;
};

const Board: FC<BoardProps> = ({ state, size, disabled, onCellPress }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                backgroundColor: "green",
                flexDirection: "row",
                flexWrap: "wrap"
            }}
        >
            {state.map((cell, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        disabled={Boolean(cell) || disabled}
                        onPress={() => onCellPress(index)}
                        style={{
                            width: "33.33%",
                            height: "33.33%",
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text weight="700" style={{ fontSize: size / 6 }}>
                            {cell}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default Board;
