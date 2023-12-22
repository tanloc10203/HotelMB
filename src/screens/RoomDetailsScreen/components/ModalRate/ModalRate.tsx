import InputLabel from "@/components/ui/form/InputLabel";
import { ColorSchemas } from "@/constants/colors";
import { StateRate } from "@/models/rate.model";
import { IRoomResponse } from "@/models/room.model";
import { SPACING, verticalScale } from "@/utils/scale";
import React, { FC, useCallback, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-ratings";

type ModalRateProps = {
  visible: boolean;
  room: IRoomResponse;
  onClose?: () => void;
  onSubmit?: (payload: StateRate) => void;
};

const ModalRate: FC<ModalRateProps> = ({ visible, onClose, onSubmit }) => {
  const [state, setState] = useState<StateRate>({ comment: "", rate: 5 });
  const [error, setError] = useState<Omit<StateRate, "rate"> & { rate: string }>({
    comment: "",
    rate: "",
  });

  const ratingCompleted = (rating: number) => {
    setState((prev) => ({ ...prev, rate: rating }));
  };

  const handleChangeValues = (value: string) => {
    if (!value) {
      setError((prev) => ({ ...prev, comment: "Vui lòng nhập cảm nghỉ" }));
    } else {
      setError((prev) => ({ ...prev, comment: "" }));
    }

    setState((prev) => ({ ...prev, comment: value }));
  };

  const submit = useCallback(() => {
    if (!state.comment) {
      setError((prev) => ({ ...prev, comment: "Vui lòng nhập cảm nghỉ" }));
      return;
    }

    if (!onSubmit) return;

    onSubmit(state);
  }, [state]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose?.();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Đánh giá</Text>

          <View style={styles.line} />

          <View>
            <Text style={styles.modalText}>Vui lòng đánh giá và ghi lại cảm nghỉ của bạn</Text>

            <Rating
              ratingCount={5}
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
              startingValue={state.rate}
            />

            <InputLabel
              label="Cảm nghỉ"
              placeholder="Nhập cảm nghỉ của bạn về kì nghỉ"
              onChangeText={handleChangeValues}
              error={Boolean(error.comment)}
              helperText={error.comment}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.wrapBtn}>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
              <Text style={[styles.textStyle, { color: ColorSchemas.black }]}>Lúc khác</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonAgree]} onPress={submit}>
              <Text style={[styles.textStyle, { color: ColorSchemas.white }]}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRate;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: ColorSchemas.grey,
    marginBottom: verticalScale(12),
  },

  wrapBtn: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, gap: 10 },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: SPACING,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: "48%",
    borderRadius: 40,
    paddingVertical: 16,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: ColorSchemas.grey,
  },
  buttonAgree: {
    backgroundColor: ColorSchemas.blue,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
