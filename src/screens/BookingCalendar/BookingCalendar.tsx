import Container from "@/components/shared/Container";
import InputQuantity from "@/components/shared/InputQuantity";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { useTheme } from "@/contexts/ThemeContext";
import { appActions } from "@/features/app";
import { bookingActions, useBooking } from "@/features/booking";
import { useAppDispatch } from "@/stores/hooks";
import { CalendarsPickerRange } from "@/types/datePickerRange";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useCallback, useMemo, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import useStyles from "./BookingCalendarStyles";
import Calendar from "./components/Calendar";

type GuestBooking = {
  adults: number;
  children: number;
};

const BookingCalendar: FC = () => {
  const styles = useStyles();
  const { themeType } = useTheme();
  const [state, setState] = useState<CalendarsPickerRange>({
    selectedEndDate: null,
    selectedStartDate: null,
  });
  const [guests, setGuests] = useState<GuestBooking>({ adults: 1, children: 0 });
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { roomBooking: room, loading } = useBooking();

  const handleChangeCalendar = (args: Partial<CalendarsPickerRange>) => {
    setState((prev) => ({ ...prev, ...args }));
  };

  const startDate = useMemo(
    () => (state.selectedStartDate ? state.selectedStartDate.format("DD-MM") : null),
    [state.selectedStartDate]
  );

  const endDate = useMemo(
    () => (state.selectedEndDate ? state.selectedEndDate.format("DD-MM") : null),
    [state.selectedEndDate]
  );

  const handleNavigationInfoCustomer = useCallback(() => {
    const { selectedEndDate, selectedStartDate } = state;

    if (!room) return;

    if (!selectedStartDate) {
      dispatch(
        appActions.setSnackbar({
          open: true,
          text: "Vui lòng chọn ngày check-in",
          type: "error",
          duration: 1000,
        })
      );

      return;
    }

    if (!selectedEndDate) {
      dispatch(
        appActions.setSnackbar({
          open: true,
          text: "Vui lòng chọn ngày check-out",
          type: "error",
          duration: 1000,
        })
      );

      return;
    }

    dispatch(
      bookingActions.setBookingCalendar({
        ...guests,
        checkIn: selectedStartDate.toString(),
        checkOut: selectedEndDate.toString(),
      })
    );

    dispatch(
      bookingActions.getRoomAvailableStart({
        check_in: selectedStartDate.toString(),
        check_out: selectedEndDate.toString(),
        room_id: room.id!,
      })
    );

    navigation.navigate("BookingSelectedRoomAvailable");
  }, [room, state, guests]);

  return (
    <Container>
      <StatusBar
        backgroundColor={"transparent"}
        translucent
        animated
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
      />

      <AppbarOverride title="Chọn ngày" isGoBack />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollView}>
          <Calendar onChange={handleChangeCalendar} />

          <View style={styles.wrapperReservation}>
            <View>
              <Text style={styles.reservationTitle}>Check in</Text>
              <View style={styles.wrapperCalendar}>
                <Text style={styles.reservationDay}>{startDate ?? "..."}</Text>
                <AntDesign name="calendar" size={23} color="black" />
              </View>
            </View>
            <View>
              <Ionicons name="arrow-forward-outline" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.reservationTitle}>Check out</Text>
              <View style={styles.wrapperCalendar}>
                <Text style={styles.reservationDay}>{endDate ?? "..."}</Text>
                <AntDesign name="calendar" size={23} color="black" />
              </View>
            </View>
          </View>

          <View style={styles.wrapperGuest}>
            <View>
              <Text style={styles.reservationTitle}>Số lượng khách</Text>
            </View>

            <View style={styles.cardGuest}>
              <View style={styles.groupGuest}>
                <Text style={styles.groupGuestLabel}>Người lớn</Text>

                <InputQuantity
                  key={"adults"}
                  minValue={1}
                  maxValue={room?.adults}
                  value={guests.adults}
                  onChange={(value) => setGuests((prev) => ({ ...prev, adults: value }))}
                />
              </View>

              <View style={styles.groupGuest}>
                <Text style={styles.groupGuestLabel}>Trẻ em</Text>

                <InputQuantity
                  key={"children"}
                  value={guests.children}
                  maxValue={room?.children || 0}
                  onChange={(value) => setGuests((prev) => ({ ...prev, children: value }))}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <SurfaceButton
        label="Tiếp tục"
        onPress={handleNavigationInfoCustomer}
        loading={loading === "pending"}
      />
    </Container>
  );
};

export default BookingCalendar;
