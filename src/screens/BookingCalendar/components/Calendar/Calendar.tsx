import { ColorSchemas } from "@/constants/colors";
import { CalendarsPickerRange } from "@/types/datePickerRange";
import { SPACING, scale } from "@/utils/scale";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import moment, { Moment } from "moment";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

type CalendarProps = {
  onChange?: (args: Partial<CalendarsPickerRange>) => void;
};

const Calendar: FC<CalendarProps> = ({ onChange }) => {
  const minDate = moment().subtract(1, "day").toDate();
  const maxDate = new Date(2025, 6, 3);

  const onDateChange = useCallback(
    (date: Moment, type: "START_DATE" | "END_DATE") => {
      if (!onChange) return;

      if (type === "END_DATE") {
        onChange({ selectedEndDate: date });
        return;
      }

      onChange({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    },
    [onChange]
  );

  return (
    <View
      style={{
        backgroundColor: ColorSchemas.blueLighterV2,
        marginHorizontal: SPACING,
        borderRadius: scale(12),
        padding: scale(10),
      }}
    >
      <CalendarPicker
        allowBackwardRangeSelect
        startFromMonday={true}
        allowRangeSelection={true}
        initialDate={minDate}
        minDate={minDate}
        maxDate={maxDate}
        weekdays={["T2", "T3", "T4", "T5", "T6", "T7", "CN"]}
        months={[
          "Th1",
          "Th2",
          "Th3",
          "Th4",
          "Th5",
          "Th6",
          "Th7",
          "Th8",
          "Th9",
          "Th10",
          "Th11",
          "Th12",
        ]}
        disabledDates={[minDate]}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor={ColorSchemas.blue}
        selectedRangeStartStyle={{
          borderWidth: 1,
          borderColor: ColorSchemas.yellow,
          backgroundColor: ColorSchemas.blue,
        }}
        selectedRangeEndTextStyle={{ color: ColorSchemas.white, fontWeight: "bold" }}
        selectedRangeStartTextStyle={{ color: ColorSchemas.white, fontWeight: "bold" }}
        selectedRangeEndStyle={{
          borderWidth: 1,
          borderColor: ColorSchemas.yellow,
          backgroundColor: ColorSchemas.blue,
        }}
        selectedRangeStyle={{
          borderTopColor: ColorSchemas.yellow,
          borderTopWidth: 1,
          borderBottomColor: ColorSchemas.yellow,
          borderBottomWidth: 1,
          backgroundColor: ColorSchemas.blueLighter,
        }}
        selectedDayTextStyle={{ color: ColorSchemas.black }}
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
        nextComponent={<MaterialIcons name="navigate-next" size={24} color="black" />}
        previousComponent={<Entypo name="chevron-small-left" size={24} color="black" />}
        customDayHeaderStyles={() => ({
          textStyle: { color: ColorSchemas.black, fontWeight: "bold" },
        })}
        dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
      />
    </View>
  );
};

export default Calendar;
