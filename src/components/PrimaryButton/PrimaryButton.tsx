import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../theme";
import { styles } from "./PrimaryButton.styles";
import Ionicons from "@react-native-vector-icons/ionicons";


interface Props {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
  iconSize?: number;
  iconColor?: string;
}

const PrimaryButton: React.FC<Props> = ({
  icon,
  onPress,
  disabled = false,
  secondary = false,
  iconSize = 24,
  iconColor,
}) => {
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
      <Ionicons
        name={icon}
        size={iconSize}
        color={iconColor ?? (secondary ? '#000000' : '#FFFFFF')}
      />
    </TouchableOpacity>
  );
};




export default PrimaryButton;