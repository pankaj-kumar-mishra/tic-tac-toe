import React, { ReactElement, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

type GradientBackgroundProps = {
    children: ReactNode;
};

const GradientBackground = ({ children }: GradientBackgroundProps): ReactElement => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <LinearGradient style={StyleSheet.absoluteFill} colors={["#120318", "#221a36"]} />
            {children}
        </View>
    );
};

export default GradientBackground;
