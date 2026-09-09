import { View, Text, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { styles } from './CircularTimer.styles';
import { SIZES } from '../../theme';

interface Props {
  value: string;
  running: boolean;
}

const CircularTimer = ({ value, running }: Props): React.JSX.Element => {
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!running) return;
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [running, rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const separatorIndex = value.indexOf(':');

  return (
    <View style={styles.wrapper}>
      <View style={styles.circle}>
        {Array.from({ length: 60 }).map((_, index) => {
          const angle = index * 6;
          // const angle = (index * 6) * (Math.PI / 180);

          return (
            <View
              key={index}
              style={[
                styles.tick,
                {
                  transform: [
                    { rotate: `${angle}deg` },
                    { translateY: -(SIZES.circle / 2 - 15) },
                  ],
                },
              ]}
            />
          );
        })}

        {/* <Animated.View style={[styles.dotContainer, { transform: [{ rotate }] }]}>
            <View style={styles.dot} />
        </Animated.View> */}

        <View style={styles.timeContainer}>
          {separatorIndex !== -1 ? (
            <>
              <Text style={styles.whiteTime}>
                {value.substring(0, separatorIndex + 1)}
              </Text>
              <Text style={styles.redTime}>
                {value.substring(separatorIndex + 1)}
              </Text>
            </>
          ) : (
            <Text style={styles.whiteTime}>{value}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default CircularTimer;
