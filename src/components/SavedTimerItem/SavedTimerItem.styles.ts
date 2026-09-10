import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: 6,

    minHeight: 42,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#1D1D1D',

    borderRadius: 14,

    overflow: 'hidden',
  },

  timerButton: {
    flex: 1,

    minHeight: 42,

    paddingHorizontal: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  name: {
    color: COLORS.white,

    fontSize: 11,
    fontWeight: '500',
  },

  duration: {
    color: '#AAAAAA',

    fontSize: 10,
  },

  removeButton: {
    width: 40,
    height: 42,

    alignItems: 'center',
    justifyContent: 'center',
  },

  removeIcon: {
    color: '#888888',

    fontSize: 22,
    fontWeight: '300',

    lineHeight: 24,
  },
});
