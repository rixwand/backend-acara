import { version } from "mongoose";
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Acara",
    description: "Dokumentasi API Acara",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
    {
      url: "https://backend-acara-theta.vercel.app/api",
      description: "Production server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "test",
        password: "secret123",
      },
      RegisterRequest: {
        fullName: "User Test",
        username: "test",
        email: "test@mail.com",
        password: "secret123",
        confirmPassword: "secret123"
      }
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointFIles = ["../routes/api.ts"];
swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointFIles, doc);
