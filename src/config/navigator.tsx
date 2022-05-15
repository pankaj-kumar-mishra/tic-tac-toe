import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SinglePlayerGame, Home } from "@screens";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type StackNavParams = {
    Home: undefined;
    SinglePlayerGame: undefined;
};

const Stack = createStackNavigator<StackNavParams>();

const Navigator = (): ReactElement => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="SinglePlayerGame" component={SinglePlayerGame} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Navigator;
