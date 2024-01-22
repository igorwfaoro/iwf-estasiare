import { AuthOptions, Session, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createUserService } from '../app-services/user.service';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthUser } from './auth-user';

const userService = createUserService();

export const authOptions: AuthOptions = {
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
};

export const getAuthSession = async (
  req?: NextRequest,
  res?: NextResponse
): Promise<Session> => {
  const session =
    req && res
      ? await getServerSession(
          req as unknown as NextApiRequest,
          {
            ...res,
            getHeader: (name: string) => res.headers?.get(name),
            setHeader: (name: string, value: string) =>
              res.headers?.set(name, value)
          } as unknown as NextApiResponse,
          authOptions
        )
      : await getServerSession(authOptions);

  if (!session) {
    (res as unknown as NextApiResponse)
      .status(401)
      .json({ message: 'Unauthorized' });
    throw new Error('Unauthorized');
  }

  return session;
};

export const getAuthUser = async (
  req?: NextRequest,
  res?: NextResponse
): Promise<AuthUser> => (await getAuthSession(req, res)).user;
