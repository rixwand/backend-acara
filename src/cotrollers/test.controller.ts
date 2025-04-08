import { Request, Response } from "express";


export default {
  test(_req: Request, res: Response) {
    res.status(200).json({
      message: "Hello world",
      data: "OK"
    })
  }
}
