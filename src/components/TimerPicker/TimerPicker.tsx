import React, { forwardRef, useImperativeHandle } from 'react';
import { TimeDuration } from '../../utils/time';
import { View } from 'react-native';
import { styles } from './TimerPicker.styles';
import { TimerPicker as RNTImerPicker } from 'react-native-timer-picker';

export interface TimerPickerRef {
  setValue: (value: TimeDuration) => void;
}

interface Props {
  value: TimeDuration;
  onChange: (value: TimeDuration) => void;
}

const TimerPicker = forwardRef<TimerPickerRef, Props>(
  ({ value, onChange }, ref) => {
    const pickerRef = React.useRef<any>(null);
    useImperativeHandle(ref, () => ({
      setValue: newValue => {
        pickerRef.current?.setValue(newValue, { animated: true });
      },
    }));

    return (
      <View style={styles.container}>
        <RNTImerPicker
          ref={pickerRef}
          hideDays
          initialValue={{
            hours: value.hours,
            minutes: value.minutes,
            seconds: value.seconds,
          }}
          onDurationChange={duration => {
            onChange({
              hours: duration.hours,
              minutes: duration.minutes,
              seconds: duration.seconds,
            });
          }}
          hourLabel=":"
          minuteLabel=":"
          secondLabel=""
          styles={{
            theme: 'dark',
            pickerItem: {fontSize: 48},
            selectedPickerItem: {fontSize: 48},
            pickerLabel: {fontSize: 48},
            pickerLabelGap:10,
            pickerContainer: {
                paddingHorizontal: 10,
            }
          }}
        />
      </View>
    );
  },
);

TimerPicker.displayName = 'TimerPicker';

export default TimerPicker;
