import useGoBack from "@/hooks/useGoBack";
import React, { FC, useCallback } from "react";
import { Appbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "@/stores/hooks";
import { bookingActions } from "@/features/booking";

type AppbarOverrideProps = {
  title: string;
  isGoBack?: boolean;
};

const AppbarOverride: FC<AppbarOverrideProps> = ({ title, isGoBack }) => {
  const { onGoBack } = useGoBack();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const navigationHome = useCallback(() => {
    dispatch(bookingActions.resetBooking());
    navigation.navigate("Main");
  }, []);

  return (
    <Appbar.Header>
      {isGoBack ? <Appbar.BackAction onPress={onGoBack} /> : null}
      <Appbar.Content title={title} />
      <Appbar.Action
        animated={false}
        onPress={navigationHome}
        icon={() => <AntDesign name="home" size={24} color="black" />}
      />
    </Appbar.Header>
  );
};

export default AppbarOverride;
