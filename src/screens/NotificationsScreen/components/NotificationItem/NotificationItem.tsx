import { BLUR_HASH } from "@/constants/common";
import { appActions } from "@/features/app";
import { notificationActions } from "@/features/notification";
import { NotificationModel, NotificationTypes } from "@/models/notification.model";
import { useAppDispatch } from "@/stores/hooks";
import { fToNow } from "@/utils/formatTime";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { isNumber } from "lodash";
import React, { FC, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useStyles from "./NotificationItemStyles";

export type NotificationItemProps = {
  row: NotificationModel;
};

const NotificationItem: FC<NotificationItemProps> = ({ row }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const styles = useStyles(isNumber(row?.is_read) ? Boolean(row?.is_read === 1) : row?.is_read);

  const handleUpdateIsRead = useCallback(() => {
    if (!row.id) return;

    if (!row.is_read) {
      dispatch(appActions.setLoading(true));
      dispatch(notificationActions.updateIsReadStart(`${row.id}`));
    }

    if (row.notification_type === NotificationTypes.DELETE_AFTER_3_HOUR) return;

    navigation.navigate("BookingDetails", { bookingId: row.entity_id });
  }, [row]);

  return (
    <TouchableOpacity
      onPress={handleUpdateIsRead}
      activeOpacity={0.65}
      style={styles.wrapperCardItem}
    >
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
        }}
        style={styles.image}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={1000}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{row.title}</Text>
        <Text style={styles.content}>{row.body}</Text>
        <Text style={styles.content}>{fToNow(row.created_at || "")}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
