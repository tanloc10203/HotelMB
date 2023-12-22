import Container from "@/components/shared/Container";
import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

type BookingResultsScreenProps = {};

const BookingResultsScreen: FC<BookingResultsScreenProps> = () => {
  const navigation = useNavigation();

  const onPressToHome = () => navigation.navigate("Main");

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onPressToHome} />
      </Appbar.Header>
    </Container>
  );
};

export default BookingResultsScreen;

const styles = StyleSheet.create({});
