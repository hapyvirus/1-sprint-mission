import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
import UnauthError from "../lib/error/UnauthError.js";
import NotFoundError from "../lib/error/NotFoundError.js";

async function hashingPassword(password) {
  return bcrypt.hash(password, 10);
}

function filterSensitiveUserData(user) {
  const { password, refreshToken, ...rest } = user;
  return rest;
}

async function verifyPassword(inputPassword, password) {
  const isMatch = await bcrypt.compare(inputPassword, password);
  if (!isMatch) {
    throw new UnauthError();
  }
}

function createToken(user, type) {
  const payload = { userId: user.id };
  const options = { expiresIn: type === "refresh" ? "2w" : "1h" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

async function createUser(user) {
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
}

async function getUser(email, password) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new NotFoundError(email);
  }

  await verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function updateUser(id, data) {
  const dataToUpdate = { ...data };
  if (dataToUpdate.password) {
    const hashedPassword = await hashingPassword(dataToUpdate.password);
    dataToUpdate.password = hashedPassword;
  }

  const updateUser = await userRepository.update(id, dataToUpdate);

  return filterSensitiveUserData(updateUser);
}

async function getMyProuct({ page, pageSize, orderBy, userId }) {
  const products = await userRepository.getMyProuct({
    page,
    pageSize,
    orderBy,
    userId,
  });

  return products;
}

async function getUserId(userId) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new NotFoundError(userId);
  }

  return filterSensitiveUserData(user);
}

async function refreshToken(userId, refreshToken) {
  const user = await userRepository.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    throw new UnauthError();
  }
  const accessToken = createToken(user);
  const newRefreshToken = createToken(user, "refresh");
  return { accessToken, newRefreshToken };
}

export default {
  createUser,
  getUser,
  updateUser,
  refreshToken,
  createToken,
  getUserId,
  getMyProuct,
};
