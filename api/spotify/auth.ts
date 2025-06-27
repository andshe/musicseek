/// <reference types="node" />

export default function handler(req: any, res: any) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  console.log("Spotify Auth Debug:", {
    clientId,
    redirectUri,
    clientSecretExists: !!clientSecret,
  });

  if (!clientId || !redirectUri || !clientSecret) {
    return res.status(500).json({
      error: "Missing one or more environment variables.",
      clientId: !!clientId,
      redirectUri: !!redirectUri,
      clientSecret: !!clientSecret,
    });
  }

  return res.status(200).json({
    message: "Spotify auth endpoint is working.",
    clientId,
    redirectUri,
    clientSecretExists: !!clientSecret,
  });
}
