import { SPACING, scale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    header: {
      fontSize: scale(18),
      fontWeight: "bold",
    },
    title: {
      fontSize: 24,
    },
    wrapperActions: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: SPACING,
      marginVertical: scale(16),
    },
  });
};

export default useStyles;
