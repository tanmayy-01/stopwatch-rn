import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './SavedTimerItem.styles';
import { formatTimer } from '../../utils/time';

interface Props {
  name: string;
  duration: number;
  onPress: () => void;
  onRemove: () => void;
}

const SavedTimerItem = ({
  name,
  duration,
  onPress,
  onRemove,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* Timer content */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.timerButton}
      >
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.duration}>
          {formatTimer(duration)}
        </Text>
      </TouchableOpacity>

      {/* Cross / Remove */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onRemove}
        style={styles.removeButton}
      >
        <Text style={styles.removeIcon}>
          ×
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SavedTimerItem;
