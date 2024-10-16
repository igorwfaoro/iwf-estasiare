import { NextApiRequest, NextApiResponse } from 'next';
import { AuthOptions, Session, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextRequest, NextResponse } from 'next/server';

import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthError } from '../errors/types/auth.error';
import { createUserServerService } from '../services/server/user.server-service';
import { AuthUser } from './auth-user';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        const userService = createUserServerService();

        if (!credentials?.email || !credentials.password)
          throw new AuthError('E-mail ou Senha inválida');

        return userService.verifyByEmailAndPassword(credentials);
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      const userService = createUserServerService();

      if (account?.provider === 'google') {
        if (!profile) return false;
        return userService.verifyByProfile(profile);
      }

      if (account?.provider === 'credentials') {
        if (!user) return false;
        return true;
      }

      return false;
    },
    // jwt: async ({ token, user }) => {
    //   user && (token.user = user);
    //   return token;
    // },
    session: async ({ session, token }) => {
      const userService = createUserServerService();

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
    res &&
      (res as unknown as NextApiResponse)
        .status(401)
        .json({ message: 'Unauthorized' });

    throw new AuthError('Não autorizado');
  }

  return session;
};

export const getAuthUser = async (
  req?: NextRequest,
  res?: NextResponse
): Promise<AuthUser> => (await getAuthSession(req, res)).user;
