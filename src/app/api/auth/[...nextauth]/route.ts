import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"

export default NextAuth({
  // Do whatever you want here, before the request is passed down to `NextAuth`
      // Options
      providers: [
          GoogleProvider({
              clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
            },
            },
          }),
          AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            }),
      ],
      secret: process.env.SECRET,
      session: {
          strategy: "jwt",
          maxAge: 24 * 60 * 60, // 1 day
      },
      jwt: {
          secret: process.env.JWT_SECRET,
      },
      pages: {
          signIn: "/"
      },
      callbacks: {
          async session(session, token) {
              session.token = token;
            return session;
          },
            async jwt(token, user) {
                if (!user) {
                    return token;
                }
                return token;
            },
      },
      events: {},
      debug: true,
})