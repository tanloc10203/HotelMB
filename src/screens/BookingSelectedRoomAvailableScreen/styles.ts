import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    item: {
      margin: SPACING,
      backgroundColor: ColorSchemas.white,
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(12),
      borderRadius: scale(10),
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
    },
    itemText: {
      fontWeight: "bold",
    },
    textPrice: {
      color: ColorSchemas.blue,
      fontSize: scale(14),
    },
    colorCheckBox: {
      color: ColorSchemas.blue,
    },
  });
};

export default useStyles;
