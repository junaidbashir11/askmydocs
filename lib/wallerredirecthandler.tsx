'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';





export function WalletRedirectHandler({ children }: { children: React.ReactNode }) {
  const { connected ,publicKey} = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  useEffect( () => {
    

      async function  checkpresence() {
      const request=await fetch(`https://junaidb-askdocs.hf.space/checkaccount`,{

        method:"POST",
        mode:"cors",
        "body":JSON.stringify({
          "owner":publicKey?.toBase58()
        }),
        headers: {
        "Content-Type": "application/json"
  },
      }

      )
      const response=await request.json()
      if (response.status==true){
        return true
      }
      else{
        return false
      }
      
    }
    async  function setupaccount(){

      const request=await fetch("https://junaidb-askdocs.hf.space/setupaccount",{

        method:"POST",
        mode:"cors",
        "body":JSON.stringify({
          "owner":publicKey?.toBase58()
        }),
        headers: {
    "Content-Type": "application/json"
  },
      
      });
      const response=await request.json()
      if (response.status==true){
        return true;
      }
      else if (response.status==false){
        return false;
      }

}
  
   async function handleRedirect() {
      const isPresent = await checkpresence();
      
      

      if (isPresent) {
        router.push('/dashboard');
      } else {
        const isSetup = await setupaccount();
        
        

        if (isSetup) {
          router.push('/dashboard');
        } else {
          // Consider showing an error message to the user instead of redirecting to home
          router.push('/');
        }
      }
      

    }
    if(connected && publicKey){
      handleRedirect();
    }
    //handleRedirect();

  }, [connected, router,publicKey, pathname]);

  return <>{children}</>;
}