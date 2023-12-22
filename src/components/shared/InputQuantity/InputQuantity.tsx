import { Entypo } from "@expo/vector-icons";
import React, { FC, memo, useCallback } from "react";
import { Alert, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import useStyles from "./InputQuantityStyles";

type InputQuantityProps = {
  value: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (newValue: number) => void;
};

const InputQuantity: FC<InputQuantityProps> = ({ value, minValue = 0, maxValue = 5, onChange }) => {
  const styles = useStyles();

  const onIncrease = useCallback(() => {
    if (!onChange) return;

    if (Number(value) + 1 > Number(maxValue)) {
      ToastAndroid.showWithGravity(
        "Số lượng đã là tối đa",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }

    onChange(Math.min(maxValue, value + 1));
  }, [value, maxValue, onChange]);

  const onDecrease = useCallback(() => {
    if (!onChange) return;

    if (Number(value) - 1 < Number(maxValue)) {
      ToastAndroid.showWithGravity(
        "Số lượng đã là tối thiểu",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }

    onChange(Math.max(minValue, value - 1));
  }, [value, minValue, onChange]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.action} onPress={onDecrease}>
        <Entypo name="minus" size={24} color={styles.colorIcon.color} />
      </TouchableOpacity>

      <View>
        <Text style={styles.value}>{value}</Text>
      </View>

      <TouchableOpacity style={styles.action} onPress={onIncrease}>
        <Entypo name="plus" size={24} color={styles.colorIcon.color} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(InputQuantity);
