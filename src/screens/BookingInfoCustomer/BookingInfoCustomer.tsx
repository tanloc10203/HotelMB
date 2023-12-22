import Container from "@/components/shared/Container";
import KeyboardFormOverride from "@/components/shared/KeyboardFormOverride";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { useAuth } from "@/features/auth";
import { bookingActions } from "@/features/booking";
import { BookingInfoCustomerPayload } from "@/models/booking.model";
import { useAppDispatch } from "@/stores/hooks";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useMemo, useRef } from "react";
import FormBookingInfoCustomer, {
  FormBookingInfoCustomerRefProps,
} from "./form/FormBookingInfoCustomer";

const BookingInfoCustomer: FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormBookingInfoCustomerRefProps>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSubmitContinue = () => {
    if (!formRef.current || !formRef.current.handleSubmit) return;
    const { handleSubmit } = formRef.current;
    handleSubmit();
  };

  const handleSubmit = (values: BookingInfoCustomerPayload) => {
    dispatch(bookingActions.setBookingInfo(values));
    navigation.navigate("BookingSelect");
  };

  const initialValues = useMemo((): BookingInfoCustomerPayload => {
    if (!user)
      return {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
      };

    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
    };
  }, [user]);

  return (
    <Container>
      <AppbarOverride title="Tên người đặt" isGoBack />

      <KeyboardFormOverride
        formComponent={
          <FormBookingInfoCustomer
            ref={formRef}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        }
        labelBtn="Tiếp tục"
        onPressBtn={handleSubmitContinue}
      />
    </Container>
  );
};

export default BookingInfoCustomer;
