import React, { createContext, FC, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

type SettingsContextType = {
    settings: SettingsType | null;
    loadSettings: () => void;
    saveSetting: <T extends keyof SettingsType>(
        setting: T,
        value: SettingsType[T]
    ) => Promise<void>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider.");
    }
    return context;
};

const SettingsProvider: FC = ({ children }) => {
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

    return (
        <SettingsContext.Provider value={{ settings, loadSettings, saveSetting }}>
            {children}
        </SettingsContext.Provider>
    );
};

export { SettingsProvider, useSettings, difficulties };
