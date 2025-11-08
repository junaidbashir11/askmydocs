'use client'; // 👈 CRITICAL: This line makes it a Client Component

import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'; // Optional but recommended for a clean UI

// Import the required CSS for the Wallet Modal UI (add to globals.css if not already present)
// import '@solana/wallet-adapter-react-ui/styles.css'; 




export function WalletProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Set the network (e.g., Devnet for development)
  const network = WalletAdapterNetwork.Mainnet; 

  // 2. Define the RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // 3. Define the wallets you want to support
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({network}),
      // Add other wallets here...
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* The autoConnect prop tries to re-connect if the user previously connected */}
      <WalletProvider wallets={wallets} autoConnect>
        {/* WalletModalProvider is necessary if you use the built-in UI components */}
        <WalletModalProvider>
        
          {children}

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}