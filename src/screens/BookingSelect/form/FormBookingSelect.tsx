import InputLabel from "@/components/ui/form/InputLabel";
import { BookingForPayload } from "@/models/booking.model";
import { bookingForSchema } from "@/validations/schemas/bookingInfoCustomerSchema";
import { Formik, FormikProps } from "formik";
import React, { FormEvent, forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

type FormBookingSelectProps = {
  initialValues: BookingForPayload;
  onSubmit: (...args: any[]) => void;
};

export type FormBookingSelectRefProps = {
  handleSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
};

const FormBookingSelect = forwardRef<FormBookingSelectRefProps, FormBookingSelectProps>(
  ({ initialValues, onSubmit }, ref) => {
    const formRef = useRef<FormikProps<BookingForPayload> | null>(null);

    useImperativeHandle(ref, () => ({ handleSubmit: formRef.current?.handleSubmit }), [
      formRef.current?.handleSubmit,
    ]);

    return (
      <Formik
        enableReinitialize
        validationSchema={bookingForSchema}
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
                label="Ghi chú"
                multiline
                numberOfLines={3}
                placeholder="Nội dung"
                value={values.note}
                onBlur={handleBlur("note")}
                keyboardType="default"
                onChangeText={handleChange("note")}
                error={touched.note && Boolean(errors.note)}
                helperText={touched.note && errors.note}
              />
            </View>
          );
        }}
      </Formik>
    );
  }
);

export default FormBookingSelect;
