import React, { FC, useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { GradientBackground, Text } from "@components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./settings.styles";
import { colors } from "@utils";

const difficulties = {
    "1": "Beginner",
    "3": "Intermediate",
    "4": "Hard",
    "-1": "Impossible"
};

type SettingsType = {
    difficulty: keyof typeof difficulties; // "-1" | "1" | "3" | "4"
    haptics: boolean;
    sounds: boolean;
};

const defaultSettings: SettingsType = {
    difficulty: "-1",
    haptics: true,
    sounds: true
};

const Settings: FC = () => {
    const [settings, setSettings] = useState<SettingsType | null>(null);

    const loadSettings = async () => {
        try {
            const settingsData = await AsyncStorage.getItem("@settings");
            settingsData === null
                ? setSettings(defaultSettings)
                : setSettings(JSON.parse(settingsData));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    // const saveSetting = async (setting: keyof SettingsType, value: string | boolean) => {
    const saveSetting = async <T extends keyof SettingsType>(
        setting: T,
        value: SettingsType[T]
    ) => {
        try {
            const oldSettings = settings ? settings : defaultSettings;
            const newSettings = { ...oldSettings, [setting]: value };
            await AsyncStorage.setItem("@settings", JSON.stringify(newSettings));
            setSettings(newSettings);
        } catch (error) {
            console.log(error);
        }
    };

    if (!settings) {
        return (
            <GradientBackground>
                <Text style={styles.label}>Loading...</Text>
            </GradientBackground>
        );
    }

    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.label}>Bot Difficulty</Text>
                    <View style={styles.choices}>
                        {Object.keys(difficulties).map(level => {
                            return (
                                <TouchableOpacity
                                    key={level}
                                    onPress={() =>
                                        saveSetting(
                                            "difficulty",
                                            level as keyof typeof difficulties
                                        )
                                    }
                                    style={[
                                        styles.choice,
                                        {
                                            backgroundColor:
                                                settings.difficulty === level
                                                    ? colors.lightPurple
                                                    : colors.lightGreen
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.choiceText,
                                            {
                                                color:
                                                    settings.difficulty === level
                                                        ? colors.lightGreen
                                                        : colors.darkPurple
                                            }
                                        ]}
                                    >
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
                        value={settings.sounds}
                        onValueChange={() => saveSetting("sounds", !settings.sounds)}
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
                        value={settings.haptics}
                        onValueChange={() => saveSetting("haptics", !settings.haptics)}
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
};

export default Settings;
