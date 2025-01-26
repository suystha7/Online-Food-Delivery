import { Food } from "../food/FoodTypes";

export class CartItem {
  constructor(public food: Food, public quantity: number) {}
}

export class Cart {
  constructor(
    public _id: string,
    public items: Array<CartItem>,
    public cartTotal: number,
  ) {}
}
