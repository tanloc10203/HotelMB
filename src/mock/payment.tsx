import { BLUR_HASH } from "@/constants/common";
import { Image } from "expo-image";

export const payments = [
  // {
  //   title: "Thanh toán trong kì nghỉ",
  //   value: "OFFLINE",
  //   image: (styles: any) => (
  //     <Image
  //       source={require("@/assets/icon/3009489.png")}
  //       style={styles}
  //       placeholder={BLUR_HASH}
  //       contentFit="cover"
  //       transition={1000}
  //     />
  //   ),
  // },
  {
    title: "Thanh toán ZaloPay",
    value: "online",
    image: (styles: any) => (
      <Image
        source={require("@/assets/icon/ZaloPay-vuong.png")}
        style={styles}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={1000}
      />
    ),
  },
];
