import { IDiscount } from "./discount.model";
import { IEquipmentResponse } from "./equipment.model";
import { IFloor } from "./floor.model";
import { IRoomPrice, IRoomTypeResponse } from "./roomType.model";

export type StatusRoom = "maintenance" | "unavailable" | "available" | "cleanup";

export interface IRoomNumber {
  id: string;
  room_id?: number;
  note?: string;
  status: null | StatusRoom;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}

export interface IRoom {
  id?: number;
  floor_id: number;
  room_type_id: number;
  room_numbers?: IRoomNumber[];
  room_quantity: number;
  status?: StatusRoom;
  is_public: 0 | 1;
  is_smoking: 0 | 1;
  is_parking: 0 | 1;
  is_breakfast: 0 | 1;
  is_pets: 0 | 1;
  is_extra_beds: 0 | 1;
  area: number | null;
  adults: number;
  children: number | null;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
  photo_publish?: string;
}

export interface IBed {
  bed_id: number;
  room_id: number;
  quantity: number;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}

export interface IBedResponse extends IBed {
  bed: IEquipmentResponse;
}

export interface IDurationsRoom {
  id?: number;
  room_id: number;
  check_in_from: string;
  check_in_to: string;
  check_out_from?: string;
  check_out_to: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}

export interface IRoomResponse extends IRoom {
  roomType: IRoomTypeResponse;
  floor: IFloor;
  discount: IDiscount | null;
  prices: IRoomPrice | null;
  beds: IBedResponse[] | null;
  durationRoom: IDurationsRoom | null;
}

export type SearchRoomAvailable = {
  check_in: string;
  check_out: string;
  room_id: number;
};
