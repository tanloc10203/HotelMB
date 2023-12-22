import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    scrollView: {
      paddingVertical: verticalScale(20),
    },
    wrapperReservation: {
      marginHorizontal: SPACING,
      marginVertical: verticalScale(20),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    reservationTitle: {
      fontWeight: "bold",
      fontSize: scale(16),
    },
    wrapperCalendar: {
      flexDirection: "row",
      paddingVertical: verticalScale(15),
      paddingHorizontal: scale(14),
      justifyContent: "space-between",
      backgroundColor: ColorSchemas.greyLighter,
      minWidth: scale(120),
      maxWidth: scale(120),
      marginTop: verticalScale(10),
      borderRadius: scale(8),
    },
    reservationDay: {
      fontWeight: "bold",
      fontSize: scale(13),
    },
    wrapperGuest: {
      marginHorizontal: SPACING,
    },
    cardGuest: {
      marginTop: verticalScale(10),
    },
    groupGuest: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: verticalScale(5),
    },
    groupGuestLabel: {
      ...textStyles.Normal,
      fontWeight: "500",
    },
    totalPrice: {
      marginHorizontal: SPACING,
      marginTop: verticalScale(30),
    },
    totalPriceText: {
      ...textStyles.H4,
      textAlign: "center",
      fontWeight: "bold",
      color: ColorSchemas.blue,
    },
    book: {
      padding: SPACING,
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
  });
};

export default useStyles;
