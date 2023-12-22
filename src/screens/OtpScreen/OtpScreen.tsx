import Container from "@/components/shared/Container";
import COLORS from "@/constants/colors";
import { BLUR_HASH } from "@/constants/common";
import { useTheme } from "@/contexts/ThemeContext";
import { appActions } from "@/features/app";
import { authActions, useAuth } from "@/features/auth";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { scale, verticalScale } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { FC, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, ToastAndroid, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import useStyles from "../LoginScreen/styles";
import OtpForm from "./form/OtpForm";

const LoginScreen: FC = () => {
  const styles = useStyles();
  const {
    params: { apiKey, userId, phoneNumber },
  } = useRoute<RouteProp<RootStackParamList, "Otp">>();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [timerCount, setTimer] = React.useState(60);
  const { themeType } = useTheme();
  const { sendOtp } = useAuth();

  React.useEffect(() => {
    if (timerCount <= 0 || !sendOtp) return;

    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerCount, sendOtp]);

  const handleSubmit = React.useCallback(
    async (value: string) => {
      dispatch(appActions.setLoading(true));

      try {
        await authApi.verifyCode({
          api_key: apiKey,
          otp: value,
          user_id: "" + userId,
        });

        ToastAndroid.showWithGravity("Xác thực thành công", ToastAndroid.LONG, ToastAndroid.CENTER);
        dispatch(authActions.setStatus("verified"));
        dispatch(authActions.setPhoneNumber(""));
        dispatch(authActions.setSendOtp(false));
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
    },
    [apiKey, userId]
  );

  const handleResendCode = React.useCallback(async () => {
    try {
      dispatch(appActions.setLoading(true));
      setError("");

      const response = await authApi.resendCode({ api_key: apiKey, user_id: userId + "" });

      ToastAndroid.showWithGravity(
        "Đã gửi lại mã xác thực",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setTimer(60);
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
  }, [apiKey, userId]);

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
              <Text style={styles.title}>Nhập mã xác thực</Text>
            </View>

            <View style={{ marginTop: verticalScale(13) }}>
              <Text
                style={{
                  fontSize: scale(13),
                  lineHeight: verticalScale(18),
                  color: COLORS.Black,
                  opacity: 0.7,
                }}
              >
                Chúng tôi đã gửi SMS kèm mã kích hoạt tới điện thoại của bạn{" "}
                <Text style={{ fontWeight: "700" }}>{phoneNumber}</Text>
              </Text>
            </View>

            <View style={{ marginTop: scale(35) }}>
              <OtpForm
                timerCount={timerCount}
                error={error}
                onResend={handleResendCode}
                setValue={setCode}
                value={code}
                onSubmit={handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginScreen;
