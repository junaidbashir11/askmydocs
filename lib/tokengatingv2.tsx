export default async function TokenGATING(walletPublicKey: string | undefined) {
  if (!walletPublicKey) return false;

  try {
    const response = await fetch('/api/check-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletPublicKey })
    });

    const data = await response.json();
    return data.hasTokens;
  } catch (error) {
    console.error("Error checking token:", error);
    return false;
  }
}
