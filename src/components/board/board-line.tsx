import React, { FC, useRef, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";
import { BoardResult } from "@utils";
import { colors } from "@utils";

type BoardLineProps = {
    size: number;
    gameResult?: BoardResult | false;
};

const BoardLine: FC<BoardLineProps> = ({ size, gameResult }) => {
    const diagonalHeight = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));
    // console.log(diagonalHeight);
    const animationLineRef = useRef<Animated.Value>(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animationLineRef, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }, []);

    const lineHeight = animationLineRef.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"]
    });
    const lineWidth = animationLineRef.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"]
    });

    const lineDiagonalHeight = animationLineRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0, diagonalHeight]
    });
    const lineTranslateY = animationLineRef.interpolate({
        inputRange: [0, 1],
        outputRange: [size / 2, -(diagonalHeight - size) / 2]
    });

    return (
        <>
            {gameResult && gameResult.column && gameResult.direction === "V" && (
                <Animated.View
                    style={[
                        styles.line,
                        styles.vLine,
                        { left: `${33.33 * gameResult.column - 16.66}%`, height: lineHeight }
                    ]}
                />
            )}
            {gameResult && gameResult.row && gameResult.direction === "H" && (
                <Animated.View
                    style={[
                        styles.line,
                        styles.hLine,
                        { top: `${33.33 * gameResult.row - 16.66}%`, width: lineWidth }
                    ]}
                />
            )}
            {gameResult && gameResult.diagonal && gameResult.direction === "D" && (
                <Animated.View
                    style={[
                        styles.line,
                        styles.dLine,
                        {
                            height: lineDiagonalHeight,
                            transform: [
                                // { translateY: -(diagonalHeight - size) / 2 },
                                { translateY: lineTranslateY },
                                { rotateZ: gameResult.diagonal === "MAIN" ? "-45deg" : "45deg" }
                            ]
                        }
                    ]}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    line: {
        position: "absolute",
        backgroundColor: colors.lightPurple
    },
    vLine: {
        width: 4
        // height: "100%"
    },
    hLine: {
        height: 4
        // width: "100%"
    },
    dLine: {
        width: 4,
        top: 0,
        left: "50%"
    }
});

export default BoardLine;
