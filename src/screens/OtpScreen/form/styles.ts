import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = (error?: string) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: {},
    cell: {
      width: scale(45),
      height: verticalScale(47),
      borderRadius: scale(12),
      borderWidth: 1,
      borderColor: !error ? theme.colors.gray : theme.colors.error,
      textAlign: "center",
      lineHeight: verticalScale(47),
      fontSize: scale(22),
      color: !error ? theme.colors.gray : theme.colors.error,
    },
    focusCell: {
      borderColor: theme.colors.black,
    },
    resendWrap: {
      marginTop: verticalScale(50),
      flexDirection: "row",
      justifyContent: "center",
    },
    resendText: {
      fontSize: scale(13),
      color: theme.colors.black,
      fontWeight: "400",
    },
    resend: {
      fontSize: scale(13),
      color: theme.colors.black,
      fontWeight: "700",
    },
    helperWrap: {
      marginTop: scale(35),
    },
    helperText: {
      textAlign: "center",
      color: theme.colors.error,
    },
    contentStyle: {
      paddingVertical: verticalScale(4),
      backgroundColor: theme.colors.black,
    },
    labelStyle: {
      color: theme.colors.white,
      fontSize: 17,
    },
    colorBlack: {
      color: theme.colors.black,
    },
  });
};

export default useStyles;
