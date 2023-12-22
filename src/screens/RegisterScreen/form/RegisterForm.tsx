import InputLabel from "@/components/ui/form/InputLabel";
import useStyles from "@/screens/UpdateProfileScreen/form/styles";
import { RegisterPayload } from "@/models/customer.model";
import { scale, verticalScale } from "@/utils/scale";
import registerSchema from "@/validations/schemas/registerSchema";
import { Formik } from "formik";
import React, { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface RegisterFormProps {
  onSubmit?: (...args: any) => void;
  initialValues: RegisterPayload;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, initialValues }) => {
  const styles = useStyles();

  return (
    <Formik
      enableReinitialize
      validationSchema={registerSchema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <InputLabel
            label="Số điện thoại"
            value={values.phone_number}
            onBlur={handleBlur("phone_number")}
            placeholder="VD: 0843549558"
            onChangeText={handleChange("phone_number")}
            keyboardType="phone-pad"
            autoComplete="tel"
            error={touched.phone_number && Boolean(errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
          />

          <InputLabel
            label="Mật khẩu"
            value={values.password}
            placeholder="Nhập mật khẩu"
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            isSecure
          />

          <InputLabel
            label="Xác nhận mật khẩu"
            value={values.confirm_password}
            placeholder="Nhập lại mật khẩu"
            onBlur={handleBlur("confirm_password")}
            onChangeText={handleChange("confirm_password")}
            error={touched.confirm_password && Boolean(errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
            isSecure
          />

          <View style={{ marginTop: verticalScale(20) }}>
            <Button
              mode="contained"
              onPress={handleSubmit as () => void}
              contentStyle={styles.contentStyle}
              style={{ borderRadius: scale(10) }}
              labelStyle={styles.labelStyle}
            >
              Đăng ký
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
