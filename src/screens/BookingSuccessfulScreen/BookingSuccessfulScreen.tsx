import Container from "@/components/shared/Container";
import { useGlobalStyles } from "@/components/shared/GlobalStyles";
import { ColorSchemas } from "@/constants/colors";
import { SocketEventsName } from "@/constants/socket";
import { bookingActions, useBooking } from "@/features/booking";
import { MomoOrderType, MomoPaymentResponse, MomoPaymentType } from "@/models/momo.model";
import { socket } from "@/services/socket";
import { useAppDispatch } from "@/stores/hooks";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import useStyles from "./BookingSuccessfulScreenStyles";
import { ResponsePayment } from "@/models/ZaloPay.model";

type BookingSuccessfulScreenProps = {};

const BookingSuccessfulScreen: FC<BookingSuccessfulScreenProps> = () => {
  const dispatch = useAppDispatch();
  const globalStyles = useGlobalStyles();
  const navigation = useNavigation();
  const [response, setResponse] = useState<ResponsePayment | null>(null);
  const { params } = useRoute();
  const styles = useStyles(response?.status !== 1);
  const { bookingId } = useBooking();

  const handleOnPressNavigationHome = useCallback(() => {
    dispatch(bookingActions.resetBooking());
    navigation.navigate("Main");
  }, []);

  const handleOnPressBookingResults = useCallback(() => {
    if (!bookingId) return;
    dispatch(bookingActions.resetBooking());
    navigation.navigate("BookingDetails", { bookingId: bookingId });
  }, [bookingId]);

  // useEffect(() => {
  //   if (!params) return;

  //   const data = params as MomoPaymentResponse;

  //   console.log("====================================");
  //   console.log(`data`, JSON.stringify(data, null, 4));
  //   console.log("====================================");

  //   const paymentResponse = {
  //     partnerCode: data.partnerCode as string,
  //     orderId: data.orderId as string,
  //     requestId: data.requestId as string,
  //     amount: Number(data.amount),
  //     orderInfo: data.orderInfo as string,
  //     orderType: data.orderType as MomoOrderType,
  //     transId: Number(data.transId),
  //     resultCode: Number(data.resultCode),
  //     message: data.message as string,
  //     payType: data.payType as MomoPaymentType,
  //     responseTime: Number(data.responseTime),
  //     extraData: data.extraData as string,
  //     signature: data.signature as string,
  //   };

  //   setResponse((prev) => ({ ...prev, ...paymentResponse }));

  //   socket.connect();

  //   socket.emit(SocketEventsName.REQUEST_PAYMENT_RESPONSE, paymentResponse);
  // }, [params]);

  useEffect(() => {
    if (!params) return;

    const data = params as ResponsePayment;

    const paymentResponse = {
      amount: Number(data.amount),
      appid: Number(data.appid),
      apptransid: String(data.apptransid),
      bankcode: String(data.bankcode),
      checksum: String(data.checksum),
      discountamount: Number(data.discountamount),
      pmcid: Number(data.pmcid),
      status: Number(data.status),
    };

    setResponse(paymentResponse);

    console.log("====================================");
    console.log(`prams payment`, JSON.stringify(params, null, 4));
    console.log("====================================");

    socket.connect();

    socket.emit(SocketEventsName.REQUEST_PAYMENT_RESPONSE, paymentResponse);
  }, []);

  return (
    <Container style={[styles.container, styles.p]}>
      <View style={styles.container}>
        <View>
          <View style={[styles.roundedIcon, styles.container]}>
            <View style={[styles.wrapperIcon, styles.container]}>
              <View>
                {response?.status === 1 ? (
                  <Entypo
                    name="check"
                    size={styles.iconSize.fontSize}
                    color={styles.iconColor.color}
                  />
                ) : (
                  <MaterialIcons
                    name="error-outline"
                    size={styles.iconSize.fontSize}
                    color={styles.iconColor.color}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={styles.circleV1TopLeft} />
          <View style={styles.circleV2TopRight} />
          <View style={styles.circleV3BottomLeft} />
          <View style={styles.circleV3BottomLeftV2} />
          <View style={styles.circleV5BottomCenter} />
          <View style={styles.circleV6TopBottomRightCenter} />
          <View style={styles.circleV7TopRightLeftCenter} />
          <View style={styles.circleV8BottomRight} />
          <View style={styles.circleV9TopBottomLeftCenter} />
        </View>

        <View style={styles.spacingY} />

        <Text style={styles.title}>{response?.status === 1 ? "Thành công" : "Thất bại"}</Text>
        <View style={styles.spacingYBtn} />
        <Text style={styles.subTitle}>
          {response?.status === 1 ? "Thanh toán thành công" : "Thanh toán không thành công"}
        </Text>

        <View style={styles.spacingY} />

        {response?.status === 1 ? (
          <Button
            style={globalStyles.surfaceBtnBottom}
            contentStyle={[globalStyles.surfaceBtnContentStyles, { minWidth: 250 }]}
            labelStyle={{ fontWeight: "bold" }}
            onPress={handleOnPressBookingResults}
            mode="contained"
            buttonColor={ColorSchemas.green}
          >
            Xem chi tiết
          </Button>
        ) : null}

        <View style={styles.spacingYBtn} />

        <Button
          style={globalStyles.surfaceBtnBottom}
          contentStyle={[globalStyles.surfaceBtnContentStyles, { minWidth: 250 }]}
          labelStyle={{
            color: response?.status === 1 ? ColorSchemas.green : ColorSchemas.white,
            fontWeight: "bold",
          }}
          onPress={handleOnPressNavigationHome}
          mode="contained"
          buttonColor={response?.status === 1 ? ColorSchemas.greenLight : ColorSchemas.red}
        >
          Trở về trang chủ
        </Button>
      </View>
    </Container>
  );
};

export default BookingSuccessfulScreen;
