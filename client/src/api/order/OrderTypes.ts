import { ImageClass } from "../auth/AuthTypes";

export type OrderStatusType = "PENDING" | "DELIVERED" | "CANCELLED";

export class OrderItem {
  constructor(
    public _id: string,
    public __v: string,
    public fullName: string,
    public address: string,
    public city: string,
    public postalCode: string,
    public phoneNumber: string,
    public customer: string,
    public items: Array<{
      foodId: string;
      quantity: number;
      mainImage: ImageClass;
      name: string;
      price: number;
    }>,
    public isPaymentDone: boolean,
    public orderPrice: number,
    public paymentMethod: "CASH" | "ONLINE",
    public status: OrderStatusType,
    public createdAt: string,
    public updatedAt: string
  ) {}
}

export class Orders {
  constructor(
    public orders: OrderItem[],
    public totalOrders: number,
    public page: number,
    public limit: number,
    public totalPages: number,
    public nextPage: number,
    public prevPage: number,
    public hasNextPage: boolean,
    public hasPrevPage: boolean,
    public serialNumber: number
  ) {}
}
