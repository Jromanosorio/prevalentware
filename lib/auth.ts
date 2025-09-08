import { betterAuth } from "better-auth";
import { PrismaClient } from "@/generated/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  emailAndPassword:{
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirectURI: (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") +
      "/api/auth/callback/github",
    }
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      role: {
        type: "string"
      },
      phone: {
        type: "string",
      }
    }
  },
  secret: process.env.BETTER_AUTH_SECRET!
});
