import React, { ReactElement } from "react";
import { SafeAreaView, Text } from "react-native";
import { GradientBackground } from "@components";
import styles from "./singleplayer-game.styles";

const SinglePlayerGame = (): ReactElement => {
    return (
        <GradientBackground>
            <SafeAreaView style={styles.container}>
                <Text style={{ color: "#fff" }}>SinglePlayerGame Screen</Text>
            </SafeAreaView>
        </GradientBackground>
    );
};

export default SinglePlayerGame;
