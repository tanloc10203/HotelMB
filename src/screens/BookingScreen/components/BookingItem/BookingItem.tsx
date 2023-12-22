import Alert from "@/components/ui/Alert";
import { ColorSchemas } from "@/constants/colors";
import { appActions } from "@/features/app";
import { bookingActions } from "@/features/booking";
import {
  ACCEPT_STATUS,
  BookingModel,
  colorStatusBooking,
  parserStatusBooking,
} from "@/models/booking.model";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { formatDate } from "@/utils/format";
import { fNumber } from "@/utils/formatNumber";
import { verticalScale } from "@/utils/scale";
import { useNavigation } from "@react-navigation/native";
import { isNumber } from "lodash";
import React, { FC, memo, useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import BookingItemLabel from "./BookingItemLabel";
import useStyles from "./BookingItemStyles";

type BookingItemProps = {
  row: BookingModel;
  onCancel?: (id: string) => void;
};

const BookingItem: FC<BookingItemProps> = ({ row, onCancel }) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // console.log("====================================");
  // console.log(`row`, JSON.stringify(row, null, 4));
  // console.log("====================================");

  const isModeBookedOnline = useMemo(() => {
    const parserBoolean = isNumber(row.is_booked_online)
      ? Boolean(row.is_booked_online === 1)
      : row.is_booked_online;

    return parserBoolean ? "Qua ứng dụng" : "Tại khách sạn";
  }, [row]);

  const handleOnSeeDetails = useCallback(() => {
    if (!row.id) return;
    navigation.navigate("BookingDetails", { bookingId: row.id });
  }, [row]);

  const handlePayment = useCallback(() => {
    dispatch(appActions.setLoading(true));
    dispatch(bookingActions.paymentBookingStart(row.id!));
  }, [row]);

  const onRate = useCallback(() => {
    if (!row || !row?.bookingDetails?.[0]?.room_id) return;
    navigate("RoomDetails", {
      id: row?.bookingDetails?.[0]?.room_id,
      rate: { booking_id: row.id!, isRate: row.rate ? false : true },
    });
  }, [row]);

  return (
    <>
      <TouchableOpacity activeOpacity={0.65} style={styles.surface} onPress={handleOnSeeDetails}>
        <BookingItemLabel label="Mã đặt phòng" value={row?.id || ""} />
        <BookingItemLabel label="Hình thức đặt" value={isModeBookedOnline} />
        <BookingItemLabel label="Tổng số phòng" value={`${row.total_room}`} />
        <BookingItemLabel label="Tổng tiền đặt phòng" value={`${fNumber(row.total_price)} VNĐ`} />
        <BookingItemLabel
          label="Trạng thái"
          value={parserStatusBooking(row.status)}
          color={colorStatusBooking(row.status)}
        />
        <BookingItemLabel
          label="Ngày đặt"
          value={formatDate(row.created_at || "", undefined, "DD/MM/YYYY HH:mm:ss")}
        />

        {(row.status === "pending_payment" || row.status === "pending_confirmation") &&
        (row.zaloPayTransaction?.status === "failed" ||
          row.zaloPayTransaction?.status === "pending") ? (
          <>
            <Alert
              color="error"
              mt={verticalScale(10)}
              text="Nếu bạn không thanh toán trong vòng 3h kể từ khi đặt phòng. Đặt phòng của bạn sẽ bị xóa"
            />
            <Button
              style={{ marginTop: verticalScale(12) }}
              mode="contained"
              buttonColor={ColorSchemas.blue}
              onPress={handlePayment}
            >
              Thanh toán ngay
            </Button>
          </>
        ) : null}

        {row.status === "confirmed" ||
        row.status === "pending_payment" ||
        row.status === "pending_confirmation" ? (
          <>
            <Button
              style={{ marginTop: verticalScale(12) }}
              mode="contained"
              buttonColor={ColorSchemas.red}
              onPress={() => onCancel?.(row.id!)}
            >
              Hủy đặt phòng
            </Button>
          </>
        ) : null}

        {ACCEPT_STATUS.includes(row?.status) ? (
          !row.rate ? (
            <View style={{ marginTop: 10 }}>
              <Button mode="contained" buttonColor={ColorSchemas.blue} onPress={onRate}>
                Đánh giá
              </Button>
            </View>
          ) : (
            <View>
              <Button mode="contained" buttonColor={ColorSchemas.blue}>
                Xem đánh giá
              </Button>
            </View>
          )
        ) : null}
      </TouchableOpacity>
    </>
  );
};

export default memo(BookingItem);
