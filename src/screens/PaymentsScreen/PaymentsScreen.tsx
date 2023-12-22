import Container from "@/components/shared/Container";
import { appActions } from "@/features/app";
import useGoBack from "@/hooks/useGoBack";
import { BookingModel } from "@/models/booking.model";
import bookingApi from "@/services/api/booking.api";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import WebView from "react-native-webview";
import * as Linking from "expo-linking";

const PaymentsScreen: FC = () => {
  const {
    params: { url, bookingId },
  } = useRoute<RouteProp<RootStackParamList, "Payments">>();
  const dispatch = useAppDispatch();

  const { onGoBack } = useGoBack();

  const handleGoBack = useCallback(async () => {
    console.log(`bookingId`, bookingId);

    dispatch(appActions.setLoading(true));

    try {
      const response = await bookingApi.getById<BookingModel>(bookingId);

      if (response) {
        console.log(`response`, JSON.stringify(response, null, 4));
        if (response.zaloPayTransaction) {
          const { status } = response.zaloPayTransaction;

          if (status === "pending") {
            dispatch(appActions.setLoading(false));

            const response = await bookingApi.paymentFailed(bookingId);

            console.log(`response  payment failed`, response);
          }
        }
      }

      navigate("BookingSuccessful");
    } catch (error) {
      console.log(`error`, error);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  }, [bookingId]);

  // useEffect(() => {
  //   (async () => {
  //     await Linking.openURL(url);
  //   })();
  // }, [url]);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleGoBack} />
      </Appbar.Header>

      <WebView
        source={{ uri: url }}
        renderLoading={() => (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />
    </Container>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({});
