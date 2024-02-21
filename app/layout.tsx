import "./css/style.css";

import { Inter } from "next/font/google";
import Theme from "../providers/theme-provider";
import AppProvider from "../providers/app-provider";
import NextAuthProvider from "../providers/session-provider";

import "@rainbow-me/rainbowkit/styles.css";
import { RQProviders } from "@/providers/react-query-provider";
import { CryptoProvider } from "@/providers/crypto-provider";

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
        className={`${inter.variable} bg-slate-100 font-inter text-slate-600 antialiased dark:bg-slate-900 dark:text-slate-400`}
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
