import React, { useRef, useState } from 'react';

import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './Timer.styles';

import { useTimer } from '../../context/TimerContext';

import TimerPicker, {
  TimerPickerRef,
} from '../../components/TimerPicker/TimerPicker';

import {
  durationToMilliseconds,
  millisecondsToDuration,
  TimeDuration,
} from '../../utils/time';

import SavedTimerItem from '../../components/SavedTimerItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

const Timer = ({ navigation }: any): React.JSX.Element => {
  const { savedTimers, addSavedTimer, startTimer, removeSavedTimer } =
    useTimer();

  const pickerRef = useRef<TimerPickerRef>(null);

  const addPickerRef = useRef<TimerPickerRef>(null);

  const [duration, setDuration] = useState<TimeDuration>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [newTimerDuration, setNewTimerDuration] = useState<TimeDuration>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [timerName, setTimerName] = useState('');

  /*
   * START TIMER
   */

  const handleStart = () => {
    const milliseconds = durationToMilliseconds(duration);

    if (milliseconds <= 0) {
      Alert.alert('Invalid Timer', 'Please select a duration.');

      return;
    }

    startTimer(milliseconds);

    navigation.navigate('Stopwatch', {
      timerMode: true,
    });
  };

  /*
   * SELECT SAVED TIMER
   */

  const handleSelectSavedTimer = (timer: { duration: number }) => {
    const selected = millisecondsToDuration(timer.duration);

    setDuration(selected);

    pickerRef.current?.setValue(selected);
  };

  /*
   * REMOVE SAVED TIMER
   */

  const handleRemoveTimer = (id: string, name: string) => {
    Alert.alert('Remove Timer', `Remove "${name}"?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          removeSavedTimer(id);
        },
      },
    ]);
  };

  /*
   * OPEN CREATE TIMER MODAL
   */

  const handleOpenModal = () => {
    setTimerName('');

    const initialValue: TimeDuration = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    setNewTimerDuration(initialValue);

    setModalVisible(true);

    setTimeout(() => {
      addPickerRef.current?.setValue(initialValue);
    }, 100);
  };

  /*
   * SAVE TIMER
   */

  const handleSaveTimer = async () => {
    if (!timerName.trim()) {
      Alert.alert('Name required', 'Please enter a timer name.');

      return;
    }

    const milliseconds = durationToMilliseconds(newTimerDuration);

    if (milliseconds <= 0) {
      Alert.alert('Invalid duration', 'Please select a duration.');

      return;
    }

    await addSavedTimer({
      id: Date.now().toString(),
      name: timerName.trim(),
      duration: milliseconds,
    });

    setModalVisible(false);
    setTimerName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* MAIN CONTENT */}

      <View style={styles.content}>
        {/* TIMER PICKER */}

        <TimerPicker ref={pickerRef} value={duration} onChange={setDuration} />

        {/* FREQUENTLY USED */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Frequently used timers</Text>

          <TouchableOpacity activeOpacity={0.7} onPress={handleOpenModal}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* SAVED TIMERS */}

        <FlatList
          data={savedTimers}
          style={{paddingHorizontal:20}}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SavedTimerItem
              name={item.name}
              duration={item.duration}
              onPress={() => handleSelectSavedTimer(item)}
              onRemove={() => handleRemoveTimer(item.id, item.name)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No saved timers</Text>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.savedTimersContent}
        />

        {/* PLAY BUTTON */}

        <View style={styles.playContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.playButton}
            onPress={handleStart}
          >
            {/* <Text style={styles.playIcon}>▶</Text> */}
            <Ionicons
                    name={'play'}
                    size={24}
                    color={'white'}
                  />
          </TouchableOpacity>
        </View>
      </View>

      {/* CREATE TIMER MODAL */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Create Timer</Text>

            <TextInput
              value={timerName}
              onChangeText={setTimerName}
              placeholder="Timer name"
              placeholderTextColor="#777"
              style={styles.input}
            />

            <TimerPicker
              ref={addPickerRef}
              value={newTimerDuration}
              onChange={setNewTimerDuration}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveTimer}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Timer;
