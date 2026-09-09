import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../theme";

export const styles = StyleSheet.create({
   button: {
    width: SIZES.button,
    height: SIZES.button,
    borderRadius: SIZES.button / 2,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
   },
   secondaryButton: {
    backgroundColor: COLORS.surfaceLight,
   },
    disabledButton: {
        opacity: 0.5,
    },
    icon: {
        color: COLORS.white,
        fontSize: 27,
    },
    seconsaryIcon: {
        fontSize: 24,
    },
});
