import prisma from "../config/prisma";
import { UpdateUserDTO, CreateUserDTO } from "../dto/UserDTO";

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

const save = async (data: CreateUserDTO) => {
  return await prisma.user.create({
    data,
  });
};

const update = async (id: number, data: UpdateUserDTO) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const getProduct = async (id: number) => {
  return await prisma.product.findMany({
    where: { authorId: id },
  });
};

export default {
  findById,
  findByEmail,
  save,
  update,
  getProduct,
};
