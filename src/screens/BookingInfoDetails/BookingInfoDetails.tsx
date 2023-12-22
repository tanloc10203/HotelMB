import Container from "@/components/shared/Container";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import PaymentItem from "@/components/shared/PaymentItem";
import RoomItem from "@/components/shared/RoomItem";
import AppbarOverride from "@/components/ui/AppbarOverride";
import OverlayLoading from "@/components/ui/OverlayLoading";
import { ColorSchemas } from "@/constants/colors";
import { useSnackbar } from "@/features/app";
import { useAuth } from "@/features/auth";
import { bookingActions, useBooking } from "@/features/booking";
import { useTax } from "@/features/tax/taxSelector";
import { convertDate, formatDate } from "@/helpers/date.helper";
import { payments } from "@/mock/payment";
import { useAppDispatch } from "@/stores/hooks";
import { BookingPayload } from "@/models/booking.model";
import { calcPriceWithTax, fCurrency } from "@/utils/formatNumber";
import { useNavigation } from "@react-navigation/native";
import { differenceInDays } from "date-fns";
import React, { useCallback, useEffect, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import useStyles from "./BookingInfoDetailsStyles";
import { calcWithDiscount } from "@/utils/common";

const BookingInfoDetails = () => {
  const dataBooking = useBooking();
  const {
    roomBooking,
    checkIn,
    checkOut,
    adults,
    children,
    roomQuantity,
    payment,
    loading,
    error,
  } = dataBooking;

  const styles = useStyles();
  const navigation = useNavigation();
  const { data } = useTax();
  const dispatch = useAppDispatch();
  const { type } = useSnackbar();
  const { user } = useAuth();

  const countNight = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const result = differenceInDays(convertDate(checkOut), convertDate(checkIn));
    return result === 0 ? 1 : result;
  }, [checkIn, checkOut]);

  const paymentSelected = useMemo(() => payments.find((p) => p.value === payment), [payment]);

  useEffect(() => {
    if (type !== "success") return;
    navigation.navigate("BookingSuccessful");
  }, [type]);

  const handleOnPressConfirm = useCallback(() => {
    if (!user || countNight === 0) return;

    const payload: BookingPayload = {
      adults: dataBooking.adults,

      check_in: dataBooking.checkIn,
      check_out: dataBooking.checkOut,
      children: dataBooking.children,
      customer_id: user!.id,
      email: dataBooking.bookingInfo?.email!,
      first_name: dataBooking.bookingInfo?.first_name!,
      last_name: dataBooking.bookingInfo?.last_name!,

      payment: dataBooking.payment,
      phone_number: dataBooking.bookingInfo?.phone_number!,
      room_id: dataBooking.roomBooking?.id!,
      room_quantity: dataBooking.roomQuantity,
      total_night: countNight,

      note: dataBooking.bookingFor?.note,
      voucher: "",
    };

    dispatch(bookingActions.bookingStart(payload));
  }, [dataBooking, user, countNight]);

  const tax = useMemo(() => {
    if (!data.length) return 0.08;
    return data[0].rate;
  }, [data]);

  const resultPrice = useMemo(() => {
    if (!roomBooking) return 0;

    let price = roomBooking?.roomType.prices?.price_online! * countNight;

    if (
      roomBooking.discount &&
      roomBooking.discount.status !== "expired" &&
      roomBooking.discount.is_public
    ) {
      price = calcWithDiscount(price, roomBooking.discount.price);
    }

    return price;
  }, [roomBooking, countNight]);

  return (
    <Container style={{ backgroundColor: ColorSchemas.greyLighterV3 }}>
      <AppbarOverride title="Chi tiết thanh toán" isGoBack />

      <OverlayLoading visible={loading === "pending"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <RoomItem card {...roomBooking!} />

          <View style={[styles.card, styles.mt]}>
            <View style={styles.roundedBottom}>
              <View style={[styles.wrapperText, styles.mb]}>
                <Text style={styles.textLeft}>Check in</Text>
                <Text style={styles.textRight}>{formatDate(checkIn, "DD/MM/YYYY")}</Text>
              </View>
              <View style={styles.wrapperText}>
                <Text style={styles.textLeft}>Check out</Text>
                <Text style={styles.textRight}>{formatDate(checkOut, "DD/MM/YYYY")}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.roundedBottom}>
              <View style={[styles.wrapperText, styles.mb]}>
                <Text style={styles.textLeft}>Người lớn</Text>
                <Text style={styles.textRight}>{adults}</Text>
              </View>
              <View style={[styles.wrapperText, styles.mb]}>
                <Text style={styles.textLeft}>Trẻ em</Text>
                <Text style={styles.textRight}>{children}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.roundedBottom}>
              <View style={[styles.wrapperText, styles.mb]}>
                <Text style={styles.textLeft}>{`${countNight} đêm`}</Text>
                <Text style={styles.textRight}>{fCurrency(resultPrice)}</Text>
              </View>
              <View style={[styles.wrapperText, styles.mb]}>
                <Text style={styles.textLeft}>Số lượng phòng</Text>
                <Text style={styles.textRight}>{roomQuantity}</Text>
              </View>
              <View style={styles.wrapperText}>
                <Text style={styles.textLeft}>VAT</Text>
                <Text style={styles.textRight}>{`${tax}%`}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.roundedBottom}>
              <View style={styles.wrapperText}>
                <Text style={styles.textLeft}>Tổng giá đặt phòng</Text>
                <Text style={styles.textRight}>
                  {fCurrency(calcPriceWithTax(resultPrice * roomQuantity, tax))}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.spacing}>
            <PaymentItem margin={0} hideRadio payment={paymentSelected!} />
          </View>
        </View>
      </ScrollView>

      <SurfaceButton
        loading={loading === "pending"}
        label="Xác nhận"
        onPress={handleOnPressConfirm}
      />
    </Container>
  );
};

export default BookingInfoDetails;
