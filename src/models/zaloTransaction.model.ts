export type ZaloPayTransactionStatus = "pending" | "successfully" | "failed" | "refund";

export type ZaloPayTransaction = {
  id?: string;
  booking_id?: string;
  booking_details_id?: string;

  app_id: number;
  app_user: string;
  app_trans_id: string;

  app_time: number;
  amount: number;

  item: string;
  description: string;
  embed_data: string;

  title?: string;
  bank_code?: string;
  mac: string;

  return_code?: number;
  sub_return_code?: number;
  return_message?: string;
  sub_return_message?: string;

  zp_trans_token?: string;
  order_token?: string;

  zp_trans_id?: number;
  refund_id?: number;

  m_refund_id?: string;

  status?: ZaloPayTransactionStatus;
  is_booking?: boolean | 1 | 0;

  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
};
