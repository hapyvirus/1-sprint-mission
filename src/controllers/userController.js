import { catchHandler } from "../lib/catchHandler.js";
import userService from "../services/userService.js";

export const creatUser = catchHandler(async (req, res) => {
  const user = await userService.createUser({ ...req.body });
  res.status(201).send(user);
});

export const createLogin = catchHandler(async (req, res) => {
  const { email, nickname, password } = req.body;
  const user = await userService.getUser(email, nickname, password);
  const accessToken = userService.createToken(user);
  const refreshToken = userService.createToken(user, "refresh");
  await userService.updateUser(user.id, { refreshToken });
  res.cookie("refreshToken", refreshToken, {
    path: "/token/refresh",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.json({ accessToken });
});

export const createRefreshToken = catchHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { userId } = req.auth;
  const { accessToken, newRefreshToken } = await userService.refreshToken(
    userId,
    refreshToken
  );
  await userService.updateUser(userId, { refreshToken: newRefreshToken });
  res.cookie("refreshToken", newRefreshToken, {
    path: "/users/token/refresh",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.json({ accessToken });
});

export const createLogout = catchHandler(async (req, res) => {
  req.session.destroy();
  res.clearCookie("refreshToken", {
    path: "/user/token/refresh",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).send({ message: "로그아웃" });
});
