import Container from "@/components/shared/Container";
import KeyboardFormOverride from "@/components/shared/KeyboardFormOverride";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { bookingActions, useBooking } from "@/features/booking";
import { BookingForPayload } from "@/models/booking.model";
import { useAppDispatch } from "@/stores/hooks";
import { verticalScale } from "@/utils/scale";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useMemo, useRef } from "react";
import { Text, View } from "react-native";
import FormBookingSelect, { FormBookingSelectRefProps } from "./form/FormBookingSelect";

const BookingSelect: FC = () => {
  const ref = useRef<FormBookingSelectRefProps>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { roomBooking: room } = useBooking();

  const initialValues = useMemo(
    (): BookingForPayload => ({
      note: "",
    }),
    []
  );

  const onPressBtnBottom = () => {
    if (!ref.current || !ref.current.handleSubmit) return;
    ref.current.handleSubmit();
  };

  const handleSubmit = (values: BookingForPayload) => {
    dispatch(bookingActions.setBookingFor(values));
    navigation.navigate("BookingSelectPayments");
  };

  return (
    <Container>
      <AppbarOverride title="Ghi chú" isGoBack />

      <KeyboardFormOverride
        formComponent={
          <View style={{ flex: 1, paddingBottom: verticalScale(30) }}>
            <FormBookingSelect ref={ref} initialValues={initialValues} onSubmit={handleSubmit} />

            {room?.is_breakfast || room?.is_extra_beds || room?.is_pets || room?.is_smoking ? (
              <View>
                <Text style={{ fontSize: 15, fontWeight: "700", marginBottom: 10 }}>
                  Chính sách sử dụng phòng
                </Text>

                <View>
                  <Text>{room?.is_breakfast ? "Bữa sáng miễn phí" : null}</Text>
                </View>

                <View>
                  <Text>{room?.is_extra_beds ? "Phí thêm nếu sử dụng thêm giường" : null}</Text>
                </View>

                <View>
                  <Text>{room?.is_pets ? "Cho phép thú cưng" : null}</Text>
                </View>

                <View>
                  <Text>{room?.is_smoking ? "Cho phép hút thuốc" : null}</Text>
                </View>
              </View>
            ) : null}
          </View>
        }
        labelBtn="Tiếp tục"
        onPressBtn={onPressBtnBottom}
      />
    </Container>
  );
};

export default BookingSelect;
