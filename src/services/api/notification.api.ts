import { NotificationModel } from "@/models/notification.model";
import { SuccessResponseProp } from "@/types/common";
import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class NotificationAPI extends BaseAxios {
  public getByCustomerId = async (customerId: string) => {
    const response: SuccessResponseProp<NotificationModel[]> = await this.axios.get(
      `${this.prefix}/GetByCustomer`,
      {
        params: { customerId },
      }
    );

    return response.metadata;
  };
}

export default new NotificationAPI("/Notifications", instance);
