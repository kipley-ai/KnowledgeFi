import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import OAuthProvider from "next-auth/providers/oauth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

const handler = NextAuth({
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID as string,
			clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		// `session` are executed at `useSession` time
		session: async ({ session, token }: { session: Session; token: JWT }) => {
			if (session?.user) {
				(session?.user as any).username = token.username;
			}

			return session;
		},
		// `jwt` are executed at signin time
		jwt: async ({
			token,
			profile,
		}: {
			token: JWT;
			user?: any; // User | AdapterUser;
			account?: any; // Account | null;
			profile?: any; // Profile | undefined;
			isNewUser?: boolean | undefined;
			session?: any;
			trigger?: "signIn" | "signUp" | "update" | undefined;
		}) => {
			if (profile) {
				token.username = profile.screen_name;
			}

			return token;
		},
	},
});

export { handler as GET, handler as POST };
