import express from "express";
import {
  createLogin,
  createLogout,
  createRefreshToken,
  creatUser,
} from "../controllers/userController.js";
import auth from "../lib/jwtAuth.js";

const userRoute = express.Router();

userRoute.post("/", creatUser);
userRoute.post("/login", createLogin);
userRoute.post("/token/refresh", auth.verifyRefreshToken, createRefreshToken);
userRoute.post("/session-logout", createLogout);

export default userRoute;
