import Container from "@/components/shared/Container";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions, useBanner, useHotel } from "@/features/app";
import { useAppDispatch } from "@/stores/hooks";
import { SPACING } from "@/utils/scale";
import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import ListCarousel from "../HomeScreen/components/ListCarousel";

const InformationHotelScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useHotel();
  const { data: banners } = useBanner();

  useFocusEffect(
    useCallback(() => {
      dispatch(appActions.setLoading(true));
      dispatch(appActions.getHotelStart());
    }, [])
  );

  return (
    <Container>
      <AppbarOverride title="Thông tin khách sạn" isGoBack />

      <ListCarousel autoplay autoplayDelay={2} autoplayLoop images={banners.map((t) => t.url)} />

      <View style={styles.container}>
        <View style={styles.wrapperText}>
          <Text>Tên khách sạn: </Text>
          <Text style={styles.strongText}>{data[0]?.name}</Text>
        </View>
        <View style={styles.wrapperText}>
          <Text>Địa chỉ: </Text>
          <Text style={styles.strongText}>{data[0]?.address}</Text>
        </View>
        <View style={styles.wrapperText}>
          <Text>Số điện thoại liên hệ: </Text>
          <Text style={styles.strongText}>{data[0]?.phone_number}</Text>
        </View>
        <View style={styles.wrapperText}>
          <Text>Email liên hệ: </Text>
          <Text style={styles.strongText}>{data[0]?.email}</Text>
        </View>
        <View style={styles.wrapperText}>
          <Text>Giới thiệu: </Text>
          <Text style={styles.strongText}>{data[0]?.description}</Text>
        </View>
      </View>
    </Container>
  );
};

export default InformationHotelScreen;

const styles = StyleSheet.create({
  container: {
    padding: SPACING,
    gap: 10,
    flex: 1,
  },

  wrapperText: {
    flexDirection: "row",
  },

  strongText: {
    fontWeight: "700",
  },
});
