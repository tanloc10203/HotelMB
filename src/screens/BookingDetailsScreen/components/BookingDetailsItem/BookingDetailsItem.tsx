import { BLUR_HASH } from "@/constants/common";
import { formatDate } from "@/helpers/date.helper";
import { colorBillStatus, convertBillStatus } from "@/models/bill.model";
import { BookingDetailModel } from "@/models/bookingDetails.model";
import { ImagesRoomType } from "@/models/roomType.model";
import BookingItemLabel from "@/screens/BookingScreen/components/BookingItem/BookingItemLabel";
import { fNumber } from "@/utils/formatNumber";
import { Image } from "expo-image";
import React, { FC, memo, useCallback, useState } from "react";
import { FlatList, ListRenderItemInfo, Pressable, View } from "react-native";
import ImageView from "react-native-image-viewing";
import useStyles from "./BookingDetailsItemStyles";

type BookingDetailsItemProps = {
  row: BookingDetailModel;
};

const BookingDetailsItem: FC<BookingDetailsItemProps> = ({ row }) => {
  const styles = useStyles();
  const [image] = useState<string[]>(
    row?.room?.roomType?.images ? row?.room?.roomType?.images?.map((r) => r.src) : []
  );
  const [visible, setIsVisible] = useState(false);
  const [idxImg, setIdxImg] = useState(0);

  const handleClickImage = useCallback((index: number) => {
    setIdxImg(index);
    setIsVisible(true);
  }, []);

  const renderGallery = useCallback(
    ({ item: { src }, index }: ListRenderItemInfo<ImagesRoomType>) => (
      <Pressable onPress={() => handleClickImage(index)} style={styles.galleryCard}>
        <Image
          source={{
            uri: src,
          }}
          style={styles.galleryImage}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={1000}
        />
      </Pressable>
    ),

    []
  );

  return (
    <View style={styles.surface}>
      {image.length ? (
        <ImageView
          images={image.map((r) => ({ uri: r }))}
          imageIndex={idxImg}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      ) : null}

      <Image
        source={{ uri: row?.room?.photo_publish }}
        style={styles.image}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={1000}
      />

      <View style={{ marginBottom: 5 }}>
        <FlatList
          nestedScrollEnabled
          data={row?.room?.roomType?.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderGallery}
        />
      </View>

      <BookingItemLabel label="Loại phòng" value={row?.room?.roomType?.name!} />

      <BookingItemLabel label="Số phòng" value={row?.room_number_id} />

      <BookingItemLabel label="Thành tiền" value={fNumber(row?.bill?.total_price || 0)} />

      <View style={styles.line} />

      <BookingItemLabel
        label="Ngày nhận"
        value={formatDate(row?.check_in, "DD/MM/YYYY HH:mm:ss")}
      />

      {row?.status === "in_progress" ||
      row?.status === "checked_out" ||
      row?.status === "completed" ? (
        <BookingItemLabel
          label="Đã nhận lúc"
          value={formatDate(row?.checked_in || "", "DD/MM/YYYY HH:mm:ss")}
        />
      ) : null}

      <BookingItemLabel
        label="Ngày trả"
        value={formatDate(row?.check_out, "DD/MM/YYYY HH:mm:ss")}
      />

      {row?.checked_out ? (
        <BookingItemLabel
          label="Đã trả lúc"
          value={formatDate(row?.checked_out || "", "DD/MM/YYYY HH:mm:ss")}
        />
      ) : null}

      <BookingItemLabel
        label="Trạng thái thanh toán"
        value={convertBillStatus(row?.bill?.status || "others")}
        color={colorBillStatus(row?.bill?.status || "others")}
      />

      <BookingItemLabel label="Số lượng người lớn" value={`${row?.adults}`} />

      <BookingItemLabel label="Số lượng trẻ em" value={`${row?.children}`} />
    </View>
  );
};

export default memo(BookingDetailsItem);
