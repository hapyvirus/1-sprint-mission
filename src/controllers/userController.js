import { catchHandler } from "../lib/catchHandler.js";
import userService from "../services/userService.js";

export const creatUser = catchHandler(async (req, res) => {
  const user = await userService.createUser({ ...req.body });
  res.status(201).send(user);
});
