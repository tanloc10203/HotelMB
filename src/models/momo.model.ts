export type MomoPaymentType = "pr" | "webApp" | "credit" | "napas";

export type MomoOrderType = "momo_wallet";

export type CollectionLinkResponse = {
  partnerCode: string;
  requestId: string;
  orderId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  shortLink: string;
};

export type MomoPaymentResponse = {
  signature: string;
  extraData: string;
  payType: MomoPaymentType;
  transId: number;
  orderType: MomoOrderType;
  partnerUserId?: string;
  orderInfo: string;
} & Pick<
  CollectionLinkResponse,
  "partnerCode" | "orderId" | "requestId" | "amount" | "resultCode" | "responseTime" | "message"
>;

export type MomoTransactionStatus = "pending" | "successfully" | "failed" | "refund";

export interface MomoTransaction {
  id?: string;
  partner_code: string;
  request_id: string;
  order_id: string;
  trans_id?: number;
  result_code?: string;
  request_type?: string;
  message?: string;
  booking_id?: string | null;
  booking_details_id?: string | null;
  lang?: string;
  amount?: number;
  order_info?: string;

  status?: MomoTransactionStatus;
  signature?: string;
  pay_type?: MomoPaymentType | null;
  order_type?: string;
  partner_user_Id?: string;
  extra_data?: string | null;

  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}
