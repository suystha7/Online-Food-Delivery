import { Schema } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/user.models";
import { UserRolesType } from "../constant";

interface IJwtPayload extends JwtPayload {
  _id: Schema.Types.ObjectId;
  email: string;
  role: UserRolesType;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
