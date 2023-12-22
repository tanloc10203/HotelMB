export enum Paths {
  Login = "Login",
  Register = "Register",
  Otp = "Otp",
  UpdateProfile = "",
  Notifications = "Notifications",
  RoomDetails = "RoomDetails",
  BookingCalendar = "BookingCalendar",
  BookingInfoCustomer = "BookingInfoCustomer",
  BookingPayments = "BookingPayments",
  BookingSuccessful = "BookingSuccessful",
  BookingSelectedRoomAvailable = "BookingSelectedRoomAvailable",
  BookingDetails = "BookingDetails",
  Payments = "Payments",
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  InformationHotel: undefined;
  Otp: {
    apiKey: string;
    userId: number;
    phoneNumber: string;
  };
  UpdateProfile: {
    userId: number;
  };
  Notifications: undefined;
  BookingResults: undefined;
  Main: undefined;
  RoomDetails: {
    id: number;
    rate?: {
      booking_id?: string;
      isRate?: boolean;
    };
  };
  BookingCalendar: undefined;
  BookingInfoCustomer: undefined;
  BookingSelect: undefined;
  BookingInfoDetails: undefined;
  BookingSelectPayments: undefined;
  BookingSuccessful: undefined;
  BookingSelectedRoomAvailable: undefined;

  BookingDetails: {
    bookingId: string;
  };

  Payments: {
    url: string;
    bookingId: string;
  };

  ZaloPayment: {
    url: string;
    bookingId?: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
