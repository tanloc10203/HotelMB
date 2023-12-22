import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import useStyles from "./PaymentItemStyles";
import { RadioButton } from "react-native-paper";
import { ColorSchemas } from "@/constants/colors";

type Props = {
  onPress?: (value: string) => void;
  payment: {
    value: string;
    title: string;
    image: (styles: any) => JSX.Element;
  };
  value?: string;
  hideRadio?: boolean;
  background?: string;
  noneBorder?: boolean;
  margin?: number;
};

const PaymentItem: FC<Props> = ({
  onPress,
  payment,
  margin,
  value,
  hideRadio,
  background,
  noneBorder,
}) => {
  const styles = useStyles(margin);

  return (
    <Pressable
      onPress={() => onPress?.(payment.value)}
      style={[
        styles.cardPayment,
        value === payment.value
          ? { borderWidth: 2, borderColor: ColorSchemas.blue }
          : background || noneBorder
          ? { backgroundColor: background, borderWidth: 0 }
          : {},
      ]}
    >
      <View style={styles.wrapperTitle}>
        {payment.image(styles.image)}

        <Text
          style={[styles.cardTitle, value === payment.value ? { color: ColorSchemas.blue } : {}]}
        >
          {payment.title}
        </Text>
      </View>

      {!hideRadio ? <RadioButton value={payment.value} color={styles.colorRadio.color} /> : null}
    </Pressable>
  );
};

export default PaymentItem;
