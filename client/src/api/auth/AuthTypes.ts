export class ImageClass {
  constructor(
    public _id: string,
    public url: string,
    public public_id: string
  ) {}
}

export class User {
  constructor(
    public __v: number,
    public _id: string,
    public avatar: ImageClass,
    public email: string,
    public fullName: string,
    public isEmailVerified: boolean,
    public phoneNumber: string,
    public role: "USER" | "ADMIN",
    public createdAt: string,
    public updatedAt: string
  ) {}
}

export class LoginResponse {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public user: User
  ) {}
}
