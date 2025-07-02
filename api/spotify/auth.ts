/// <reference types="node" />

export default async function handler(req: any, res: any) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: "Missing SPOTIFY_CLIENT_ID or SPOTIFY_REDIRECT_URI" });
  }

  const scope = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative"
  ].join(" ");

  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
  });

  const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
  console.log("Redirecting to Spotify auth URL:", authUrl)

  return res.redirect(302, authUrl);
}