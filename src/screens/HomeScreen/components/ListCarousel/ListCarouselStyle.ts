import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils/scale";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const useStyles = () => {
  return StyleSheet.create({
    child: { width },
    imgBackground: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT / 2,
      padding: 0,
    },
  });
};

export default useStyles;
