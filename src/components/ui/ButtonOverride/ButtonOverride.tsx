import { scale, verticalScale } from "@/utils/scale";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import useStyles from "./styles";

type Props = {
  onSubmit?: () => void;
  label: string;
  color?: string;
};

const ButtonOverride: React.FC<Props> = ({ onSubmit, label, color }) => {
  const styles = useStyles(color);

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      contentStyle={styles.contentStyle}
      style={{ borderRadius: scale(10) }}
      labelStyle={styles.labelStyle}
    >
      {label}
    </Button>
  );
};

export default ButtonOverride;
