export interface IPriceByHour {
  id?: number;
  room_price_id?: string;
  room_type_id: number;
  start_hour: number;
  price: number;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}
