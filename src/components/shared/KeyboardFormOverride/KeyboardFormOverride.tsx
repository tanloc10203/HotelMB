import React, { FC, ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useGlobalStyles } from "../GlobalStyles";
import SurfaceButton from "./SurfaceButton";
import { verticalScale } from "@/utils/scale";

type KeyboardFormOverrideProps = {
  formComponent: ReactNode;
  labelBtn?: string;
  onPressBtn?: () => void;
};

const KeyboardFormOverride: FC<KeyboardFormOverrideProps> = ({
  formComponent,
  labelBtn,
  onPressBtn,
}) => {
  const styles = useGlobalStyles();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <ScrollView
        style={[styles.flex, { paddingVertical: verticalScale(20) }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.flex, styles.container]}>
          <View>{formComponent}</View>
        </View>
      </ScrollView>

      {labelBtn ? <SurfaceButton label={labelBtn} onPress={onPressBtn} /> : null}
    </KeyboardAvoidingView>
  );
};

export default KeyboardFormOverride;

const styles = StyleSheet.create({});
