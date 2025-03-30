import express from "express";
import {
  createLogin,
  createRefreshToken,
  creatUser,
} from "../controllers/userController.js";
import auth from "../lib/jwtAuth.js";

const userRoute = express.Router();

userRoute.post("/", creatUser);
userRoute.post("/login", createLogin);
userRoute.post("/token/refresh", auth.verifyRefreshToken, createRefreshToken);

export default userRoute;
