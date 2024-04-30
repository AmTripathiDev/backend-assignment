import { admin } from "@prisma/client";
import JWTService from "../../services/jwt";
import { prismaClient } from "../db";

const queries = {
  getAdminDetail: async(
    parent: any,
    { email, password, key }: { email: string; password: string; key: string }
  ) => {
        const user = await prismaClient.admin.findUnique({where: {email, key}});
        if(!user) return;
        const token = JWTService.generateTokenForUser(user);
        return token;
    },
};

export const resolvers = { queries };
