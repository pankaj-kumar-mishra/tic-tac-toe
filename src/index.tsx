import "react-native-gesture-handler";
import React, { ReactElement } from "react";
import Navigator from "@config/navigator";
import { AppBootstrap } from "@components";

const App = (): ReactElement => {
    return (
        <AppBootstrap>
            <Navigator />
        </AppBootstrap>
    );
};

export default App;
