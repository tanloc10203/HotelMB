import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = () => {
  const _height = verticalScale(300);

  return StyleSheet.create({
    wrapperImage: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      height: "100%",
    },
    image: {
      width: "100%",
      height: _height,
    },
    content: {
      marginTop: verticalScale(15),
      paddingBottom: verticalScale(20),
    },
    spacing: {
      paddingHorizontal: SPACING,
    },
    header: {
      justifyContent: "space-between",
      alignItems: "center",
      right: 0,
      left: 0,
    },
    icon: {},
    title: {
      ...textStyles.H3,
      fontWeight: "bold",
    },
    borderBottom: {
      borderWidth: 1,
      borderColor: ColorSchemas.greyLighter,
      marginTop: verticalScale(20),
    },
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
    gallery: {},
    galleryCard: {
      width: scale(110),
      backgroundColor: ColorSchemas.mutedDark,
      height: verticalScale(90),
      borderRadius: scale(20),
      marginHorizontal: scale(5),
      borderWidth: 1,
      overflow: "hidden",
      borderColor: ColorSchemas.grey,
    },
    galleryImage: {
      width: "100%",
      height: verticalScale(90),
    },
    descriptionText: {
      lineHeight: scale(19),
      color: ColorSchemas.mutedDark,
      fontSize: scale(13),
    },
    price: {
      color: ColorSchemas.blue,
      fontWeight: "bold",
      fontSize: scale(15),
    },
    tax: {
      color: ColorSchemas.black,
      fontWeight: "bold",
      fontSize: scale(12),
    },
    subPrice: {
      color: ColorSchemas.muted,
      fontWeight: "bold",
      fontSize: scale(12),
    },
    book: {
      padding: SPACING,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopLeftRadius: scale(15),
      borderTopRightRadius: scale(15),
    },
    bookButton: {
      paddingHorizontal: scale(40),
      paddingVertical: scale(4),
    },
    button: {
      borderRadius: scale(40),
    },
    wrapperAmenity: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: SPACING,
    },
    amenityItem: {
      backgroundColor: ColorSchemas.white,
      paddingHorizontal: scale(8),
      paddingVertical: scale(5),
      margin: scale(1),
      flexDirection: "row",
      borderRadius: scale(2),
    },
    amenityItemText: {
      fontSize: 13,
      marginLeft: 3,
    },
  });
};

export default useStyles;
