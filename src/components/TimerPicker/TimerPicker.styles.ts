import {
  StyleSheet,
} from 'react-native';

export const styles =
  StyleSheet.create({
    container: {
      height: 190,

      alignItems: 'center',
      justifyContent: 'center',

      position: 'relative',

      overflow: 'hidden',
    },

    topFade: {
      position: 'absolute',

      top: 0,
      left: 0,
      right: 0,

      height: 65,

      zIndex: 10,
    },

    bottomFade: {
      position: 'absolute',

      bottom: 0,
      left: 0,
      right: 0,

      height: 65,

      zIndex: 10,
    },
  });
