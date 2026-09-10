import React, {
  forwardRef,
  useImperativeHandle,
} from 'react';

import {
  View,
} from 'react-native';



import { TimeDuration } from '../../utils/time';

import { styles } from './TimerPicker.styles';

import {
  TimerPicker as RNTimerPicker,
} from 'react-native-timer-picker';
import LinearGradient from 'react-native-linear-gradient';

export interface TimerPickerRef {
  setValue: (
    value: TimeDuration,
  ) => void;
}

interface Props {
  value: TimeDuration;
  onChange: (
    value: TimeDuration,
  ) => void;
}

const TimerPicker = forwardRef<
  TimerPickerRef,
  Props
>(
  (
    {
      value,
      onChange,
    },
    ref,
  ) => {
    const pickerRef =
      React.useRef<any>(null);

    useImperativeHandle(
      ref,
      () => ({
        setValue: newValue => {
          pickerRef.current?.setValue(
            newValue,
            {
              animated: true,
            },
          );
        },
      }),
    );

    return (
      <View style={styles.container}>

        {/* TIMER PICKER */}

        <RNTimerPicker
          ref={pickerRef}
          hideDays
          initialValue={{
            hours: value.hours,
            minutes: value.minutes,
            seconds: value.seconds,
          }}
          onDurationChange={
            duration => {
              onChange({
                hours: duration.hours,
                minutes: duration.minutes,
                seconds: duration.seconds,
              });
            }
          }
          hourLabel=":"
          minuteLabel=":"
          secondLabel=""
          styles={{
            theme: 'dark',

            pickerItem: {
              fontSize: 48,
            },

            selectedPickerItem: {
              fontSize: 48,
            },

            pickerLabel: {
              fontSize: 48,
            },

            pickerLabelGap: 10,

            pickerContainer: {
              paddingHorizontal: 10,
            },
          }}
        />

        {/* TOP FADE */}

        <LinearGradient
          pointerEvents="none"
          colors={[
            '#000000',
            'rgba(0,0,0,0.85)',
            'rgba(0,0,0,0)',
          ]}
          locations={[
            0,
            0.45,
            1,
          ]}
          style={styles.topFade}
        />

        {/* BOTTOM FADE */}

        <LinearGradient
          pointerEvents="none"
          colors={[
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0.85)',
            '#000000',
          ]}
          locations={[
            0,
            0.55,
            1,
          ]}
          style={styles.bottomFade}
        />

      </View>
    );
  },
);

TimerPicker.displayName =
  'TimerPicker';

export default TimerPicker;
