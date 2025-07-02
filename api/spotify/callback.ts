/// <reference types="node" />

export default async function handler(req: any, res: any) {
    const code = req.query.code;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    //const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"; 
    const frontendUrl = "https://musicseek-alpha.vercel.app";

  
    if (!code) {
      return res.status(400).json({ error: "Missing code from Spotify" });
    }
  
    const tokenUrl = "https://accounts.spotify.com/api/token";
  
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri!,
      client_id: clientId!,
      client_secret: clientSecret!,
    });
  
    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(500).json({ error: "Failed to get access token", details: data });
      }
  
      // Podés redirigir con token o guardarlo si usás sesiones
      /*return res.status(200).json({
        message: "Token received from Spotify",
        access_token: data.access_token,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token,
        scope: data.scope,
      });
      */
      
      return res.redirect(`${frontendUrl}/?access_token=${encodeURIComponent(data.access_token)}`);

    } catch (error) {
      return res.status(500).json({ error: "Spotify token exchange failed", details: error });
    }
  }
  