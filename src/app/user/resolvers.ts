import { admin } from "@prisma/client";
import JWTService from "../../services/jwt";
import { prismaClient } from "../db";

const queries = {
  getAdminDetail: async (
    parent: any,
    { email, password, key }: { email: string; password: string; key: string }
  ) => {
    let user = await prismaClient.admin.findUnique({ where: { email, key } });
    if (!user) {
      if (key === "hradmin") {
        await prismaClient.admin.create({
          data: {
            email: email,
            password: password,
            key: key,
          },
        });
      } else {
        return null;
      }
    }
    user = await prismaClient.admin.findUnique({ where: { email, key } });
    if (user) {
      const token = JWTService.generateTokenForUser(user);
      return token;
    }
  },
};

export const resolvers = { queries };
