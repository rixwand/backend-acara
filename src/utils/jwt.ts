import { Types } from "mongoose";
import User from "../interface/User";
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "./env";

export interface IUserToken
  extends Omit<
    User,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken) : string => { 
 return jwt.sign(user, SECRET_KEY, {expiresIn: "1h"})
};
export const getUserData = (token: string) : IUserToken => { 
  return jwt.verify(token, SECRET_KEY) as IUserToken
};
