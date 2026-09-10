import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
  },

  savedTimersContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 10,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 15,
  },

  addText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
  },

  emptyText: {
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
  },

  playContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingBottom: '9%',
    paddingTop: 10,
  },

  playButton: {
    width: 72,
    height: 72,

    borderRadius: 72/2,

    backgroundColor: COLORS.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    color: COLORS.white,
    fontSize: 27,
    textAlign:'center'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },

  modal: {
    backgroundColor: '#171717',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    padding: 25,
    paddingBottom: 40,
    height: '80%',
  },

  modalTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },

  input: {
    height: 50,

    borderRadius: 10,

    backgroundColor: COLORS.surface,

    color: COLORS.white,

    paddingHorizontal: 15,
    marginBottom: 10,
  },

  modalButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },

  cancelButton: {
    flex: 1,

    height: 50,

    borderRadius: 10,

    backgroundColor: COLORS.surfaceLight,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 6,
  },

  saveButton: {
    flex: 1,

    height: 50,

    borderRadius: 10,

    backgroundColor: COLORS.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 6,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },

  savedTimersContent: {
    paddingBottom: 10,
  },
});
