import ButtonOverride from "@/components/ui/ButtonOverride";
import InputLabel from "@/components/ui/form/InputLabel";
import { ChangePasswordPayload } from "@/models/customer.model";
import { verticalScale } from "@/utils/scale";
import changePasswordSchema from "@/validations/schemas/ChangePasswordSchema";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";

type Props = {
  onSubmit?: (...args: any) => void;
  initialValues: ChangePasswordPayload;
};

const ChangePasswordForm: React.FC<Props> = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={changePasswordSchema}
      initialValues={initialValues!}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <InputLabel
            label="Mật khẩu cũ"
            placeholder="Mật khẩu cũ của bạn"
            value={values.password}
            onBlur={handleBlur("password")}
            keyboardType="default"
            onChangeText={handleChange("password")}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            isSecure
          />
          <InputLabel
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            value={values.newPassword}
            onBlur={handleBlur("newPassword")}
            keyboardType="default"
            onChangeText={handleChange("newPassword")}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
            isSecure
          />
          <InputLabel
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            value={values.confirmPassword}
            onBlur={handleBlur("confirmPassword")}
            keyboardType="default"
            onChangeText={handleChange("confirmPassword")}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            isSecure
          />
          <View style={{ marginTop: verticalScale(20) }}>
            <ButtonOverride onSubmit={handleSubmit} label="Lưu thay đổi" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
