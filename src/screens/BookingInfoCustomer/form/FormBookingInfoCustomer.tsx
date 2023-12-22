import InputLabel from "@/components/ui/form/InputLabel";
import { BookingInfoCustomerPayload } from "@/models/booking.model";
import bookingInfoCustomerSchema from "@/validations/schemas/bookingInfoCustomerSchema";
import { Formik, FormikProps } from "formik";
import React, { FormEvent, forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

type FormBookingInfoCustomerProps = {
  initialValues: BookingInfoCustomerPayload;
  onSubmit: (...args: any[]) => void;
};

export type FormBookingInfoCustomerRefProps = {
  handleSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
};

const FormBookingInfoCustomer = forwardRef<
  FormBookingInfoCustomerRefProps,
  FormBookingInfoCustomerProps
>(({ initialValues, onSubmit }, ref) => {
  const formRef = useRef<FormikProps<BookingInfoCustomerPayload> | null>(null);

  useImperativeHandle(ref, () => ({ handleSubmit: formRef.current?.handleSubmit }), [
    formRef.current?.handleSubmit,
  ]);

  return (
    <Formik
      enableReinitialize
      validationSchema={bookingInfoCustomerSchema}
      initialValues={initialValues}
      innerRef={formRef}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => {
        return (
          <View>
            <InputLabel
              label="Họ và chữ lót"
              placeholder="Họ và chữ lót của bạn"
              value={values.last_name}
              onBlur={handleBlur("last_name")}
              keyboardType="default"
              onChangeText={handleChange("last_name")}
              error={touched.last_name && Boolean(errors.last_name)}
              helperText={touched.last_name && errors.last_name}
            />

            <InputLabel
              label="Tên"
              placeholder="Tên của bạn"
              value={values.first_name}
              onBlur={handleBlur("first_name")}
              keyboardType="default"
              onChangeText={handleChange("first_name")}
              error={touched.first_name && Boolean(errors.first_name)}
              helperText={touched.first_name && errors.first_name}
            />

            <InputLabel
              label="Số điện thoại"
              placeholder="VD: 0125678956"
              value={values.phone_number}
              onBlur={handleBlur("phone_number")}
              keyboardType="phone-pad"
              onChangeText={handleChange("phone_number")}
              error={touched.phone_number && Boolean(errors.phone_number)}
              helperText={touched.phone_number && errors.phone_number}
            />

            <InputLabel
              label="Địa chỉ email"
              placeholder="VD: 0125678956"
              value={values.email}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </View>
        );
      }}
    </Formik>
  );
});

export default FormBookingInfoCustomer;
