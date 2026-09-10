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
    alignItems:'center',
    paddingHorizontal: '5%'
  },
  playContainer: {
    marginBottom: '10%',
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row', 
    width: '80%',
    justifyContent: 'space-between',
    marginTop: '2%',


  },
  timerControls: {
    flexDirection: 'row',
    gap: 25,
    marginTop: 45,
  },
  lapsContainer: {
    width: '100%',
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: "2%",
    borderBottomWidth: 1,
    borderBottomColor: '#161616',
  },
  lapRowLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:"10%",
    width:"100%",
    alignContent:'center'
  },
  lapText: {
    color: COLORS.white,
    fontSize: 14,
  },
  lapTextLabel: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
  lapsContent: {
    paddingBottom: 20,
  }
});
