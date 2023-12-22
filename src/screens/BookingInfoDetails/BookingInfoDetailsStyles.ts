import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    card: {
      marginHorizontal: SPACING,
      marginBottom: verticalScale(20),
    },
    spacing: { marginHorizontal: SPACING },
    container: {
      paddingBottom: verticalScale(30),
    },
    wrapperText: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    mb: {
      marginBottom: verticalScale(8),
    },
    textRight: {
      fontWeight: "bold",
    },
    textLeft: {
      ...textStyles.H5,
      fontWeight: "bold",
      color: ColorSchemas.mutedV2,
    },
    divider: {
      borderStyle: "dashed",
      borderBottomColor: ColorSchemas.grey,
      borderBottomWidth: 1,
      marginHorizontal: SPACING,
    },
    roundedBottom: {
      padding: scale(20),
      borderRadius: scale(13),
      backgroundColor: "#fff",
    },
    mt: {
      marginTop: verticalScale(16),
    },
  });
};

export default useStyles;
