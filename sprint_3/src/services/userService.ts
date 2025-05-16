import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository";
import throwUnauthorizedError from "../lib/error/throwUnauthorizedError";
import NotFoundError from "../lib/error/NotFoundError";

const hashingPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

function filterSensitiveUserData(user) {
  const { password, refreshToken, ...rest } = user;
  return rest;
}

const verifyPassword = async (inputPassword: string, password: string) => {
  const isMatch = await bcrypt.compare(inputPassword, password);
  if (!isMatch) {
    throwUnauthorizedError();
  }
};

function createToken(user, type) {
  const payload = { userId: user.id };
  const options = { expiresIn: type === "refresh" ? "2w" : "1h" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

const createUser = async (user) => {
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    const error = new Error("이미 가입된 이메일입니다.");
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const hashedPassword = await hashingPassword(user.password);
  const createdUser = await userRepository.save({
    ...user,
    password: hashedPassword,
  });

  return filterSensitiveUserData(createdUser);
};

const getUser = async (email: string, nickname: string, password: string) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new NotFoundError(email);
  }

  if (user.nickname !== nickname) {
    throw new NotFoundError(nickname);
  }

  verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
};

const updateUser = async (id: number, data) => {
  const dataToUpdate = { ...data };
  if (dataToUpdate.password) {
    const hashedPassword = await hashingPassword(dataToUpdate.password);
    dataToUpdate.password = hashedPassword;
  }

  const updateUser = await userRepository.update(id, dataToUpdate);

  return filterSensitiveUserData(updateUser);
};

const getUserId = async (userId: number, password: string) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new NotFoundError(userId);
  }

  return filterSensitiveUserData(user);
};

const refreshToken = async (userId: number, refreshToken: string) => {
  const user = await userRepository.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    throwUnauthorizedError();
  }
  const accessToken = createToken(user);
  const newRefreshToken = createToken(user, "refresh");
  return { accessToken, newRefreshToken };
};

export default {
  createUser,
  getUser,
  updateUser,
  refreshToken,
  createToken,
  getUserId,
};
