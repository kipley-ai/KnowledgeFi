import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import OAuthProvider from "next-auth/providers/oauth";

const handler = NextAuth({
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID || "",
			clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
		}),
	],
});

export { handler as GET, handler as POST };
