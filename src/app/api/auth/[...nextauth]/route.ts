import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createUserService } from '../../../../app-services/user.service';

const userService = createUserService();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        if (!profile) return false;
        return userService.verify(profile);
      }

      return false;
    },
    // jwt: async ({ token, user }) => {
    //   user && (token.user = user);
    //   return token;
    // },
    session: async ({ session, token }) => {
      session.user = await userService.getByEmail(token.email!);
      return session;
    }
  }
});

export { handler as GET, handler as POST };
