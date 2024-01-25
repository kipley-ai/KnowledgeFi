import "./css/style.css";

import { Inter } from "next/font/google";
import Theme from "../providers/theme-provider";
import AppProvider from "../providers/app-provider";
import NextAuthProvider from "../providers/session-provider";

import "@rainbow-me/rainbowkit/styles.css";
import { CryptoProvider } from "@/providers/crypto-provider";
import { RQProviders } from "@/providers/react-query-provider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			{/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
			<body
				className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}
			>
				<RQProviders>
					<Theme>
						<AppProvider>
							<NextAuthProvider>
								<CryptoProvider>{children}</CryptoProvider>
							</NextAuthProvider>
						</AppProvider>
					</Theme>
				</RQProviders>
			</body>
		</html>
	);
}
