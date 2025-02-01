import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google({
        clientId: process.env.GCP_CLIENT_ID,
        clientSecret: process.env.GCP_SECRET_KEY
      })],
})