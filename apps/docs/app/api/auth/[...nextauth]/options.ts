import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "../../../../lib/db";
export const options: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "Enter your email address",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "your-awesome-password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     const parsedCredentials = z
    //       .object({ email: z.string().email(), password: z.string().min(6) })
    //       .safeParse(credentials);

    //     if (parsedCredentials.success) {
    //       console.log("PASSED");
    //       const { email, password } = parsedCredentials.data;

    //       const user = await db.profile.findFirst({
    //         where: {
    //           email: email,
    //           password: password,
    //         },
    //       });
    //       console.log({ user });
    //       return user;
    //     }

    //     return null;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};
