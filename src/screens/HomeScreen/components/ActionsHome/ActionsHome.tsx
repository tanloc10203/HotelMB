import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import useStyles from "./ActionsHomeStyle";

const ActionsHome: FC = () => {
  const styles = useStyles();

  return (
    <View>
      <View style={[styles.actions, styles.container]}>
        <View style={styles.groupInput}>
          <View style={styles.iconLeft}>
            <EvilIcons name="search" size={24} color="black" />
          </View>
          <TextInput placeholder="HSHDFS" style={styles.input} />
        </View>

        <View style={{}}>
          <View style={styles.icon}>
            <Ionicons name="git-commit-outline" size={14} color="white" />
            <Ionicons name="git-commit-outline" size={14} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActionsHome;

const styles = StyleSheet.create({});
