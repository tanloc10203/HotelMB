import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = (error?: boolean) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    input: {
      paddingHorizontal: scale(14),
      paddingVertical: verticalScale(9),
      paddingRight: verticalScale(40),
      borderRadius: scale(10),
      borderWidth: error ? 2 : 1,
      borderColor: error ? theme.colors.error : theme.colors.gray,
      fontSize: scale(15),
      color: theme.colors.black,
    },
    label: {
      fontSize: scale(13),
      fontWeight: "normal",
      marginBottom: verticalScale(6),
      color: error ? theme.colors.error : theme.colors.black,
    },
    iconRight: {
      position: "absolute",
      right: scale(14),
      top: "30%",
    },
    placeholder: {
      color: theme.colors.gray,
    },
  });
};

export default useStyles;
