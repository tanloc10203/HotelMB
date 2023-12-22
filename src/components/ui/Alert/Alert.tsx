import { StyleSheet, Text, View } from "react-native";
import React, { FC, ReactElement, useMemo } from "react";
import { ColorSchemas } from "@/constants/colors";
import { scale, verticalScale } from "@/utils/scale";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

type AlertColors = "info" | "warning" | "error" | "success";

type AlertProps = {
  color: AlertColors;
  text: string;
  mt?: number;
};

const Alert: FC<AlertProps> = ({ color, text, mt }) => {
  const styles = useStyles(color, mt);

  const Icon = useMemo(() => {
    const Icons: Record<AlertColors, ReactElement> = {
      info: <AntDesign name="infocirlceo" size={14} color="white" />,
      warning: <AntDesign name="warning" size={14} color="black" />,
      error: <MaterialIcons name="error-outline" size={14} color="white" />,
      success: <Feather name="check-circle" size={14} color="white" />,
    };

    return Icons[color];
  }, [color]);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>{Icon}</View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Alert;

const useStyles = (color: AlertColors, mt?: number) => {
  const colorContainer = useMemo(() => {
    const colors: Record<AlertColors, string> = {
      info: ColorSchemas.blue,
      warning: ColorSchemas.yellow,
      error: ColorSchemas.red,
      success: ColorSchemas.green,
    };

    return colors[color];
  }, [color]);

  const colorText = useMemo(() => {
    const colors: Record<AlertColors, string> = {
      info: ColorSchemas.white,
      warning: ColorSchemas.black,
      error: ColorSchemas.white,
      success: ColorSchemas.white,
    };

    return colors[color];
  }, [color]);

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: colorContainer,
      paddingHorizontal: scale(10),
      paddingVertical: verticalScale(8),
      borderRadius: scale(4),
      flexWrap: "wrap",
      alignItems: "center",

      ...(mt ? { marginTop: mt } : {}),
    },
    text: {
      color: colorText,
    },
    icon: {
      marginRight: scale(4),
    },
  });
};
