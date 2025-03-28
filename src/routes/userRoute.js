import express from "express";
import { creatUser } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/", creatUser);

export default userRoute;
