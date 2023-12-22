import Container from "@/components/shared/Container";
import Alert from "@/components/ui/Alert";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { bookingActions, useBooking } from "@/features/booking";
import { BookingModel } from "@/models/booking.model";
import { useAppDispatch } from "@/stores/hooks";
import { SPACING } from "@/utils/scale";
import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback, useState } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl, View } from "react-native";
import { Appbar } from "react-native-paper";
import BookingItem from "./components/BookingItem";
import CancelDialog from "./components/CancelDialog";

type Props = {};

const BookingScreen: FC<Props> = () => {
  const {
    screenBookings: { data },
    bookingId,
  } = useBooking();
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const showDialog = useCallback((bookingId: string) => {
    dispatch(bookingActions.setBookingId(bookingId));
    setVisible(true);
  }, []);

  const hideDialog = useCallback(() => {
    dispatch(bookingActions.setBookingId(""));
    setVisible(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      dispatch(appActions.setLoading(true));
      dispatch(bookingActions.getBookingScreenStart(String(userId)));
    }, [userId])
  );

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Readonly<BookingModel>>) => {
    return <BookingItem onCancel={showDialog} row={item} />;
  }, []);

  const keyExtractor = useCallback((item: BookingModel, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  const handleRefreshing = useCallback(() => {
    if (!userId) return;
    dispatch(appActions.setLoading(true));
    dispatch(bookingActions.getBookingScreenStart(String(userId)));
  }, [userId]);

  const handleOnAgreeCancel = useCallback(() => {
    if (!bookingId) return;
    setVisible(false);

    dispatch(appActions.setLoading(true));
    dispatch(bookingActions.cancelStart(bookingId));
  }, [bookingId]);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Content title="Booking" />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefreshing} tintColor="#F8852D" />
          }
          refreshing={false}
          onRefresh={handleRefreshing}
          ListHeaderComponent={
            <View style={{ padding: SPACING }}>
              <CancelDialog visible={visible} onClose={hideDialog} onAgree={handleOnAgreeCancel} />
              <Alert color="info" text="Bấm vào để xem chi tiết" />
            </View>
          }
          data={data}
          renderItem={renderItem as any}
          keyExtractor={keyExtractor}
        />
      </View>
    </Container>
  );
};

export default BookingScreen;
