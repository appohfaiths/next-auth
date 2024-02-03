import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"

const handler = NextAuth({
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
    signIn: "/login"
  },
  callbacks: {
    async session({ session, token, user }) {
      // session.token = token;
      console.log(session)
      return session;
    },
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }
      const response = await fetch(
        "https://api-ecg-admin.gov-gh.com/api/backoffice/users/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_PRIVATE_KEY!,
          },
          body: JSON.stringify({
            email: user.email,
          }),
        }
      );
      const results = await response.json();
      console.log(results)
      token.tokenData = results?.data;
      console.log(token)
      return token;
    },
  },
  events: {},
  debug: true,
})

export { handler as GET, handler as POST }