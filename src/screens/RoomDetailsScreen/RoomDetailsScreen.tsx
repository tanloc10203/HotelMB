import Container from "@/components/shared/Container";
import OverlayLoading from "@/components/ui/OverlayLoading";
import { ColorSchemas } from "@/constants/colors";
import { BLUR_HASH } from "@/constants/common";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { bookingActions } from "@/features/booking";
import { useRoom } from "@/features/room/roomSelector";
import { roomActions } from "@/features/room/roomSlice";
import { useTax } from "@/features/tax/taxSelector";
import { RateState, StateRate } from "@/models/rate.model";
import { ImagesRoomType } from "@/models/roomType.model";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { convertAmenityIcon } from "@/utils/amenity";
import { calcWithDiscount } from "@/utils/common";
import { fNumber } from "@/utils/formatNumber";
import { SPACING } from "@/utils/scale";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Animated, FlatList, ListRenderItemInfo, Pressable, Text, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { Button, Surface } from "react-native-paper";
import ListCarousel from "../HomeScreen/components/ListCarousel";
import useStyles from "./RoomDetailsStyles";
import HeadTitle from "./components/HeadTitle";
import HeaderRoomDetails from "./components/HeaderRoomDetails";
import ModalRate from "./components/ModalRate";
import ReviewItem from "./components/ReviewItem";

