import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"
  
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{ strategy: 'jwt' },
  callbacks: {
    jwt: async({token}) => {
      console.log('jwt callback', token)
      return token;
    },
    async session({ token, session }) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    }
  },
  ...authConfig
})