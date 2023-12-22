import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const FONT_SIZE = 18;
const COLOR = "black";

export const convertAmenityIcon = (amenity: string) => {
  const _amenity = amenity.toLowerCase();

  switch (true) {
    case Boolean(_amenity.match(/giường ngủ/)):
      return <FontAwesome name="bed" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/bàn ghế/)):
      return <MaterialCommunityIcons name="table-chair" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/tủ quần áo/)):
      return <MaterialCommunityIcons name="file-cabinet" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/tivi/)):
      return <MaterialCommunityIcons name="television" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/điều hòa/)) || Boolean(_amenity.match(/máy lạnh/)):
      return <Entypo name="air" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/quạt/)):
      return <MaterialCommunityIcons name="fan" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/điện thoại/)):
      return <Entypo name="phone" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/internet/)) || Boolean(_amenity.match(/wifi/)):
      return <AntDesign name="wifi" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/két an toàn/)):
      return <MaterialCommunityIcons name="safe-square" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/đồ dùng phòng tắm/)):
      return <MaterialCommunityIcons name="scale-bathroom" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/bồn tắm/)) || Boolean(_amenity.match(/bồn tắm nước nóng/)):
      return <FontAwesome name="bathtub" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/vòi sen/)):
      return <FontAwesome5 name="shower" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/gương/)):
      return <MaterialCommunityIcons name="mirror-rectangle" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/bàn trang điểm/)):
      return <MaterialCommunityIcons name="table-star" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/toilet/)):
      return <FontAwesome5 name="toilet" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/khăn giấy/)):
      return <FontAwesome5 name="box-tissue" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/máy sấy tóc/)) || Boolean(_amenity.match(/máy sấy quần áo/)):
      return <MaterialCommunityIcons name="hair-dryer" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/nhà hàng/)):
      return <Ionicons name="restaurant" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/bar/)) || Boolean(_amenity.match(/minibar/)):
      return <Ionicons name="barcode" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/hồ bơi/)):
      return <MaterialCommunityIcons name="pool" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/phòng tập thể dục/)):
      return <MaterialIcons name="hdr-strong" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/spa/)) || Boolean(_amenity.match(/phòng message/)):
      return <FontAwesome5 name="spa" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/khu vui chơi trẻ em/)) ||
      Boolean(_amenity.match(/khu vực giải trí/)) ||
      Boolean(_amenity.match(/phòng karaoke/)) ||
      Boolean(_amenity.match(/phòng chơi game/)):
      return <Ionicons name="ios-play-circle-outline" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/phòng họp/)):
      return <MaterialIcons name="meeting-room" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/dịch vụ giặt ủi/)):
      return <MaterialIcons name="local-laundry-service" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/dịch vụ đưa đón sân bay/)):
      return <MaterialIcons name="airport-shuttle" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/dịch vụ đổi tiền/)):
      return <FontAwesome name="exchange" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/dịch vụ du lịch/)):
      return <MaterialIcons name="card-travel" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/máy pha cà phê, trà/)):
      return <MaterialCommunityIcons name="coffee-maker" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/tủ lạnh mini/)):
      return <MaterialCommunityIcons name="fridge" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/phòng tắm hơi/)) || Boolean(_amenity.match(/phòng xông hơi/)):
      return <Entypo name="rainbow" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/phòng chiếu phim/)):
      return <AntDesign name="smile-circle" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/khu vườn/)):
      return <MaterialIcons name="scatter-plot" size={FONT_SIZE} color={COLOR} />;
    case Boolean(_amenity.match(/két an toàn điện tử/)):
      return <MaterialCommunityIcons name="safe" size={FONT_SIZE} color={COLOR} />;

    default:
      return <AntDesign name="questioncircle" size={FONT_SIZE} color={COLOR} />;
  }
};
