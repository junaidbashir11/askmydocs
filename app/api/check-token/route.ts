import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { walletPublicKey } = await request.json();

  const api_key = process.env.HELIUS_API_KEY;
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
        //{ "programId": pid },
        {"mint":pid},
        { "encoding": "jsonParsed" }
      ]
    })
  };

  const MINIMUM_TOKENS = process.env.NEXT_PUBLIC_TOKEN_AMOUNT || 10000;

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Full API Response:", JSON.stringify(data, null, 2));


    const accountData = data?.result?.value?.[0]?.account?.data?.parsed?.info;

    if (!accountData) {
      return NextResponse.json({ hasTokens: false });
    }
    
    // Simply use uiAmount - it's already in human-readable format!
    const uiAmount = accountData.tokenAmount?.uiAmount ?? 0;
    console.log("here i am ")
    console.log(uiAmount)
    const hasEnoughTokens = uiAmount >= MINIMUM_TOKENS;

    return NextResponse.json({ hasTokens: hasEnoughTokens });

  } catch (error) {
    console.error("Error fetching token balance:", error);
    return NextResponse.json({ hasTokens: false }, { status: 500 });
  }
}