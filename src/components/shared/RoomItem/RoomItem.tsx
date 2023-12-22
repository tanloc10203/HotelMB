import { ColorSchemas } from "@/constants/colors";
import { BLUR_HASH } from "@/constants/common";
import { IRoomResponse } from "@/models/room.model";
import { fNumber } from "@/utils/formatNumber";
import { scale } from "@/utils/scale";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { FC, useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import useStyles from "./RoomItemStyles";
import { calcWithDiscount } from "@/utils/common";

export type RoomItemProps = {
  card?: boolean;
} & IRoomResponse;

const RoomItem: FC<RoomItemProps> = (props) => {
  const { photo_publish, roomType, id, card } = props;
  const styles = useStyles(card);
  const navigation = useNavigation();

  // console.log("====================================");
  // console.log(`room Item`, JSON.stringify(props, null, 4));
  // console.log("====================================");

  const handleOnPressRoomDetails = useCallback(() => {
    if (!id) return;
    navigation.navigate("RoomDetails", { id });
  }, [id]);

  const Component = useMemo(() => (card ? View : Surface), [card]);

  return (
    <Component
      style={styles.surface}
      {...(card
        ? null
        : {
            elevation: 2,
            theme: {
              colors: {
                elevation: { level2: ColorSchemas.white },
              },
            },
          })}
    >
      <Pressable onPress={handleOnPressRoomDetails} style={styles.wrapper}>
        <Image
          source={{ uri: photo_publish }}
          style={styles.image}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={1000}
        />

        <View style={styles.wrapperContent}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {roomType?.name}
            </Text>
            <Text style={styles.desc} numberOfLines={4}>
              {roomType?.desc}
            </Text>
          </View>
          <View>
            {props?.discount && props.discount?.status !== "expired" && props.discount.is_public ? (
              <>
                <Text style={[styles.price, { color: ColorSchemas.red }]}>
                  {fNumber(
                    calcWithDiscount(roomType?.prices?.price_online, props?.discount?.price || 0)
                  )}
                </Text>
                <Text
                  style={[
                    styles.price,
                    { textDecorationLine: "line-through", fontSize: scale(13) },
                  ]}
                >
                  {fNumber(calcWithDiscount(roomType?.prices?.price_online, 0))}
                </Text>
              </>
            ) : (
              <Text style={[styles.price]}>
                {fNumber(calcWithDiscount(roomType?.prices?.price_online, 0))}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Component>
  );
};

export default RoomItem;
