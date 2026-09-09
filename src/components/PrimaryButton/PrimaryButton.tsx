import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../theme";
import { styles } from "./PrimaryButton.styles";


interface Props {
    icon: string;
    onPress: () => void;
    disabled?: boolean;
    secondary?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ icon, onPress, disabled = false, secondary = false }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            onPress={onPress}
            style={[
                styles.button,
                secondary && styles.secondaryButton,
                disabled && styles.disabledButton,
            ]}
        >
            <Text
             style={[
                styles.icon,
                secondary && styles.seconsaryIcon,
             ]}
            >{icon}</Text>
        </TouchableOpacity>
    );
};


export default PrimaryButton;