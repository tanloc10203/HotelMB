import { useTheme } from "@/contexts/ThemeContext";
import { scale, statusBarHeight, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    header: {
      backgroundColor: theme.colors.secondary,
      paddingVertical: statusBarHeight(15),
      justifyContent: "center",
      alignItems: "center",
    },
    segment: {},
    pt15: {
      marginTop: verticalScale(15),
    },
    pt30: {
      marginTop: verticalScale(30),
    },
    p15: {
      paddingHorizontal: scale(15),
    },
    pb15: {
      paddingBottom: scale(15),
    },
  });
};

export default useStyles;
