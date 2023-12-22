import { ColorSchemas } from "@/constants/colors";
import { SPACING } from "@/utils/scale";
import { FC } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CancelDialogProps = {
  visible: boolean;
  onClose?: () => void;
  onAgree?: () => void;
};

const CancelDialog: FC<CancelDialogProps> = ({ visible, onClose, onAgree }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose?.();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Xác nhận hủy phòng</Text>

          {/* <PolicyCancel /> */}

          <Text>Hủy phòng bạn sẽ không nhận được hoàn tiền</Text>

          <View style={styles.wrapBtn}>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
              <Text style={[styles.textStyle]}>Hủy bỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonAgree]} onPress={onAgree}>
              <Text style={[styles.textStyle, { color: ColorSchemas.black }]}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelDialog;

const styles = StyleSheet.create({
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
    backgroundColor: ColorSchemas.red,
  },
  buttonAgree: {
    backgroundColor: ColorSchemas.grey,
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
