'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';

export function WalletRedirectHandler({ children }: { children: React.ReactNode }) {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connected || !publicKey) return;

    // Instant feedback — redirect immediately
    router.push('/dashboard');

    // Run backend setup silently
    (async () => {
      try {
        const owner = publicKey.toBase58();

        const check = await fetch(`https://junaidb-askdocs.hf.space/checkaccount`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ owner }),
        });

        const checkRes = await check.json();

        if (!checkRes.status) {
          // Only setup if not found
          await fetch(`https://junaidb-askdocs.hf.space/setupaccount`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ owner }),
          });
        }
      } catch (err) {
        console.error('Account check/setup failed:', err);
      }
    })();
  }, [connected, publicKey, router]);

  return <>{children}</>;
}
