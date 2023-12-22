import { BillModel } from "./bill.model";
import { IRoomResponse } from "./room.model";
import { ZaloPayTransaction } from "./zaloTransaction.model";

type BookingDetailsStatus =
  | "pending_payment"
  | "confirmed"
  | "pending_confirmation"
  | "canceled"
  | "checked_out"
  | "in_progress"
  | "completed";

export type BookingDetailModel = {
  id: string;
  booking_id: string;
  room_number_id: string;
  room_id: number;
  check_in: string;
  check_out: string;
  adults: number;
  children: number | null;
  price_discount?: number | null;
  percent_discount?: number | null;
  type?: "price" | "percent" | null;
  last_room_number_transfer?: string | null;
  status: BookingDetailsStatus;
  note?: string | null;

  checked_in?: string;
  checked_out?: string;

  created_at?: string;
  deleted_at?: string;
  updated_at?: string;

  bill?: BillModel;
  room?: IRoomResponse;
  zaloPayTransaction?: ZaloPayTransaction | null;
};
