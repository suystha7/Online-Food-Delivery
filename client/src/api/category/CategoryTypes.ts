import { ImageClass } from "../auth/AuthTypes";

export class Category {
  constructor(
    public _id: string,
    public __v: string,
    public name: string,
    public mainImage: ImageClass,
    public createdAt: string,
    public updatedAt: string
  ) {}
}

export class Categories {
  constructor(
    public categories: Category[],
    public totalCategories: number,
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
