import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import { PORT, PUBLIC_PATH, STATIC_PATH } from "./src/lib/constants";
import userRoute from "./src/routes/userRoute";
import productRoute from "./src/routes/productRoute";
import articleRoute from "./src/routes/articleRoute";
import commentRoute from "./src/routes/commentRoute";
import imagesRoute from "./src/routes/imageRoute";
import {
  defaultNotFoundHandler,
  globalErrorHandler,
} from "./src/controllers/errorController";
import auth from "./src/lib/jwtAuth"; 
import likeRoute from "./src/routes/likeRoute";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(STATIC_PATH, express.static(path.resolve(process.cwd(), PUBLIC_PATH)));

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/articles", articleRoute);
app.use("/comments", auth.verifyAccessToken, commentRoute);
app.use("/likes", auth.verifyAccessToken, likeRoute);
app.use("/images", imagesRoute);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
