import { StyleSheet } from "react-native";
import { colors } from "@utils";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    field: {
        marginBottom: 20
    },
    label: {
        color: colors.lightGreen,
        fontSize: 22
    },
    choices: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        marginHorizontal: -5
    },
    choice: {
        backgroundColor: colors.lightGreen,
        padding: 12,
        margin: 5
    },
    choiceText: {
        color: colors.darkPurple,
        fontSize: 16
    },
    switchField: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default styles;
