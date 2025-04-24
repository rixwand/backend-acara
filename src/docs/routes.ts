import { Express } from "express";
import swaggerUI from 'swagger-ui-express'
import swaggerOutput from './swagger_output.json'
export default function docs(app: Express) {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerOutput, {}))
}
