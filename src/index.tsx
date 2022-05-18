import "react-native-gesture-handler";
import React, { ReactElement } from "react";
import Navigator from "@config/navigator";
import { AppBootstrap } from "@components";
import { SettingsProvider } from "@contexts/settings.context";

const App = (): ReactElement => {
    return (
        <AppBootstrap>
            <SettingsProvider>
                <Navigator />
            </SettingsProvider>
        </AppBootstrap>
    );
};

export default App;
