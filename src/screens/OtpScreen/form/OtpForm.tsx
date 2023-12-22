import { scale, verticalScale } from "@/utils/scale";
import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Button } from "react-native-paper";
import useStyles from "./styles";
import { useAuth } from "@/features/auth";

const CELL_COUNT = 6;

type OtpFormProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  onSubmit?: (value: string) => void;
  onResend?: () => void;
  timerCount: number;
};

const OtpForm: React.FC<OtpFormProps> = ({
  value,
  error,
  timerCount,
  setValue,
  onSubmit,
  onResend,
}) => {
  const styles = useStyles(error);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { sendOtp } = useAuth();

  const renderCell = React.useMemo(
    () =>
      ({ index, symbol, isFocused }: RenderCellOptions) => {
        return (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        );
      },
    [error]
  );

  const renderCountdown = React.useMemo(
    () => () => {
      if (!sendOtp) {
        return (
          <View style={styles.resendWrap}>
            <Text style={styles.resendText}>Bạn chưa nhận được mà xác thực. </Text>
            <Pressable onPress={onResend}>
              <Text style={styles.resend}>Gửi lại</Text>
            </Pressable>
          </View>
        );
      }

      if (timerCount === 0) {
        return (
          <View style={styles.resendWrap}>
            <Text style={styles.resendText}>Mã xác thực đã hết hạn </Text>
            <Pressable onPress={onResend}>
              <Text style={styles.resend}>Gửi lại</Text>
            </Pressable>
          </View>
        );
      }

      return (
        <View style={styles.resendWrap}>
          <Text style={styles.resendText}>Mã xác thực hết hạn sau </Text>
          <Pressable onPress={onResend}>
            <Text style={styles.resend}>00:{timerCount < 10 ? `0${timerCount}` : timerCount}</Text>
          </Pressable>
        </View>
      );
    },
    [timerCount, sendOtp]
  );

  const renderHelperError = React.useMemo(
    () => () => {
      if (!error) return null;

      return (
        <View style={styles.helperWrap}>
          <Text style={styles.helperText}>{error}</Text>
        </View>
      );
    },
    [error]
  );

  const handleSubmit = React.useCallback(() => {
    if (!onSubmit) return;
    onSubmit(value);
  }, [value]);

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />

      {renderHelperError()}

      {renderCountdown()}

      <View style={{ marginTop: verticalScale(20) }}>
        <Button
          mode="contained"
          onPress={handleSubmit as () => void}
          contentStyle={styles.contentStyle}
          style={{ borderRadius: scale(10) }}
          labelStyle={styles.labelStyle}
        >
          Tạo
        </Button>
      </View>
    </View>
  );
};

export default OtpForm;
