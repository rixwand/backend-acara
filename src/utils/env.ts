import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const SECRET_KEY: string = process.env.SECRET_KEY || "";

export const EMAIL_SMTP_SECURE: boolean =
  Boolean(process.env.EMAIL_SMTP_SECURE) || false;
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";
export const EMAIL_SMTP_PORT: number =
  Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";
export const EMAIL_SMTP_SERIVCE_NAME: string =
  process.env.EMAIL_SMTP_SERIVCE_NAME || "";

export const CLIENT_URL: string = process.env.CLIENT_URL || "";
