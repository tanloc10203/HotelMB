import { ColorSchemas } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      padding: SPACING,
    },
    actions: {
      marginTop: verticalScale(10),
      justifyContent: "space-between",
      flex: 1,
      flexDirection: "row",
    },
    groupInput: {
      position: "relative",
      height: 50,
      width: "85%",
      elevation: 3,
    },
    input: {
      paddingHorizontal: scale(14),
      paddingVertical: verticalScale(9),
      paddingLeft: verticalScale(40),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: theme.colors.gray,
      fontSize: scale(15),
      color: theme.colors.black,
    },
    iconLeft: {
      position: "absolute",
      left: scale(14),
      top: 25 / 2,
    },
    icon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: ColorSchemas.blue,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};

export default useStyles;
