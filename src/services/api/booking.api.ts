import { SuccessResponseProp } from "@/types/common";
import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";
import { BookingModel } from "@/models/booking.model";
import { BookingDetailModel } from "@/models/bookingDetails.model";

class BookingAPI extends BaseAxios {
  public getBookingByCustomer = async (customerId: string) => {
    const response: SuccessResponseProp<BookingModel[]> = await this.axios.get(
      `${this.prefix}/BookingByCustomer`,
      {
        params: { customerId },
      }
    );

    return response.metadata;
  };

  public getBookingDetails = async (bookingId: string) => {
    const response: SuccessResponseProp<BookingDetailModel[]> = await this.axios.get(
      `${this.prefix}/BookingDetails`,
      {
        params: { bookingId },
      }
    );

    return response.metadata;
  };

  public paymentFailed = async (bookingId: string) => {
    const response: SuccessResponseProp<string> = await this.axios.post(
      `${this.prefix}/PaymentFailed/${bookingId}`
    );

    return response.metadata;
  };

  public paymentBooking = async (bookingId: string) => {
    const response: SuccessResponseProp<string> = await this.axios.post(
      `${this.prefix}/PaymentBooking`,
      { bookingId }
    );

    return response.metadata;
  };

  public cancel = async (bookingId: string) => {
    const response: SuccessResponseProp<string> = await this.axios.post(
      `${this.prefix}/CancelBooking/${bookingId}`
    );

    return response.metadata;
  };
}

export default new BookingAPI("/Bookings", instance);
