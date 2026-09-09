import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },

  playButton: {
    width: 74,
    height: 74,

    borderRadius: 37,

    backgroundColor:
      COLORS.primary,

    alignItems: 'center',
    justifyContent: 'center',

    alignSelf: 'center',

    marginTop: 25,
  },

  playIcon: {
    color: COLORS.white,
    fontSize: 26,
  },

  sectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent:
      'space-between',

    marginHorizontal: 30,

    marginTop: 45,
    marginBottom: 15,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 15,
  },

  addText: {
    color: COLORS.primary,
    fontSize: 15,
  },

  emptyText: {
    color: COLORS.gray,

    textAlign: 'center',

    marginTop: 20,
  },

  modalOverlay: {
    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.8)',

    justifyContent: 'flex-end',
  },

  modal: {
    backgroundColor:
      '#171717',

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

    backgroundColor:
      COLORS.surface,

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

    backgroundColor:
      COLORS.surfaceLight,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 6,
  },

  saveButton: {
    flex: 1,

    height: 50,

    borderRadius: 10,

    backgroundColor:
      COLORS.primary,

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