import express from "express";
import {
  createLogin,
  createRefreshToken,
  creatUser,
  getUser,
  updateUser,
  getUserProuct,
  logout,
} from "../controllers/userController.js";
import auth from "../lib/jwtAuth.js";
import { catchHandler } from "../lib/catchHandler.js";

const userRoute = express.Router();

userRoute.post("/", catchHandler(creatUser));
userRoute.post("/login", catchHandler(createLogin));
userRoute.post(
  "/token/refresh",
  auth.verifyRefreshToken,
  catchHandler(createRefreshToken)
);
userRoute.get("/me", auth.verifyAccessToken, catchHandler(getUser));
userRoute.patch("/mydata", auth.verifyAccessToken, catchHandler(updateUser));
userRoute.get(
  "/productlist",
  auth.verifyAccessToken,
  catchHandler(getUserProuct)
);
userRoute.post("/logout", catchHandler(logout));

export default userRoute;