const RoomDetailsScreen: FC = () => {
  const {
    params: { id, rate },
  } = useRoute<RouteProp<RootStackParamList, "RoomDetails">>();

  const { userId } = useAuth();

  const styles = useStyles();
  const offset = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { dataSingle, isLoading, rates, visible: visibleRate } = useRoom();
  const { data } = useTax();
  const [image, setImage] = useState<string[]>([]);
  const [visible, setIsVisible] = useState(false);
  const [idxImg, setIdxImg] = useState(0);

  useEffect(() => {
    if (!rate) return;

    if (rate.isRate) {
      dispatch(roomActions.setVisible(true));
    }
  }, [rate]);

  useLayoutEffect(() => {
    if (!id) return;

    dispatch(roomActions.getDataSingleStart(id));
    dispatch(roomActions.getRateStart(id));
  }, [id]);

  useEffect(() => {
    if (!dataSingle || !dataSingle?.roomType?.images?.length) return;

    setImage(dataSingle.roomType.images.map((t) => t.src));
  }, [dataSingle]);

  const handleClickImage = useCallback((index: number) => {
    setIdxImg(index);
    setIsVisible(true);
  }, []);

  const renderGallery = useMemo(
    () =>
      ({ item: { src }, index }: ListRenderItemInfo<ImagesRoomType>) =>
        (
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

  const handleNavigateBookingCalendar = useCallback(() => {
    if (!dataSingle) return;
    dispatch(bookingActions.setRoomBooking(dataSingle));
    navigation.navigate("BookingCalendar");
  }, [dataSingle]);

  const onPressSeeAllGallery = () => {};

  const handleCloseRate = useCallback(() => dispatch(roomActions.setVisible(false)), []);

  const handleSubmit = useCallback(
    (state: StateRate) => {
      if (!rate || !rate?.booking_id || !dataSingle?.id || !userId) return;

      const data: RateState = {
        booking_id: rate?.booking_id,
        comment: state.comment,
        start: state.rate,
        room_id: dataSingle.id,
        customer_id: Number(userId),
      };

      dispatch(appActions.setLoading(true));
      dispatch(roomActions.addRateStart(data));
    },
    [userId, rate, dataSingle]
  );

  if (isLoading === "pending") {
    return <OverlayLoading visible />;
  }

  return (
    <Container>
      <HeaderRoomDetails scrollA={offset} title={dataSingle?.roomType?.name ?? ""} />

      {visibleRate && dataSingle ? (
        <ModalRate
          visible={visibleRate}
          room={dataSingle}
          onClose={handleCloseRate}
          onSubmit={handleSubmit}
        />
      ) : null}

      {image.length ? (
        <ImageView
          images={image.map((r) => ({ uri: r }))}
          imageIndex={idxImg}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      ) : null}

      <>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
            useNativeDriver: true,
          })}
        >
          <View>
            {image.length ? <ListCarousel onPressImage={handleClickImage} images={image} /> : null}
          </View>

          <View style={styles.content}>
            <Text style={[styles.title, styles.spacing]}>{dataSingle?.roomType?.name}</Text>

            <Text style={[styles.descriptionText, styles.spacing]}>
              Số lượng khách tối đa {dataSingle?.adults} người, trẻ em {dataSingle?.children || 0}
            </Text>

            <View style={[styles.borderBottom, styles.spacing]} />

            <View>
              <HeadTitle title="Danh sách ảnh" onPress={onPressSeeAllGallery} />

              <View style={{ marginHorizontal: 8 }}>
                <FlatList
                  style={styles.gallery}
                  nestedScrollEnabled
                  data={dataSingle?.roomType.images}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={renderGallery}
                />
              </View>
            </View>

            <View>
              <HeadTitle title="Mô tả" />

              <View>
                <Text style={[styles.descriptionText, styles.spacing]}>
                  {dataSingle?.roomType.desc}
                </Text>
              </View>
            </View>

            <View>
              <HeadTitle title="Tiện ích" />

              <View style={[styles.wrapperAmenity]}>
                {dataSingle?.roomType?.amenities?.length
                  ? dataSingle.roomType.amenities.map((amenity, index) => {
                      return (
                        <View style={styles.amenityItem} key={index}>
                          {convertAmenityIcon(amenity.name)}
                          <Text style={styles.amenityItemText}>{amenity.name}</Text>
                        </View>
                      );
                    })
                  : null}
              </View>
            </View>

            {dataSingle?.is_breakfast ||
            dataSingle?.is_extra_beds ||
            dataSingle?.is_pets ||
            dataSingle?.is_smoking ? (
              <View>
                <HeadTitle title="Chính sách" />

                <View style={[styles.wrapperAmenity]}>
                  <Text>{dataSingle?.is_breakfast ? "Bữa sáng miễn phí" : null}</Text>
                </View>

                <View style={[styles.wrapperAmenity]}>
                  <Text>
                    {dataSingle?.is_extra_beds ? "Phí thêm nếu sử dụng thêm giường" : null}
                  </Text>
                </View>

                <View style={[styles.wrapperAmenity]}>
                  <Text>{dataSingle?.is_pets ? "Cho phép thú cưng" : null}</Text>
                </View>

                <View style={[styles.wrapperAmenity]}>
                  <Text>{dataSingle?.is_smoking ? "Cho phép hút thuốc" : null}</Text>
                </View>
              </View>
            ) : null}

            {rates.length ? (
              <View>
                <HeadTitle title="Đánh giá" />

                <View style={{ paddingHorizontal: SPACING }}>
                  {rates.map((rate) => {
                    if (rate.is_hidden) return null;

                    return (
                      <ReviewItem
                        key={rate.id}
                        createdAt={rate.created_at!}
                        display_name={rate?.customer?.display_name || ""}
                        image={rate?.customer?.photo || ""}
                        reviewContent={rate.comment}
                        star={rate.start}
                        id={rate.id}
                      />
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>
        </Animated.ScrollView>

        <Surface
          style={styles.book}
          elevation={5}
          theme={{ colors: { elevation: { level5: ColorSchemas.white } } }}
        >
          <View>
            {dataSingle?.discount &&
            dataSingle.discount?.status !== "expired" &&
            dataSingle.discount.is_public ? (
              <>
                <Text style={[styles.price, { color: ColorSchemas.red }]}>
                  {fNumber(
                    calcWithDiscount(
                      dataSingle?.roomType?.prices?.price_online!,
                      dataSingle?.discount?.price || 0
                    )
                  )}
                  <Text style={[styles.subPrice, { textDecorationLine: "line-through" }]}>
                    {" / "}
                    {fNumber(calcWithDiscount(dataSingle?.roomType?.prices?.price_online!, 0))}
                  </Text>
                </Text>
              </>
            ) : (
              <Text style={styles.price}>
                {fNumber(calcWithDiscount(dataSingle?.roomType?.prices?.price_online!, 0))}
              </Text>
            )}

            <Text style={styles.tax}>(+ {data.length > 0 ? data[0].rate : "0"}% thuế VAT)</Text>
          </View>

          <Button
            style={styles.button}
            contentStyle={styles.bookButton}
            onPress={handleNavigateBookingCalendar}
            mode="contained"
            buttonColor={ColorSchemas.blue}
          >
            Đặt ngay
          </Button>
        </Surface>
      </>
    </Container>
  );
};

export default RoomDetailsScreen;
