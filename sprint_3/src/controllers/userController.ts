<<<<<<< HEAD
import { RequestHandler } from "express";
import userService from "../services/userService";
import UnauthorizedError from "../lib/error/UnauthorizedError";
import {
  CreateUserBodyStruct,
  UpdateUserBodyStruct,
} from "../structs/userStruct";
import { create } from "superstruct";

export const createUser: RequestHandler = async (req, res) => {
  const data = create(req.body, CreateUserBodyStruct);
  const user = await userService.createUser({ ...data });
  res.status(201).send(user);
};

export const createLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUser(email, password);
  const accessToken = userService.createToken(user, "access");
  const refreshToken = userService.createToken(user, "refresh");
  await userService.updateUser(user.id, { refreshToken });
  res.cookie("refreshToken", refreshToken, {
    path: "/users/token/refresh",
    httpOnly: true,
    sameSite: "none",
    secure: false,
  });
  res.cookie("accessToken", accessToken, {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: false,
  });

  res.status(200).send();
};

export const createRefreshToken: RequestHandler = async (req, res) => {
  const { refreshToken } = req.cookies;
  const userId = req.user.id;
  if (!userId) {
    throw new UnauthorizedError();
  }
=======
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
>>>>>>> main
  const { accessToken, newRefreshToken } = await userService.refreshToken(
    userId,
    refreshToken
  );
<<<<<<< HEAD

  await userService.updateUser(userId, { refreshToken: newRefreshToken });

  res.cookie("refreshToken", newRefreshToken, {
    path: "/users/token/refresh",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.cookie("accessToken", accessToken, {
=======
  await userService.updateUser(userId, { refreshToken: newRefreshToken });
  res.cookie("refreshToken", newRefreshToken, {
>>>>>>> main
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
<<<<<<< HEAD
  res.status(200).send();
};

export const getUser: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    throw new UnauthorizedError();
  }

  const { password } = req.body;

  const user = await userService.getUserId(userId, password);
  res.status(200).send(user);
};

export const updateUser: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    throw new UnauthorizedError();
  }
  const data = create(req.body, UpdateUserBodyStruct);
  const updateUser = await userService.updateUser(userId, data);
  res.status(200).send(updateUser);
};

export const getMyProduct: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    throw new UnauthorizedError();
  }

  const user = await userService.getMyProduct(userId);
  res.status(200).send(user);
};

export const getMyNotification: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    throw new UnauthorizedError();
  }

  const notification = await userService.getMyNotification(userId);
  res.status(200).send(notification);
=======
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
>>>>>>> main
};
