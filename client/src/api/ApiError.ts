import { AxiosError } from "axios";

export class ApiErrorResponse {
  constructor(
    public errors: [],
    public message: string,
    public statusCode: number,
    public stack: string
  ) {}
}

export default class ApiError {
  public error: boolean = true;
  constructor(
    public errorMessage: string,
    public errorData?: AxiosError,
    public errorResponse?: ApiErrorResponse
  ) {}
}
