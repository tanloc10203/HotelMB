export type GroupEquipment =
  | "electronics"
  | "sanitary"
  | "furniture.bed"
  | "furniture"
  | "security"
  | "others"
  | "entertainment"
  | "conference"
  | "meeting"
  | "food"
  | "beverage";

export interface IEquipmentType {
  id?: number;
  name: string;
  desc: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}

export interface IEquipment {
  id?: number;
  equipment_type_id: number;
  group: GroupEquipment;
  name: string;
  desc: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}

export type IEquipmentResponse = {
  typeData: IEquipmentType;
} & IEquipment;
