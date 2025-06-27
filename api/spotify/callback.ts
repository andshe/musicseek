/// <reference types="node" />

export default async function handler(req: any, res: any) {
    const { code } = req.query;
  
    if (!code) {
      return res.status(400).json({ error: 'Missing code from Spotify' });
    }
  
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
  
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code as string,
          redirect_uri: redirectUri,
        }),
      });
  
      const tokenData = await response.json();
  
      if (!response.ok) {
        return res.status(500).json({ error: 'Failed to get token from Spotify', details: tokenData });
      }
  
      // Podés guardar el token en memoria, cookie, etc.
      return res.status(200).json({
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
      });
  
    } catch (error) {
      console.error('Spotify callback error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  