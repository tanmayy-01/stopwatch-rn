import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        height: 64,
        marginHorizontal: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: COLORS.surface,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    name: {
        color: COLORS.white,
        fontSize: 16,
    },
    duration: {
        color: COLORS.lightGray,
        fontSize: 15,
    }
})