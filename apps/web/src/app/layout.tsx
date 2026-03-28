import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CloudDesk Help Center",
    template: "%s | CloudDesk Help Center",
  },
  description:
    "Find answers, tutorials, and support for CloudDesk products. Browse help articles, watch video tutorials, and chat with our support team.",
  openGraph: {
    title: "CloudDesk Help Center",
    description: "Find answers, tutorials, and support for CloudDesk products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
