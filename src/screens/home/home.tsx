import React, { ReactElement, FC } from "react";
import { ScrollView, Image, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./home.styles";
import { StackNavParams } from "@config/navigator";
import { GradientBackground, Button } from "@components";

type HomeProps = {
    navigation: StackNavigationProp<StackNavParams, "Home">;
};

// const Home = ({ navigation }: HomeProps): ReactElement => {

const Home: FC<HomeProps> = ({ navigation }) => {
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Image style={styles.logo} source={require("@assets/logo.png")} />
                <View style={styles.buttons}>
                    <Button
                        onPress={() => navigation.navigate("SinglePlayerGame")}
                        style={styles.button}
                        title="Single Player"
                    />
                    <Button style={styles.button} title="Multiplayer" />
                    <Button style={styles.button} title="Login" />
                    <Button
                        style={styles.button}
                        title="Settings"
                        onPress={() => navigation.navigate("Settings")}
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
};

export default Home;
