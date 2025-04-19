import express from "express";
import router from "./routes/api";
import connect from "./utils/database";

async function init() {
  try {
    const res = await connect();
    console.log(res);
    const web = express();
    web.use(express.json());
    web.use("/api", router);

    web.listen(3000, () => {
      console.log("port listening at 3000");
    });
  } catch (error) {
    console.log(error);
  }
}

init()
