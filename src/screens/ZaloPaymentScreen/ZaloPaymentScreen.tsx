import Container from "@/components/shared/Container";
import { ColorSchemas } from "@/constants/colors";
import { RootStackParamList } from "@/types/navigation";
import { statusBarHeight } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";
import React, { FC } from "react";
import { ActivityIndicator, View } from "react-native";
import WebView from "react-native-webview";

const ZaloPaymentScreen: FC = () => {
  const {
    params: { url, bookingId },
  } = useRoute<RouteProp<RootStackParamList, "ZaloPayment">>();

  return (
    <Container>
      <WebView
        originWhitelist={["https://", "zalopay://"]}
        source={{ uri: url }}
        renderLoading={() => (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={ColorSchemas.blue} />
          </View>
        )}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.startsWith("zalopay")) {
            void Linking.openURL(request.url);
            return false;
          }

          return true;
        }}
        style={{ flex: 1, marginTop: statusBarHeight() }}
        startInLoadingState
      />
    </Container>
  );
};

export default ZaloPaymentScreen;
