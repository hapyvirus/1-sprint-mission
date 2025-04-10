import userService from "../services/userService";
import { create } from "superstruct";
import { CreateUserBodyStuct } from "../structs/userStruct";

export const creatUser = async (req, res) => {
  const data = create(req.body, CreateUserBodyStuct);
  const user = await userService.createUser(data);
  res.status(201).send(user);
};

export const createLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.getUser(email, password);
  const accessToken = userService.createToken(user);
  const refreshToken = userService.createToken(user, "refresh");
  await userService.updateUser(user.id, { refreshToken });
  res.cookie("refreshToken", refreshToken, {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.json({ accessToken });
  next();
};

export const createRefreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  const { userId } = req.auth;
  const { accessToken, newRefreshToken } = await userService.refreshToken(
    userId,
    refreshToken
  );
  await userService.updateUser(userId, { refreshToken: newRefreshToken });
  res.cookie("refreshToken", newRefreshToken, {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.json({ accessToken });
};

export const getUser = async (req, res) => {
  const userId = req.user.userId;
  const user = await userService.getUserId(userId);
  return res.status(200).send(user);
};

export const updateUser = async (req, res) => {
  const userId = req.user.userId;
  const data = req.body;
  const updateUser = await userService.updateUser(userId, data);
  return res.status(200).send(updateUser);
};

export const getUserProuct = async (req, res) => {
  const userId = req.user.userId;
  const { page = 1, pageSize = 10, orderBy } = req.query;
  const products = await userService.getMyProuct({
    page,
    pageSize,
    orderBy,
    userId,
  });
  res.status(200).send(products);
};

export const logout = async (req, res) => {
  await userService.logout;

  res.status(201).send();
};
