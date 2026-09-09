import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../theme';

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "20%",
  },
  circle: {
    width: SIZES.circle,
    height: SIZES.circle,
    borderRadius: '90%',
    borderWidth: 3,
    borderColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f0f0f',
    shadowOpacity: 0.45,
    shadowRadius: 25,
    elevation: 15,
    shadowColor:'yellow',
  },
  tick: {
    position: 'absolute',
    width: 2,
    height: 5,
    borderRadius: 2,
    backgroundColor: '#343434',
  },
  dotContainer: {
    position: 'absolute',
    width: SIZES.circle,
    height: SIZES.circle,
    alignItems: 'center',
  },
  dot: {
    width:7,
    height:7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  whiteTime: {
    color: COLORS.white,
    fontSize: 50,
    fontWeight: '300',
  },
  redTime: {
    color: COLORS.primary,
    fontSize: 50,
    fontWeight: '300',
  }
});
