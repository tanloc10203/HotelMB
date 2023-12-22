import ButtonOverride from "@/components/ui/ButtonOverride";
import DatePicker from "@/components/ui/form/DatePicker";
import Dropdown from "@/components/ui/form/Dropdown";
import InputLabel from "@/components/ui/form/InputLabel";
import { CustomerChangeProfilePayload } from "@/models/customer.model";
import { verticalScale } from "@/utils/scale";
import changeProfileSchema from "@/validations/schemas/changeProfile";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

type Props = {
  initialValues: CustomerChangeProfilePayload;
  onSubmit?: (...args: any) => void;
};

const ProfileForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={changeProfileSchema}
      initialValues={initialValues!}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
              label="Địa chỉ"
              placeholder="Địa chỉ"
              value={values.address}
              onBlur={handleBlur("address")}
              keyboardType="default"
              onChangeText={handleChange("address")}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />

            <DatePicker
              label="Ngày sinh"
              value={values.birth_date}
              onBlur={handleBlur("birth_date")}
              keyboardType="default"
              onChangeText={handleChange("birth_date")}
              error={touched.birth_date && Boolean(errors.birth_date)}
              helperText={touched.birth_date && errors.birth_date}
            />

            <View style={{ marginBottom: verticalScale(15) }}>
              <Dropdown
                data={[
                  { label: "Nam", value: "MALE" },
                  { label: "Nữ", value: "FEMALE" },
                ]}
                label="Giới tính"
                error={touched.gender && Boolean(errors.gender)}
                helperText={touched.gender && errors.gender}
                value={values.gender!}
                onChangeValue={handleChange("gender")}
              />
            </View>

            <InputLabel
              multiline
              numberOfLines={3}
              label="Giới thiệu"
              placeholder="Giới thiệu bản thân"
              value={values.desc}
              onBlur={handleBlur("desc")}
              keyboardType="default"
              onChangeText={handleChange("desc")}
              error={touched.desc && Boolean(errors.desc)}
              helperText={touched.desc && errors.desc}
            />

            <View style={{ marginTop: verticalScale(20) }}>
              <ButtonOverride onSubmit={handleSubmit} label="Lưu thay đổi" />
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </Formik>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({});
