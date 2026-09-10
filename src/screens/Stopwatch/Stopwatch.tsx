import React, { useEffect, useRef, useState } from 'react';

import { FlatList, Text, View } from 'react-native';

import { styles } from './Stopwatch.styles';
import { useTimer } from '../../context/TimerContext';
import { formatStopwatch, formatTimer } from '../../utils/time';
import CircularTimer from '../../components/CircularTimer';
import PrimaryButton from '../../components/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: any;
  route: {
    params?: {
      timerMode?: boolean;
    };
  };
}

interface Lap {
  id: number;
  total: number;
  duration: number;
}

const Stopwatch = ({ navigation, route }: Props): React.JSX.Element => {
  // const timerMode = route.params?.timerMode === true;


  
  const { activeTimer, updateRemaining, pauseTimer, resumeTimer, cancelTimer } =
  useTimer();
  const timerMode =
  route.params?.timerMode === true && activeTimer !== null;
  console.log('timer', timerMode)

  /*
   * STOPWATCH
   */

  const [elapsed, setElapsed] = useState(0);

  const [running, setRunning] = useState(false);

  const [laps, setLaps] = useState<Lap[]>([]);

  const stopwatchStartRef = useRef<number | null>(null);

  /*
   * TIMER
   */

  const timerEndRef = useRef<number | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /*
   * STOPWATCH LOOP
   */

  useEffect(() => {
    if (timerMode || !running) {
      return;
    }

    if (stopwatchStartRef.current === null) {
      stopwatchStartRef.current = Date.now() - elapsed;
    }

    intervalRef.current = setInterval(() => {
      if (stopwatchStartRef.current === null) {
        return;
      }

      const current = Date.now() - stopwatchStartRef.current;

      setElapsed(current);
    }, 30);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, timerMode]);

  /*
   * TIMER LOOP
   */

  useEffect(() => {
    if (!timerMode || !activeTimer || activeTimer.status !== 'running') {
      return;
    }

    timerEndRef.current = Date.now() + activeTimer.remaining;

    setRunning(true);

    intervalRef.current = setInterval(() => {
      if (timerEndRef.current === null) {
        return;
      }

      const remaining = Math.max(0, timerEndRef.current - Date.now());

      updateRemaining(remaining);

      if (remaining <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        setRunning(false);
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerMode, activeTimer?.status]);

  /*
   * STOPWATCH START / PAUSE
   */

  const handleStopwatchPress = () => {
    if (running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setRunning(false);

      return;
    }

    stopwatchStartRef.current = Date.now() - elapsed;

    setRunning(true);
  };

  /*
   * RESET
   */

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setElapsed(0);

    setLaps([]);

    setRunning(false);

    stopwatchStartRef.current = null;
  };

  /*
   * LAP
   */

  const handleLap = () => {
    const previousTotal = laps.length > 0 ? laps[laps.length - 1].total : 0;

    const lapDuration = elapsed - previousTotal;

    setLaps(previous => [
      ...previous,

      {
        id: Date.now(),
        total: elapsed,
        duration: lapDuration,
      },
    ]);
  };

  /*
   * TIMER PAUSE / RESUME
   */

  const handleTimerPause = () => {
    if (!activeTimer) {
      return;
    }

    if (activeTimer.status === 'running') {
      const remaining = Math.max(
        0,
        (timerEndRef.current ?? Date.now()) - Date.now(),
      );

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      updateRemaining(remaining);

      pauseTimer();

      timerEndRef.current = null;

      setRunning(false);
    } else {
      timerEndRef.current = Date.now() + activeTimer.remaining;

      resumeTimer();

      setRunning(true);
    }
  };

  /*
   * TIMER CANCEL
   */

  const handleCancelTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    timerEndRef.current = null;

    cancelTimer();

    navigation.navigate('Timer');
  };

  const stopwatchValue = formatStopwatch(elapsed);

  const timerValue = activeTimer
    ? formatTimer(activeTimer.remaining)
    : '00:00:00';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CircularTimer
          value={timerMode ? timerValue : stopwatchValue}
          running={running}
        />
        {laps.length > 0 && (
          <View style={styles.lapRowLabelContainer}>
            <Text style={styles.lapTextLabel}>Lap</Text>

            <Text style={[styles.lapTextLabel,{}]}>LapTime</Text>

            <Text style={styles.lapTextLabel}>Total</Text>
          </View>
        )}
        <FlatList
          data={laps.slice().reverse()}
          keyExtractor={item => item.id.toString()}
          style={styles.lapsContainer}
          contentContainerStyle={styles.lapsContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: lap, index }) => (
            <View style={styles.lapRow}>
              <Text style={styles.lapText}>{laps.length - index}</Text>

              <Text
                style={[
                  styles.lapText,
                  { width: '22%', textAlign: 'right' },
                ]}
              >
                +{formatStopwatch(lap.duration)}
              </Text>

              <Text style={styles.lapText}>{formatStopwatch(lap.total)}</Text>
            </View>
          )}
        />

        {timerMode ? (
          <View style={[styles.timerControls]}>
            <PrimaryButton icon="✕" secondary onPress={handleCancelTimer} />

            <PrimaryButton
              icon={running ? 'Ⅱ' : '▶'}
              onPress={handleTimerPause}
            />
          </View>
        ) : (
          <>
            {running && (
              <View  style={[
                  styles.actionRow,
                  {
                    bottom: '4%',
                    position: 'absolute',
                  },
                ]}>
                <PrimaryButton icon="↻" secondary disabled onPress={() => {}} />

                <PrimaryButton icon="⚑" secondary onPress={handleLap} />
              </View>
            )}

            {!running && elapsed > 0 && (
              <View
                style={[
                  styles.actionRow,
                  {
                    bottom: '4%',
                    position: 'absolute',
                  },
                ]}
              >
                <PrimaryButton icon="↻" secondary onPress={handleReset} />

                <PrimaryButton icon="⚑" secondary disabled onPress={() => {}} />
              </View>
            )}

            <View style={styles.playContainer}>
              <PrimaryButton
                icon={running ? 'Ⅱ' : '▶'}
                onPress={handleStopwatchPress}
              />
            </View>

            {/* <View
              style={
                styles.lapsContainer
              }>
              {laps
                .slice()
                .reverse()
                .map(
                  (
                    lap,
                    index,
                  ) => (
                    <View
                      key={
                        lap.id
                      }
                      style={
                        styles.lapRow
                      }>
                      <Text
                        style={
                          styles.lapText
                        }>
                        {laps.length -
                          index}
                      </Text>

                      <Text
                        style={
                          styles.lapText
                        }>
                        +
                        {formatStopwatch(
                          lap.duration,
                        )}
                      </Text>

                      <Text
                        style={
                          styles.lapText
                        }>
                        {formatStopwatch(
                          lap.total,
                        )}
                      </Text>
                    </View>
                  ),
                )}
            </View> */}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Stopwatch;
