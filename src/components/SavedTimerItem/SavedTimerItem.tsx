import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './SavedTimerItem.styles';
import { formatTimer } from '../../utils/time';

interface Props {
    name: string;
    duration: number;
    onPress: () => void;
}

const SavedTimerItem = ({ name, duration, onPress }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
        <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.duration}>{formatTimer(duration)}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default SavedTimerItem