"use client";
import type React from "react";
import {
  DynamicContextProvider,
  getAuthToken,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, http, WagmiProvider } from "wagmi";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { sei, sepolia } from "wagmi/chains";
import { useEffect } from "react";

const queryClient = new QueryClient();

const isProd = process.env.NEXT_PUBLIC_WORK_ENVIRONMENT === "production";

const config = createConfig({
  chains: isProd ? [sepolia] : [sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(isProd ? "https://evm-rpc.sei-apis.com/" : undefined),
  },
});

const FixedDynamicContextProvider = DynamicContextProvider as React.FC<
  React.PropsWithChildren<any>
>;

const clearAuthStorage = () => {
  // Clear local storage
  localStorage.removeItem("lastWalletAddress");
  localStorage.removeItem("dynamic-env-1-auth");
  localStorage.removeItem("dynamic-env-1-connector-choice");

  // Clear session storage
  sessionStorage.removeItem("dynamic-env-1-auth");

  // Clear cookies
  document.cookie.split(";").forEach((cookie) => {
    const [name] = cookie.trim().split("=");
    if (
      name.includes("dynamic") ||
      name.includes("wallet") ||
      name.includes("auth")
    ) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
};

type AuthInfo = {
  userId?: string;
  walletAddress?: string;
  [key: string]: any;
};

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.location.pathname.includes("waiting-list")) {
      clearAuthStorage();
      signOut({ redirect: false });
    }
  }, []);

  useEffect(() => {
    // Force chain switch on mount if needed
    const targetChain = isProd ? sepolia : sepolia;
    console.log("Target chain:", targetChain);
  }, []);

  return (
    <FixedDynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: isProd ? [sepolia] : [sepolia],
        },
        events: {
          onAuthSuccess: async () => {
            const authToken = getAuthToken();
            try {
              await signIn("credentials", {
                token: authToken,
                redirect: false,
              });
            } catch (err) {
              console.error("Error logging in", err);
            }
          },
          onLogout: async () => {
            clearAuthStorage();
            await signOut({ redirect: false });
          },
        },
      }}
    >
      <div className="hidden"></div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <SessionProvider basePath="/api/auth">
              {children}
            </SessionProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </FixedDynamicContextProvider>
  );
}
