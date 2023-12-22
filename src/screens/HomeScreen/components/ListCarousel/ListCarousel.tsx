import { BLUR_HASH } from "@/constants/common";
import { Image } from "expo-image";
import React, { FC, useCallback } from "react";
import { ListRenderItemInfo, Pressable, View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import useStyles from "./ListCarouselStyle";

type ListCarouselProps = {
  images?: string[];
  onPressImage?: (index: number) => void;
  autoplay?: boolean;
  autoplayDelay?: number;
  autoplayLoop?: boolean;
};

const IMAGE = [
  "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
  "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
  "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
  "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
  "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
];

const ListCarousel: FC<ListCarouselProps> = ({ images = IMAGE, onPressImage, ...props }) => {
  const styles = useStyles();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      return (
        <Pressable onPress={() => onPressImage?.(index)} style={styles.child}>
          <Image
            source={{ uri: item }}
            style={styles.imgBackground}
            placeholder={BLUR_HASH}
            contentFit="fill"
            transition={200}
          />
        </Pressable>
      );
    },
    [onPressImage, images]
  );

  return (
    <View>
      <SwiperFlatList index={2} data={images} renderItem={renderItem} {...props} />
    </View>
  );
};

export default ListCarousel;
