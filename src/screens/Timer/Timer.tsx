import React, {
  useRef,
  useState,
} from 'react';

import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';



import { styles } from './Timer.styles';
import { useTimer } from '../../context/TimerContext';
import TimerPicker, { TimerPickerRef } from '../../components/TimerPicker/TimerPicker';
import { durationToMilliseconds, millisecondsToDuration, TimeDuration } from '../../utils/time';
import SavedTimerItem from '../../components/SavedTimerItem';

const Timer = ({
  navigation,
}: any): React.JSX.Element => {
  const {
    savedTimers,
    addSavedTimer,
    startTimer,
  } = useTimer();

  const pickerRef =
    useRef<TimerPickerRef>(
      null,
    );

  const addPickerRef =
    useRef<TimerPickerRef>(
      null,
    );

  const [duration, setDuration] =
    useState<TimeDuration>({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  const [
    newTimerDuration,
    setNewTimerDuration,
  ] = useState<TimeDuration>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [
    modalVisible,
    setModalVisible,
  ] = useState(false);

  const [
    timerName,
    setTimerName,
  ] = useState('');

  const handleStart = () => {
    const milliseconds =
      durationToMilliseconds(
        duration,
      );

    if (milliseconds <= 0) {
      Alert.alert(
        'Invalid Timer',
        'Please select a duration.',
      );

      return;
    }

    startTimer(
      milliseconds,
    );

    navigation.navigate(
      'Stopwatch',
      {
        timerMode: true,
      },
    );
  };

  const handleSelectSavedTimer =
    (timer: {
      duration: number;
    }) => {
      const selected =
        millisecondsToDuration(
          timer.duration,
        );

      setDuration(selected);

      pickerRef.current?.setValue(
        selected,
      );
    };

  const handleOpenModal = () => {
    setTimerName('');

    const initialValue: TimeDuration =
      {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

    setNewTimerDuration(
      initialValue,
    );

    setModalVisible(true);

    setTimeout(() => {
      addPickerRef.current?.setValue(
        initialValue,
      );
    }, 100);
  };

  const handleSaveTimer =
    async () => {
      if (!timerName.trim()) {
        Alert.alert(
          'Name required',
          'Please enter a timer name.',
        );

        return;
      }

      const milliseconds =
        durationToMilliseconds(
          newTimerDuration,
        );

      if (milliseconds <= 0) {
        Alert.alert(
          'Invalid duration',
          'Please select a duration.',
        );

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
    <SafeAreaView
      style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }>
        {/* TIMER PICKER */}

        <TimerPicker
          ref={pickerRef}
          value={duration}
          onChange={setDuration}
        />

        {/* PLAY */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.playButton}
          onPress={handleStart}>
          <Text
            style={styles.playIcon}>
            ▶️
          </Text>
        </TouchableOpacity>

        {/* HEADER */}

        <View
          style={
            styles.sectionHeader
          }>
          <Text
            style={
              styles.sectionTitle
            }>
            Frequently used timers
          </Text>

          <TouchableOpacity
            onPress={
              handleOpenModal
            }>
            <Text
              style={styles.addText}>
              Add
            </Text>
          </TouchableOpacity>
        </View>

        {/* SAVED TIMERS */}

        {savedTimers.map(
          timer => (
            <SavedTimerItem
              key={timer.id}
              name={timer.name}
              duration={
                timer.duration
              }
              onPress={() =>
                handleSelectSavedTimer(
                  timer,
                )
              }
            />
          ),
        )}

        {savedTimers.length ===
          0 && (
          <Text
            style={
              styles.emptyText
            }>
            No saved timers
          </Text>
        )}
      </ScrollView>

      {/* CREATE TIMER */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisible(false)
        }>
        <View
          style={
            styles.modalOverlay
          }>
          <View
            style={styles.modal}>
            <Text
              style={
                styles.modalTitle
              }>
              Create Timer
            </Text>

            <TextInput
              value={timerName}
              onChangeText={
                setTimerName
              }
              placeholder="Timer name"
              placeholderTextColor="#777"
              style={styles.input}
            />

            <TimerPicker
              ref={addPickerRef}
              value={
                newTimerDuration
              }
              onChange={
                setNewTimerDuration
              }
            />

            <View
              style={
                styles.modalButtons
              }>
              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={() =>
                  setModalVisible(
                    false,
                  )
                }>
                <Text
                  style={
                    styles.buttonText
                  }>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.saveButton
                }
                onPress={
                  handleSaveTimer
                }>
                <Text
                  style={
                    styles.buttonText
                  }>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};



export default Timer;