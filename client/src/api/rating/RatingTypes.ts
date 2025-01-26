import { Food } from "../food/FoodTypes";

export class Rating {
  constructor(public _id: string, public food: Food, public rating: number) {}
}

export class Ratings {
  constructor(
    public ratings: Rating[],
    public totalRatings: number,
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
