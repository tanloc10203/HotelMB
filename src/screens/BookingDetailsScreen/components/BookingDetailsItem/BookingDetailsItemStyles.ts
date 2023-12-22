import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    surface: {
      marginHorizontal: SPACING,
      marginVertical: scale(8),
      padding: scale(20),
      borderRadius: scale(13),
      backgroundColor: ColorSchemas.white,
    },
    wrapper: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row",
      gap: scale(15),
    },
    image: {
      width: "100%",
      height: scale(150),
      borderRadius: scale(4),
    },
    wrapperContent: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row",
    },

    wrapperTitle: {
      marginVertical: verticalScale(10),
      flexDirection: "row",
      justifyContent: "space-between",
    },

    title: {
      fontWeight: "bold",
      fontSize: scale(14),
    },

    desc: {
      marginTop: verticalScale(2),
      color: ColorSchemas.muted,
      fontStyle: "italic",
      fontSize: scale(13),
      maxWidth: scale(110),
      minWidth: scale(100),
    },
    price: {
      color: ColorSchemas.blue,
      fontWeight: "bold",
      fontSize: scale(15),
    },
    subPrice: {
      color: ColorSchemas.muted,
      fontWeight: "bold",
      fontSize: scale(12),
      textAlign: "right",
    },

    galleryCard: {
      width: scale(90),
      backgroundColor: ColorSchemas.mutedDark,
      height: verticalScale(70),
      borderRadius: scale(8),
      borderWidth: 1,
      overflow: "hidden",
      borderColor: ColorSchemas.grey,
    },
    galleryImage: {
      width: "100%",
      height: verticalScale(90),
    },

    line: {
      marginVertical: verticalScale(10),
      backgroundColor: ColorSchemas.greyLighterV3,
      height: 2,
      width: "100%",
    },
  });
};

export default useStyles;
