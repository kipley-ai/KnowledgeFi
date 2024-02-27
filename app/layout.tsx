import "./css/style.css";

import localFont from "next/font/local";
import { Inter, Jura } from "next/font/google";
import Theme from "../providers/theme-provider";
import AppProvider from "../providers/app-provider";
import NextAuthProvider from "../providers/session-provider";

import "@rainbow-me/rainbowkit/styles.css";
import { RQProviders } from "@/providers/react-query-provider";
import { CryptoProvider } from "@/providers/crypto-provider";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const jura = Jura({
//   subsets: ["latin"],
//   variable: "--font-jura",
//   display: "swap",
// });

const protoMono = localFont({
  src: [
    {
      path: "../public/fonts/ProtoMono-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/ProtoMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ProtoMono-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-proto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${protoMono.variable} font-jura bg-slate-100 font-mono text-slate-600 antialiased dark:bg-slate-900 dark:text-slate-400`}
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
