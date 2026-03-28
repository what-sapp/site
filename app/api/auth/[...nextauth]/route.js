import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();
      
      const existingUser = await User.findOne({ githubId: profile.id });
      
      if (!existingUser) {
        await User.create({
          githubId: profile.id,
          username: profile.login,
          email: profile.email,
          avatar: profile.avatar_url,
          name: profile.name,
        });
      }
      
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        const dbUser = await User.findOne({ githubId: token.sub });
        session.user.id = dbUser?._id;
        session.user.login = dbUser?.username;
        session.user.isAdmin = dbUser?.isAdmin;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/',
    error: '/',
  }
});

export { handler as GET, handler as POST };