import Container from "@/components/shared/Container";
import HelperText from "@/components/ui/form/Input/HelperText";
import { BLUR_HASH } from "@/constants/common";
import { useTheme } from "@/contexts/ThemeContext";
import { appActions } from "@/features/app";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { RegisterPayload } from "@/models/customer.model";
import { scale } from "@/utils/scale";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { Appbar, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import useStyles from "../LoginScreen/styles";
import RegisterForm from "./form/RegisterForm";
import { authActions } from "@/features/auth";

const RegisterScreen: FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const { themeType } = useTheme();

  const handleOnPress = () => {
    navigation.goBack();
  };

  const handleSubmit = async (values: RegisterPayload, resetForm: () => void) => {
    dispatch(appActions.setLoading(true));
    setError("");

    try {
      const response = await authApi.register({
        password: values.password,
        phone_number: values.phone_number,
      });
      ToastAndroid.showWithGravity("Đăng ký thành công.", ToastAndroid.LONG, ToastAndroid.CENTER);

      dispatch(authActions.setAuth(response.metadata));
      dispatch(authActions.setStatus("verify"));
      dispatch(authActions.setPhoneNumber(values.phone_number));
      dispatch(authActions.setSendOtp(true));
    } catch (error: any) {
      const { response } = error;

      let msg = error.message;

      if (response && response.data && response.data.message) {
        const { message } = response.data;
        msg = message;
      }

      setError(msg);

      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: msg,
      });
    } finally {
      dispatch(appActions.setLoading(false));
    }
  };

  return (
    <Container style={styles.bgWhite}>
      <Appbar.Header style={styles.bgWhite}>
        <Appbar.Content title="" />
        {themeType === "light" && (
          <Appbar.Action
            animated={false}
            size={46}
            icon={() => (
              <Image
                source={require("@/assets/icon/Star.png")}
                style={styles.image}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={1000}
              />
            )}
          />
        )}
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.flex, styles.container]}>
            <View style={[styles.wrapTitle]}>
              <Text style={styles.title}>Tạo tài khoản</Text>
              <Image
                source={require("@/assets/icon/image.png")}
                style={styles.icon}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={1000}
              />
            </View>

            {error && (
              <View style={{ marginTop: scale(15) }}>
                <HelperText fontSize="H5" type="error" text={error} visible />
              </View>
            )}

            <View style={{ marginTop: scale(38) }}>
              <RegisterForm
                initialValues={{
                  password: "",
                  phone_number: "",
                  confirm_password: "",
                }}
                onSubmit={handleSubmit}
              />
            </View>

            <View style={styles.textBottom}>
              <Text style={{ textAlign: "center" }}>Bạn đã có tài khoản? </Text>
              <Pressable onPress={handleOnPress}>
                <Text style={{ fontWeight: "bold" }}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterScreen;
