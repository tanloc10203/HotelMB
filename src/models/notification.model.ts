export type NotificationModel = {
  id?: number;
  actor_type: "employee" | "owner" | "customer";
  user_id: number;
  title: string;
  body: string;

  is_read: 1 | 0 | boolean;

  notification_type?: string;
  entity_name: string;
  entity_id: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
};

export const NotificationTypes = {
  CHECK_IN_SUCCESS: "CHECK_IN_SUCCESS",
  CUSTOMER_BOOKING_SUCCESS: "CUSTOMER_BOOKING_SUCCESS",
  FRONT_DESK_BOOKING_SUCCESS: "BOOKING_SUCCESS",
  CONFIRM_SUCCESS: "CONFIRM_SUCCESS",
  DELETE_AFTER_3_HOUR: "DELETE_AFTER_3_HOUR",
};
