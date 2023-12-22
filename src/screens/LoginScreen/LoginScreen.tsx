import Container from "@/components/shared/Container";
import { BLUR_HASH } from "@/constants/common";
import { useTheme } from "@/contexts/ThemeContext";
import AsyncStorageCommon from "@/helpers/asyncStorage";
import { useAppDispatch } from "@/stores/hooks";
import { scale } from "@/utils/scale";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { FC, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { Appbar, Text } from "react-native-paper";
import LoginForm from "./form/LoginForm";
import useStyles from "./styles";
import { LoginPayload } from "@/models/customer.model";
import HelperText from "@/components/ui/form/Input/HelperText";
import { appActions } from "@/features/app";
import { authActions } from "@/features/auth";
import authApi from "@/services/api/auth.api";
import Toast from "react-native-toast-message";
import { getMessageErrorAxios } from "@/helpers/error.helper";

const LoginScreen: FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { themeType } = useTheme();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    (async () => {
      const { apiKey, userId } = await AsyncStorageCommon.getMultiple<{
        userId: string | null;
        apiKey: string | null;
      }>(["userId", "apiKey"]);

      if (!apiKey || !userId) return;
    })();
  }, []);

  const handleSubmit = async (values: LoginPayload, resetForm: () => void) => {
    dispatch(appActions.setLoading(true));
    setError("");

    try {
      const {
        metadata: { tokens, user },
      } = await authApi.loginWithPhoneNumber(values);
      ToastAndroid.showWithGravity("Đăng nhập thành công", ToastAndroid.LONG, ToastAndroid.CENTER);
      dispatch(authActions.setAccessToken(tokens.accessToken));
      dispatch(authActions.setAuth({ apiKey: tokens.apiKey?.key!, userId: user.id }));
      dispatch(authActions.setRefreshToken(tokens.refreshToken));
    } catch (error: any) {
      let msg = getMessageErrorAxios(error);

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
              <Text style={styles.title}>Xin chào!</Text>
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
              <LoginForm
                initialValues={{ password: "", phone_number: "" }}
                onSubmit={handleSubmit}
              />
            </View>

            <View style={styles.textBottom}>
              <Text style={{ textAlign: "center" }}>Bạn chưa có tài khoản? </Text>
              <Pressable onPress={handleOnPress}>
                <Text style={{ fontWeight: "bold" }}>Đăng ký</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginScreen;
