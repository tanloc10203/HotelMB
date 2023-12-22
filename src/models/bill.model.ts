import { ColorSchemas } from "@/constants/colors";

type BillStatus = "paid" | "unpaid" | "partially_paid" | "others";

export type BillModel = {
  id?: string;
  employee_id?: number;
  booking_details_id: string;
  total_price: number;
  payment?: "online" | "offline" | "transfer" | "others";
  deposit?: number;
  change?: number;
  price_received?: number;
  note?: string;
  discount?: number;
  status: BillStatus;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
};

export const convertBillStatus = (status: BillStatus) => {
  const statues: Record<BillStatus, string> = {
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
    partially_paid: "Thanh toán 1 phần",
    others: "Khác",
  };

  return statues[status];
};

export const colorBillStatus = (status: BillStatus) => {
  const statues: Record<BillStatus, string> = {
    paid: ColorSchemas.green,
    unpaid: ColorSchemas.red,
    partially_paid: ColorSchemas.yellow,
    others: ColorSchemas.black,
  };

  return statues[status];
};
