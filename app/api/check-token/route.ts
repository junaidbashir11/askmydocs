import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { walletPublicKey } = await request.json();
  
  const api_key = process.env.HELIUS_API_KEY; // Store in .env
  const pid = process.env.NEXT_PUBLIC_TOKEN;
  const url = `https://mainnet.helius-rpc.com/?api-key=${api_key}`;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "getTokenAccountsByOwner",
      params: [
        walletPublicKey,
        { "programId": pid },
        { "encoding": "jsonParsed" }
      ]
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const amount = parseFloat(
      data?.result?.value?.[0]?.account?.data?.parsed?.info?.tokenAmount?.amount || "0"
    );

    return NextResponse.json({ hasTokens: amount > 0 });
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return NextResponse.json({ hasTokens: false }, { status: 500 });
  }
}