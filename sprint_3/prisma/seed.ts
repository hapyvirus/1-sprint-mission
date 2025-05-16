import { PrismaClient } from "@prisma/client";
import {
  USER,
  PRODUCT,
  ARTICLE,
  COMMENT,
  LIKE,
  NOTIFICATION,
  TAG,
  PRODUCTTAG,
} from "./mock";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.productTag.deleteMany();

  await prisma.user.createMany({
    data: USER,
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: PRODUCT,
    skipDuplicates: true,
  });

  await prisma.article.createMany({
    data: ARTICLE,
    skipDuplicates: true,
  });

  await prisma.comment.createMany({
    data: COMMENT,
    skipDuplicates: true,
  });

  await prisma.like.createMany({
    data: LIKE,
    skipDuplicates: true,
  });

  await prisma.notification.createMany({
    data: NOTIFICATION,
    skipDuplicates: true,
  });

  await prisma.tag.createMany({
    data: TAG,
    skipDuplicates: true,
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
