import { ColorSchemas } from "@/constants/colors";
import { useAuth } from "@/features/auth";
import { notificationActions, useNotification } from "@/features/notification";
import { NotificationModel } from "@/models/notification.model";
import { useAppDispatch } from "@/stores/hooks";
import { scale, verticalScale } from "@/utils/scale";
import React, { FC, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SectionListRenderItemInfo,
  View,
} from "react-native";
import NotificationItem from "../NotificationItem";

const ListNotifications: FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const { data, filters, pagination, isLoading } = useNotification();

  console.log("====================================");
  console.log(`pagination`, JSON.stringify(pagination, null, 4));
  console.log("====================================");

  const renderItem = useCallback(
    ({ item }: SectionListRenderItemInfo<NotificationModel>) => <NotificationItem row={item} />,
    []
  );

  const keyExtractor = useCallback((item: NotificationModel, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  const handleRefreshing = useCallback(() => {
    if (!userId) return;

    // dispatch(appActions.setLoading(true));
    dispatch(notificationActions.reSetData());
    dispatch(notificationActions.setFilter({ ...filters, page: 1 }));

    // dispatch(
    //   notificationActions.getNotificationStart({
    //     ...filters,
    //     page: 1,
    //     actor_type: "customer",
    //     user_id: userId,
    //     order: "created_at",
    //   })
    // );
  }, [userId, filters]);

  const renderFooter = useCallback(() => {
    if (isLoading !== "pending") return null;

    return (
      <View style={{ marginVertical: verticalScale(20) }}>
        <ActivityIndicator size={"small"} color={ColorSchemas.blue} />
      </View>
    );
  }, [isLoading]);

  const handleFilter = useCallback(() => {
    if (filters.page + 1 > pagination.totalPage) return;

    dispatch(
      notificationActions.setFilter({
        ...filters,
        page: filters.page + 1,
      })
    );
  }, [filters, pagination]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefreshing} tintColor="#F8852D" />
        }
        refreshing={false}
        onRefresh={handleRefreshing}
        data={data}
        renderItem={renderItem as any}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ margin: scale(4) }} />}
        ListFooterComponent={renderFooter}
        onEndReached={handleFilter}
      />
    </View>
  );
};

export default ListNotifications;
