import { Request, Response } from "express";
import * as yup from "yup";
import { IReqUser } from "../middlewares/auth.middleware";
import userModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";

type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  identifier: string;
  password: string;
};

const registerSchema = yup.object({
  fullName: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "password must match"),
});

export default {
  //REGISTER CONTROLLER
  async register(req: Request, res: Response) {
    /**
   #swagger.requestBody = {
    required: true,
    schema: {$ref: "#/components/schemas/RegisterRequest"}
    }
    */
    const { fullName, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;
    try {
      await registerSchema.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });
      const result = await userModel.create({
        fullName,
        username,
        email,
        password,
      });
      res.status(200).json({
        message: "registration success",
        data: result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  // LOGIN CONTROLLER
  async login(req: Request, res: Response) {
    /**
     #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/LoginRequest"}
     }
     */
    const { identifier, password } = req.body as unknown as TLogin;
    try {
      const userByIdentifier = await userModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      });
      if (!userByIdentifier) {
        res.status(403).json({
          message: "username/email and password is icorrect",
          data: null,
        });
        return;
      }
      const validatePassword = encrypt(password) === userByIdentifier.password;

      if (!validatePassword) {
        res.status(403).json({
          message: "username/email and password is icorrect",
          data: null,
        });
        return;
      }

      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      res.status(200).json({
        message: "Login Success",
        data: { token },
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  //ME CONTROLLER
  async me(req: IReqUser, res: Response) {
    /**
     #swagger.security = [{
      "bearerAuth": []
     }]
     */
    try {
      const user = req.user;
      const result = await userModel.findById(user?.id);

      res.status(200).json({
        message: "get user",
        data: result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
