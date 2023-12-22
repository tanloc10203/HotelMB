import { ColorSchemas } from "@/constants/colors";
import { SPACING, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    head: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: verticalScale(20),
      marginBottom: verticalScale(14),
    },
    headRight: {
      ...textStyles.H5,
      color: ColorSchemas.blue,
      fontWeight: "bold",
    },
    headLeft: {
      ...textStyles.H4,
      fontWeight: "bold",
    },
    spacing: {
      paddingHorizontal: SPACING,
    },
  });
};

export default useStyles;
