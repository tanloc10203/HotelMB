export type StatusDiscount = "used" | "expired" | "using";

export interface IDiscount {
  id?: string;
  price_list_id: string;
  room_type_id: number;

  num_discount: number;
  code_used: number | null;
  price: number;

  time_start: string;
  time_end: string;

  status: StatusDiscount;
  is_public: 0 | 1 | number | boolean;

  created_at?: string;
  deleted_at?: string | null;
  updated_at?: string;
}

export interface DiscountPayload {
  room_id?: number;
  id?: string;
  num_discount: string;
  price_discount: string;
  percent_discount: string;
  time_start: string;
  time_end: string;
  type: string;
  is_public: boolean;
}
