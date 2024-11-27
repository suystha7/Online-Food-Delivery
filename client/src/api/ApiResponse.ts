export default class ApiResponse<T> {
    constructor(
      public data: T,
      public message: string,
      public statusCode: number,
      public success: boolean
    ) {}
  }