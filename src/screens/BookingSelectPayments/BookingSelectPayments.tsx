import Container from "@/components/shared/Container";
import { useGlobalStyles } from "@/components/shared/GlobalStyles";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import PaymentItem from "@/components/shared/PaymentItem";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { bookingActions, useBooking } from "@/features/booking";
import { payments } from "@/mock/payment";
import { useAppDispatch } from "@/stores/hooks";
import { PaymentsType } from "@/types/common";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { RadioButton } from "react-native-paper";

const BookingSelectPayments: FC = () => {
  const stylesGlobal = useGlobalStyles();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { payment: value } = useBooking();

  const handleChangeValues = useCallback((value: string) => {
    dispatch(bookingActions.setPayment(value as PaymentsType));
  }, []);

  const handleOnPress = () => {
    navigation.navigate("BookingInfoDetails");
  };

  return (
    <Container>
      <AppbarOverride title="Phương thức thanh toán" isGoBack />

      <ScrollView>
        <View style={[stylesGlobal.container]}>
          <RadioButton.Group value={value} onValueChange={handleChangeValues}>
            {payments?.map((payment, index) => (
              <PaymentItem
                onPress={handleChangeValues}
                payment={payment}
                key={index}
                value={value}
              />
            ))}
          </RadioButton.Group>
        </View>
      </ScrollView>

      <SurfaceButton label="Chọn và tiếp tục" onPress={handleOnPress} />
    </Container>
  );
};

export default BookingSelectPayments;
