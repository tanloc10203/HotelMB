import Container from "@/components/shared/Container";
import HelperText from "@/components/ui/form/Input/HelperText";
import { appActions } from "@/features/app";
import { authActions, useAuth } from "@/features/auth";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { ChangePasswordPayload, CustomerChangeProfilePayload } from "@/models/customer.model";
import { formatDate } from "@/utils/format";
import { filterObj, getInfoData, removeNullObj } from "@/utils/object";
import { scale } from "@/utils/scale";
import React, { useCallback } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { Avatar, IconButton, SegmentedButtons } from "react-native-paper";
import Toast from "react-native-toast-message";
import { mutate } from "swr";
import ChangePasswordForm from "./form/ChangePasswordForm";
import GenerateForm from "./form/GenerateForm";
import ProfileForm from "./form/ProfileForm";
import useStyles from "./styles";

type ProfileScreenProps = {};

type Value = "generate" | "profile" | "password";

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [value, setValue] = React.useState<Value>("generate");
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [error, setError] = React.useState("");
  const { user } = useAuth();

  const handleChangePassword = async (
    { confirmPassword, ...others }: ChangePasswordPayload,
    resetForm: () => void
  ) => {
    dispatch(appActions.setLoading(true));
    setError("");

    try {
      await authApi.changePassword(others);
      ToastAndroid.showWithGravity(
        "Thay đổi mật khẩu thành công",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      resetForm();
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

  const handleChangeSegment = React.useCallback(
    (value: string) => {
      if (error) setError("");
      setValue(value as Value);
    },
    [error]
  );

  const initialValues = React.useMemo(() => {
    return filterObj({
      address: "",
      birth_date: "",
      desc: "",
      first_name: "",
      gender: undefined,
      last_name: "",
      ...user,
    } as CustomerChangeProfilePayload);
  }, [user]);

  const handleSubmitChangeProfile = async (values: CustomerChangeProfilePayload) => {
    const data = removeNullObj(
      getInfoData(
        {
          ...values,
          birth_date: values.birth_date
            ? formatDate(values.birth_date, "DD/MM/YYYY", "YYYY-MM-DD")
            : "",
        },
        ["address", "birth_date", "desc", "first_name", "last_name", "gender", "phone_number"]
      )
    );

    dispatch(appActions.setLoading(true));
    setError("");

    try {
      const response = await authApi.changeProfile(user?.id!, data as any);
      mutate(authApi.getCacheKey({ type: "getProfile" }), response, {
        rollbackOnError: true,
        populateCache: true,
        revalidate: true,
      });
      ToastAndroid.showWithGravity("Thay đổi thành công", ToastAndroid.LONG, ToastAndroid.CENTER);
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

  const onPressLogout = useCallback(() => {
    dispatch(authActions.logout());
  }, []);

  return (
    <Container>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={120} source={require("@/assets/avatar/avatar_default.jpg")} />
          <IconButton icon="logout" iconColor={"white"} size={20} onPress={onPressLogout} />
        </View>
        <View style={[styles.p15, styles.pb15]}>
          <SegmentedButtons
            style={styles.pt15}
            value={value}
            onValueChange={handleChangeSegment}
            buttons={[
              {
                value: "generate",
                label: "Tổng quan",
              },
              {
                value: "profile",
                label: "Cá nhân",
              },
              { value: "password", label: "Đổi mật khẩu" },
            ]}
          />

          <View style={styles.pt30}>
            {error && (
              <View style={{ marginBottom: scale(15) }}>
                <HelperText fontSize="H5" type="error" text={error} visible />
              </View>
            )}

            {value === "generate" && (
              <GenerateForm initialValues={{ email: "", phone_number: "", ...user }} />
            )}
            {value === "profile" && (
              <ProfileForm initialValues={initialValues} onSubmit={handleSubmitChangeProfile} />
            )}
            {value === "password" && (
              <ChangePasswordForm
                initialValues={{ confirmPassword: "", password: "", newPassword: "" }}
                onSubmit={handleChangePassword}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;
