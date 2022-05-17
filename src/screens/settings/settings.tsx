import React, { FC, useState } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { GradientBackground, Text } from "@components";
import styles from "./settings.styles";
import { colors } from "@utils";

const Settings: FC = () => {
    const difficulties = {
        "1": "Beginner",
        "3": "Intermediate",
        "4": "Hard",
        "-1": "Impossible"
    };
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.label}>Bot Difficulty</Text>
                    <View style={styles.choices}>
                        {Object.keys(difficulties).map(level => {
                            return (
                                <TouchableOpacity key={level} style={styles.choice}>
                                    <Text style={styles.choiceText}>
                                        {/* {difficulties[level]} */}
                                        {difficulties[level as keyof typeof difficulties]}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <Text style={styles.label}>Sounds</Text>
                    <Switch
                        trackColor={{
                            false: colors.purple,
                            true: colors.lightPurple
                        }}
                        thumbColor={colors.lightGreen}
                        ios_backgroundColor={colors.purple}
                        value={true}
                        //onValueChange={() => {}}
                    />
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <Text style={styles.label}>Haptics/Vibrations</Text>
                    <Switch
                        trackColor={{
                            false: colors.purple,
                            true: colors.lightPurple
                        }}
                        thumbColor={colors.lightGreen}
                        ios_backgroundColor={colors.purple}
                        value={false}
                        //onValueChange={() => {}}
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
};

export default Settings;
