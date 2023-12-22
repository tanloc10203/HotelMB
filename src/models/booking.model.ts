import { ColorSchemas } from "@/constants/colors";
import { ZaloPayTransaction } from "./zaloTransaction.model";
import { RateState } from "./rate.model";
import { BookingDetailModel } from "./bookingDetails.model";

export type BookingInfoCustomerPayload = {
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type BookingForPayload = {
  note?: string;
};

export type BookingPayload = {
  room_id: number;
  total_night: number;
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  payment: string;
  check_in: string;
  check_out: string;
  adults: number;
  children?: number;
  room_quantity: number;
  voucher?: string;
  note?: string;
};

export type BookingStatus =
  | "pending_payment"
  | "confirmed"
  | "pending_confirmation"
  | "canceled"
  | "checked_out"
  | "in_progress"
  | "completed";

export const ACCEPT_STATUS = ["checked_out", "completed"];

export type ModeBookingType = "day" | "time";

export type PaymentStatusBooking = "online" | "offline" | "transfer" | "others";

export type BookingModel = {
  id?: string;
  customer_id: number;
  employee_id?: number;
  voucher?: string | null;
  payment: PaymentStatusBooking;
  mode_booking: ModeBookingType;
  total_price: number;
  total_room: number;
  is_booked_online?: boolean | 1 | 0;
  status: BookingStatus;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;

  zaloPayTransaction?: ZaloPayTransaction | null;
  rate?: RateState | null;
  bookingDetails?: BookingDetailModel[];
};

export const parserStatusBooking = (status: BookingStatus) => {
  const statuses: Record<BookingStatus, string> = {
    pending_payment: "Chờ thanh toán",
    confirmed: "Đã xác nhận",
    pending_confirmation: "Chờ xác nhận",
    canceled: "Đã hủy",
    checked_out: "Đã trả phòng",
    in_progress: "Đang trong kì nghỉ",
    completed: "Đã kết thúc",
  };

  return statuses[status];
};

export const colorStatusBooking = (status: BookingStatus) => {
  const statues: Record<BookingStatus, string> = {
    pending_payment: ColorSchemas.red,
    confirmed: ColorSchemas.blue,
    pending_confirmation: ColorSchemas.yellow,
    canceled: ColorSchemas.red,
    checked_out: ColorSchemas.green,
    in_progress: ColorSchemas.blue,
    completed: ColorSchemas.green,
  };

  return statues[status];
};
