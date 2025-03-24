import express from "express";
import cors from "cors";
import path from "path";
import { PORT, PUBLIC_PATH, STATIC_PATH } from "./lib/constants.js";
import productRoute from "./routes/productRoute.js";
import articleRoute from "./routes/articleRoute.js";
import commentRoute from "./routes/commantRoute.js";
import imagesRoute from "./routes/imageRoute.js";
import {
  defaultNotFoundHandler,
  globalErrorHandler,
} from "./controllers/errorController.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(STATIC_PATH, express.static(path.resolve(process.cwd(), PUBLIC_PATH)));

app.use("/products", productRoute);
app.use("/articles", articleRoute);
app.use("/comments", commentRoute);
app.use("/images", imagesRoute);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
