export default class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string = "Something went wrong",
    public errors: Array<any> = []
  ) {
    super(message);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
    };
  }
}
