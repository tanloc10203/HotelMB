import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import useStyles from "./HeadTitleStyles";

type HeadTitleProps = {
  title: string;
  onPress?: () => void;
};

const HeadTitle: FC<HeadTitleProps> = ({ title, onPress }) => {
  const styles = useStyles();

  return (
    <View style={[styles.head, styles.spacing]}>
      <Text style={styles.headLeft}>{title}</Text>

      {onPress ? (
        <Pressable>
          <Text style={styles.headRight}>Xem tất cả</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default HeadTitle;
