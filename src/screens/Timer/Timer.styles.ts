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
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginHorizontal: 15,

    marginTop: 30,
    marginBottom: 10,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 12,
  },

  addText: {
    color: COLORS.primary,
    fontSize: 12,
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

    paddingBottom: 20,
    paddingTop: 10,
  },

  playButton: {
    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor: COLORS.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    color: COLORS.white,
    fontSize: 22,

    marginLeft: 3,
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
});
