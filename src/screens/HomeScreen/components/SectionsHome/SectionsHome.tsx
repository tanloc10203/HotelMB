import RoomItem, { RoomItemProps } from "@/components/shared/RoomItem";
import { ColorSchemas } from "@/constants/colors";
import { useRoom } from "@/features/room/roomSelector";
import { roomActions } from "@/features/room/roomSlice";
import instance from "@/services/axios/configAxios";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import React, { FC, useCallback, useMemo, useState } from "react";
import { RefreshControl, SectionList, SectionListRenderItemInfo, Text, View } from "react-native";
import { Button } from "react-native-paper";
import ActionsHome from "../ActionsHome";
import ListCarousel from "../ListCarousel";
import useStyles from "./SectionHomeStyles";
import { useBanner } from "@/features/app";

const SectionsHome: FC = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { data } = useRoom();
  const { data: dataBanner } = useBanner();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const DATA = [
    {
      title: "Rooms",
      data: data,
    },
  ];

  const renderItem = useMemo(
    () =>
      ({ index, item }: SectionListRenderItemInfo<RoomItemProps>) => {
        if (!item.is_public) return null;

        return <RoomItem {...item} />;
      },
    []
  );

  const handleOnPressPayment = useCallback(async () => {
    try {
      const response: string = await instance.get("/get-payment");

      if (response) {
        // console.log("====================================");
        // console.log(`url => `, response);
        // console.log("====================================");
        // Linking.openURL(response);
        navigate("ZaloPayment", { url: response });
      }
    } catch (error) {
      console.log(`error`, error);
    }
  }, []);

  const handleRefreshing = useCallback(() => {
    dispatch(roomActions.setFilter({ limit: 9999, page: 1 }));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshing}
            tintColor="#F8852D"
          />
        }
        refreshing={refreshing}
        onRefresh={handleRefreshing}
        ListHeaderComponent={() => (
          <View>
            <ListCarousel
              images={dataBanner.map((t) => t.url)}
            />

            {/* <Button onPress={handleOnPressPayment}>Thanh toán ZaloPay</Button> */}

            {/* <ActionsHome /> */}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        sections={DATA}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={renderItem as any}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.wrapperActions}>
            <Text style={styles.header}>{title}</Text>
            <Button
              textColor={ColorSchemas.blue}
              mode="text"
              onPress={() => console.log("Pressed")}
            >
              Xem Tất cả
            </Button>
          </View>
        )}
      />
    </View>
  );
};

export default SectionsHome;
