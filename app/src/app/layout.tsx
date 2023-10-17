import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// BiblioKeia Providers
import { ProgressProvider } from "@/providers/progress";
import { AlertProvider } from "@/providers/alert";
import { ModeProvider } from "@/providers/mode";
import { ParamsAuthorityProvider } from "@/providers/paramsAuthority";

// BiblioKeia Components

import { NavigationEvents } from "@/components/utils/navigation-events";

// React Hooks
import { Suspense } from "react";
// import ProgressBar from "@/components/loadings/progressBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bk-ui",
  description: "BiblioKeia Front End",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProgressProvider>
        <ModeProvider>
          <AlertProvider>
            <ParamsAuthorityProvider>
              <body className={inter.className}>
                {children}
                <Suspense fallback={null}>
                  <NavigationEvents />
                </Suspense>
              </body>
            </ParamsAuthorityProvider>
          </AlertProvider>
        </ModeProvider>
      </ProgressProvider>
    </html>
  );
}