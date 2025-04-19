import { NextFunction, Request, Response } from "express";
import { getUserData, IUserToken } from "../utils/jwt";

export interface IReqUser extends Request {
  user?: IUserToken
}

const unauthJson = {
  message: "unauthorized",
  data: null,
};
export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    res.status(403).json(unauthJson);
    return;
  }
  
  const [prefix, token] = authHeader.split(" ")
  if(!(prefix === "Bearer" && token)) {
    res.status(403).json(unauthJson)
    return
  }

  const user = getUserData(token)
  if(!user){
    res.status(403).json(unauthJson)
    return
  }

  (req as IReqUser).user = user

  next()
};
