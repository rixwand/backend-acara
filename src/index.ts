import express from "express";
import router from "./routes/api";

const web = express();

web.use("/api", router);

web.listen(3000, () => {
  console.log("port listening at 3000");
});
