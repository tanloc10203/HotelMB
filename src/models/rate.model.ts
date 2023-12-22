export type RateState = {
  id?: string;
  booking_id: string;
  room_id: number;
  customer_id: number;
  start: number;
  comment: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
  is_hidden?: boolean | number;

  customer?: { id: number; photo: string; display_name: string };
};

export type StateRate = {
  rate: number;
  comment: string;
};
