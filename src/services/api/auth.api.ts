import {
  ChangePasswordPayload,
  CustomerChangeProfilePayload,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  UserState,
  VerifyCodePayload,
} from "@/models/customer.model";
import { LoginResponse, SuccessResponseProp } from "@/types/common";
import axios from "../axios";

type GetCacheKeyPayload = { type: "checkStatus"; userId: number } | { type: "getProfile" };

class AuthAPI {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  register = (
    data: Omit<RegisterPayload, "confirm_password">
  ): Promise<SuccessResponseProp<{ apiKey: string; userId: number }>> => {
    return axios.post(this.prefix, data);
  };

  verifyCode = (data: VerifyCodePayload) => {
    return axios.post(this.prefix + "/VerifyCode", data);
  };

  resendCode = (data: Omit<VerifyCodePayload, "otp">) => {
    return axios.post(this.prefix + "/ResendCode", data);
  };

  checkStatus = (
    userId: number
  ): Promise<SuccessResponseProp<{ verify: true; verified: false }>> => {
    return axios.get(`${this.prefix}/CheckStatus/${userId}`);
  };

  updateProfile = (userId: number, payload: UpdateProfilePayload) => {
    return axios.post(`${this.prefix}/UpdateProfile/${userId}`, payload);
  };

  loginWithPhoneNumber = (data: LoginPayload): Promise<SuccessResponseProp<LoginResponse>> => {
    return axios.post(`${this.prefix}/LoginWithPhoneNumber`, data);
  };

  changePassword = (data: Omit<ChangePasswordPayload, "confirmPassword">) => {
    return axios.patch(`${this.prefix}/Password/Change`, data);
  };

  getProfile = (): Promise<SuccessResponseProp<UserState>> => {
    return axios.get(`${this.prefix}/Profile`);
  };

  changeProfile = (userId: number, data: CustomerChangeProfilePayload) => {
    return axios.patch(`${this.prefix}/Profile/${userId}`, data);
  };

  getCacheKey = (payload: GetCacheKeyPayload) => {
    switch (payload.type) {
      case "checkStatus":
        return `${this.prefix}/CheckStatus/${payload.userId}`;

      default:
        return `/Auth/Profile/Customer`;
    }
  };

  logout = () => {
    return axios.post(`/Customers/LogoutMobile`);
  };

  get endpoint() {
    return this.prefix;
  }
}

export default new AuthAPI("/Customers");
