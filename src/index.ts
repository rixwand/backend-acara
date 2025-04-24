import express, { Request, Response } from "express";
import router from "./routes/api";
import connect from "./utils/database";
import docs from "./docs/routes";
import cors from 'cors'

async function init() {
  try {
    const res = await connect();
    console.log(res);
    const web = express();
    web.use(cors())
    web.use(express.json());
    web.use("/api", router);
    docs(web)

    web.get("/", (_req: Request, res: Response) => {
      res.status(200).json({ message: "Server is running", data: null });
    });
    web.listen(3000, () => {
      console.log("port listening at 3000");
    });
  } catch (error) {
    console.log(error);
  }
}

init();
