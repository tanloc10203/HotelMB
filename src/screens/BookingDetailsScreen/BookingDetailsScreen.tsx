import Container from "@/components/shared/Container";
import { appActions } from "@/features/app";
import { bookingActions, useBooking } from "@/features/booking";
import useGoBack from "@/hooks/useGoBack";
import { BookingDetailModel } from "@/models/bookingDetails.model";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useEffect } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { Appbar } from "react-native-paper";
import BookingDetailsItem from "./components/BookingDetailsItem";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import { fNumber } from "@/utils/formatNumber";

type Props = {};

const BookingDetailsScreen: FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    screenBookings: { dataBookingDetails, isLoading, data },
  } = useBooking();
  const { onGoBack } = useGoBack();

  const {
    params: { bookingId },
  } = useRoute<RouteProp<RootStackParamList, "BookingDetails">>();

  useEffect(() => {
    if (!bookingId) return;
    dispatch(appActions.setLoading(true));
    dispatch(bookingActions.getBookingDetailsStart(bookingId));

    return () => {
      dispatch(bookingActions.resetLoading());
    };
  }, [bookingId]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Readonly<BookingDetailModel>>) => {
    return <BookingDetailsItem row={item} />;
  }, []);

  const keyExtractor = useCallback((item: BookingDetailModel, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content
          titleStyle={{ fontSize: 16, fontWeight: "700" }}
          title={`Chi tiết đặt phòng ${bookingId}`}
        />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <FlatList
          data={dataBookingDetails}
          renderItem={renderItem as any}
          keyExtractor={keyExtractor}
        />
      </View>

      <SurfaceButton
        label={`Tổng tiền ${fNumber(
          dataBookingDetails.reduce((total, value) => (total += value?.bill?.total_price || 0), 0)
        )}  VNĐ`}
      />
    </Container>
  );
};

export default BookingDetailsScreen;
