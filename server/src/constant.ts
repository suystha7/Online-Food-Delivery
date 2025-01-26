export const DB_NAME = "quickbite";

export const TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000;

export const REGEX_PATTERNS = {
  phoneNumber: /^[0-9]{10}$/,
};

export enum UserRolesEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type UserRolesType = `${UserRolesEnum}`;

export enum OrderStatusEnum {
  PENDING = "PENDING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export type OrderStatusType = `${OrderStatusEnum}`;

export enum PaymentMediumEnum {
  CASH = "CASH",
  ONLINE = "ONLINE",
}

export type PaymentMediumType = `${PaymentMediumEnum}`;

export const BANNER_CNT_LIMIT = 3;