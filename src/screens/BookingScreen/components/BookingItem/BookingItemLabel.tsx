import { StyleSheet, Text, View } from "react-native";
import React, { FC, memo } from "react";
import { verticalScale } from "@/utils/scale";

type BookingItemLabelProps = {
  label: string;
  value: string;
  color?: string;
};

const BookingItemLabel: FC<BookingItemLabelProps> = ({ label, value, color }) => {
  const styles = useStyles(color);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Text style={styles.textValue}>{value}</Text>
    </View>
  );
};

export default memo(BookingItemLabel);

const useStyles = (color?: string) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingVertical: verticalScale(4),
    },
    textValue: {
      fontWeight: "700",
      ...(color ? { color: color } : {}),
    },
  });
};
