import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignContent: 'center',
    alignItems:'center'
  },
  playContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row', 
    width: 180,
    justifyContent: 'space-between',
    marginTop: 25,
    // backgroundColor: 'yellow'
  },
  timerControls: {
    flexDirection: 'row',
    gap: 25,
    marginTop: 45,
  },
  lapsContainer: {
    width: '90%',
    marginTop: 35,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#161616',
  },
  lapText: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
  lapsContent: {
    paddingBottom: 20,
  }
});
