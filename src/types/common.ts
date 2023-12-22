import { ApiKey } from "./DataTypes";

export type Loading = "ready" | "pending" | "complete" | "failed";

export type PaymentsType = "online";

export interface SuccessResponseProp<Metadata, Options = unknown> {
  message: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata: Metadata;
  options?: Options;
}

export interface ErrorResponse {
  status: string;
  code: string;
  message: string;
  others_message: null | { [key: string]: any };
  exception: null | string;
}

export type LoginResponse = {
  tokens: {
    apiKey: ApiKey | null;
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: number;
  };
};

export type Filters = {
  page: number;
  limit: number;
} & Record<string, any>;

export type Pagination = {
  page: number;
  limit: number;
  totalPage: number;
  totalRows: number;
};

export type SnackbarStatusType = "success" | "info" | "default" | "warning" | "error";
