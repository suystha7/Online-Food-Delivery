import { ImageClass } from "../auth/AuthTypes";

export class Food {
  constructor(
    public _id: string,
    public __v: string,
    public name: string,
    public category: string,
    public description: string,
    public price: number,
    public stock: number,
    public discount: number,
    public mainImage: ImageClass,
    public subImages: Array<ImageClass>,
    public createdAt: string,
    public updatedAt: string
  ) {}
}

export class Foods {
  constructor(
    public foods: Food[],
    public totalFoods: number,
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

export interface IFoodBodyFields {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  discount: number;
  mainImage: File;
  subImages?: FileList;
}

export interface IFoodParams {
  foodId: string;
}
