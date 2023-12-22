import Container from "@/components/shared/Container";
import { useGlobalStyles } from "@/components/shared/GlobalStyles";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import AppbarOverride from "@/components/ui/AppbarOverride";
import OverlayLoading from "@/components/ui/OverlayLoading";
import { ColorSchemas } from "@/constants/colors";
import { bookingActions, useBooking } from "@/features/booking";
import { fCurrency } from "@/utils/formatNumber";
import React, { FC, useCallback } from "react";
import { FlatList, ListRenderItemInfo, Pressable, Text, View } from "react-native";
import useStyles from "./styles";
import { RadioButton } from "react-native-paper";
import { useAppDispatch } from "@/stores/hooks";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "@/utils/scale";
import { calcWithDiscount } from "@/utils/common";

type BookingSelectedRoomAvailableScreenProps = {};

const BookingSelectedRoomAvailableScreen: FC<BookingSelectedRoomAvailableScreenProps> = () => {
  const { roomBooking, roomAvailable, loading, roomQuantity } = useBooking();
  const styles = useStyles();
  const stylesGlobal = useGlobalStyles();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSelectRoomQuantity = useCallback((quantity: number) => {
    dispatch(bookingActions.setRoomQuantity(quantity));
  }, []);

  const renderItem = useCallback(
    ({ index }: ListRenderItemInfo<any>) => {
      if (!roomBooking) return null;

      const _index = index + 1;

      let _priceOnline = roomBooking?.roomType.prices?.price_online || 0;

      if (
        roomBooking.discount &&
        roomBooking.discount.status !== "expired" &&
        roomBooking.discount.is_public
      ) {
        _priceOnline = calcWithDiscount(_priceOnline, roomBooking.discount?.price);
      }

      const _price = _priceOnline * _index;

      return (
        <Pressable
          onPress={() => handleSelectRoomQuantity(_index)}
          style={[
            styles.item,
            { borderColor: roomQuantity === _index ? ColorSchemas.blue : ColorSchemas.white },
          ]}
        >
          <Text style={styles.itemText}>
            {`Số lượng ${_index} phòng. Có giá `}
            <Text style={styles.textPrice}>{fCurrency(_price)}</Text>
          </Text>

          <RadioButton
            value={`${_index}`}
            status={roomQuantity === _index ? "checked" : "unchecked"}
            onPress={() => handleSelectRoomQuantity(_index)}
            color={styles.colorCheckBox.color}
          />
        </Pressable>
      );
    },
    [roomBooking, roomQuantity]
  );

  const onPressNavigationFillInfo = useCallback(() => {
    navigation.navigate("BookingInfoCustomer");
  }, []);

  return (
    <Container style={{ backgroundColor: ColorSchemas.greyLighterV3 }}>
      <AppbarOverride isGoBack title="Chọn số lượng phòng" />

      <OverlayLoading visible={loading === "pending"} />

      <View style={[stylesGlobal.flex, { paddingVertical: verticalScale(20) }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[...Array(roomAvailable)]}
          renderItem={renderItem}
        />
      </View>

      <SurfaceButton label="Tiếp tục điền thông tin" onPress={onPressNavigationFillInfo} />
    </Container>
  );
};

export default BookingSelectedRoomAvailableScreen;
