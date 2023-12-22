import { IAmenityResponse } from "./amenity.model";
import { IDiscount } from "./discount.model";
import { IEquipmentResponse } from "./equipment.model";
import { IPriceByHour } from "./roomPriceByHour.model";

export interface IRoomPrice {
  id?: string;
  price_list_id: string;
  room_type_id: number;
  price_online: number;
  price_offline: number;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;

  price_hours: IPriceByHour[];
}

export interface IRoomType {
  id?: number;
  name: string;
  character: string;
  desc: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}

type PayloadInsert = {
  id: number;
};

export interface ImagesRoomType {
  id?: number;
  room_type_id: number;
  src: string;
  created_at?: string;
}

export type IRoomTypePayload = {
  equipments: PayloadInsert[] | null;
  amenities: PayloadInsert[] | null;
  images: any[] | null;
} & IRoomType;

export type IRoomTypePayloadEdit = {
  equipments: PayloadInsert[] | null;
  amenities: PayloadInsert[] | null;
  images: any[] | null;
  removeImages: { id: number }[] | null;
} & IRoomType;

export type IRoomTypeResponse = {
  amenities: IAmenityResponse[];
  equipments: IEquipmentResponse[];
  images: ImagesRoomType[];
  prices: IRoomPrice;
  discount: IDiscount | null;
} & IRoomType;
