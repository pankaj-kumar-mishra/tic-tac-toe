import React, { ReactElement, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

type GradientBackgroundProps = {
    children: ReactNode;
};

const GradientBackground = ({ children }: GradientBackgroundProps): ReactElement => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <LinearGradient style={StyleSheet.absoluteFill} colors={["#120318", "#221a36"]} />
            {children}
        </SafeAreaView>
    );
};

export default GradientBackground;
