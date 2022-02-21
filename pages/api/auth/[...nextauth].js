import NextAuth from "next-auth";
import { prisma } from "db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "bcryptjs";

// const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const all_user = await prisma.user.findMany();
        const user = {
          id: 1,
          name: "J Smith",
          email: "john@gmail.com",
          username: "john",
        };
        const hash_pw = await hash(credentials.password, 12)
        const find_user = await prisma.user.findUnique({where: {
          username: credentials.username,
        }})
        console.log("Users", all_user, "Find user", find_user, "Is password the same?", credentials.password === find_user.password)

        if (find_user && credentials.password === find_user.password) {
          console.log("Logged in");
          return find_user;
        }
        console.log("Invalid account credential")
        return null;

 
      },
      callbacks: {
        jwt: ({ token, user }) => {
          if (user) {
            token.id = user.id;
          }
          return token;
        },
        session: ({ session, token }) => {
          if (token) {
            session.id = token.id;
          }
          return session;
        },
      },
      secret: process.env.SECRET,
      jwt: {
        secret: process.env.SECRET,
        encryption: true,
      },
      pages: {
        signIn: "auth/signin",
      },
    }),
  ],
});
