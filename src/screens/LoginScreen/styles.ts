import { useTheme } from "@/contexts/ThemeContext";
import { scale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    container: {
      paddingHorizontal: scale(20),
    },
    bgWhite: {
      backgroundColor: theme.colors.white,
    },
    with100: {
      width: "100%",
    },
    title: { fontSize: scale(30), fontWeight: "bold", marginRight: scale(10) },
    image: {
      width: scale(42),
      height: scale(39),
    },
    wrapTitle: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: { width: scale(30), height: scale(30) },
    textBottom: {
      marginTop: scale(15),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
  });
};

export default useStyles;
