import crypto from "crypto";
import { SECRET_KEY } from "./env";

export const encrypt = (password: string): string =>
  crypto.pbkdf2Sync(password, SECRET_KEY, 1000, 64, "sha512").toString("hex");
