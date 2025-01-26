import { OrderStatusType } from "@/api/order/OrderTypes";
import { INavItemOptions, SelectOptionType } from "@/constants";

export const NAV_ITEM_LIST: Array<INavItemOptions> = [
  {
    id: 1,
    text: "HOME",
    navigateTo: "/",
  },
  {
    id: 2,
    text: "OUR MENU",
    navigateTo: "/#menu",
  },
  {
    id: 3,
    text: "POPULAR FOODS",
    navigateTo: "/#popular-foods",
  },
  // {
  //   id: 4,
  //   text: "CONTACT US",
  //   navigateTo: "/#contact",
  // },
];

export const ORDER_STATUS_OPTIONS: Array<SelectOptionType<OrderStatusType>> = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

export const PAYMENT_STATUS_OPTIONS: Array<SelectOptionType<boolean>> = [
  {
    label: "Remaining",
    value: false,
  },
  {
    label: "Paid",
    value: true,
  },
];
