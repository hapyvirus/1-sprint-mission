import { assert } from "superstruct";
import prisma from "../config/prisma.js";

const findById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const save = async (user) => {
  return await prisma.user.create({
    data: {
      email: user.email,
      nickname: user.nickname,
      password: user.password,
      image: user.image,
    },
  });
};

const update = async (id: number, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: data,
  });
};

export default {
  findById,
  findByEmail,
  save,
  update,
};
