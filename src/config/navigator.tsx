import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { SinglePlayerGame, Home, Settings } from "@screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@utils";

export type StackNavParams = {
    Home: undefined;
    SinglePlayerGame: undefined;
    Settings: undefined;
};

const Stack = createStackNavigator<StackNavParams>();

const screenOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.purple,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    headerTintColor: colors.lightGreen,
    headerTitleStyle: {
        fontFamily: "DeliusUnicase_700Bold",
        fontSize: 20
    },
    headerBackTitleStyle: {
        fontFamily: "DeliusUnicase_400Regular",
        fontSize: 14
    }
};

const Navigator = (): ReactElement => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="SinglePlayerGame"
                        component={SinglePlayerGame}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Settings" component={Settings} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Navigator;
