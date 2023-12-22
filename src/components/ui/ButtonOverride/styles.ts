import { useTheme } from "@/contexts/ThemeContext";
import { verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = (color?: string) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    contentStyle: {
      paddingVertical: verticalScale(4),
      backgroundColor: theme.colors.black,
    },
    labelStyle: {
      color: theme.colors.white,
      fontSize: 17,
    },
    colorBlack: {
      color: color ?? theme.colors.black,
    },
  });
};

export default useStyles;
