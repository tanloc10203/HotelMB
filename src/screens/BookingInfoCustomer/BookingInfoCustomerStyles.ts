import { SPACING, scale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    container: {
      paddingHorizontal: SPACING,
    },
    book: {
      padding: SPACING,
      borderTopLeftRadius: scale(15),
      borderTopRightRadius: scale(15),
    },
    bookButton: {
      paddingHorizontal: scale(40),
      paddingVertical: scale(4),
    },
    button: {
      borderRadius: scale(40),
    },
  });
};

export default useStyles;
