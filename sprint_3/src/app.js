import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { PORT, PUBLIC_PATH, STATIC_PATH } from "./lib/constants.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import articleRoute from "./routes/articleRoute.js";
import commentRoute from "./routes/commentRoute.js";
import imagesRoute from "./routes/imageRoute.js";
import {
  defaultNotFoundHandler,
  globalErrorHandler,
} from "./controllers/errorController.js";
import auth from "./lib/jwtAuth.js";
import likeRoute from "./routes/likeRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(STATIC_PATH, express.static(path.resolve(process.cwd(), PUBLIC_PATH)));

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/articles", articleRoute);
app.use("/comments", commentRoute);
app.use("/likes", auth.verifyAccessToken, likeRoute);
app.use("/images", imagesRoute);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
