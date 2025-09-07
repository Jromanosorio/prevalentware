import { betterAuth } from "better-auth";
import { PrismaClient } from "@/generated/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  secret: process.env.BETTER_AUTH_SECRET!
});
