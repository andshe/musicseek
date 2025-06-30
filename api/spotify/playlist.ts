/// <reference types="node" />

export default async function handler(req: any, res: any) {
    const { playlistId } = req.query;
  
    if (!playlistId || typeof playlistId !== 'string') {
      return res.status(400).json({ error: 'Missing playlistId' });
    }
  
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      body: 'grant_type=client_credentials',
    });
  
    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error('Error getting token:', errorText);
      return res.status(500).json({ error: 'Failed to get token from Spotify', details: errorText });
    }
  
    const { access_token } = await tokenRes.json();
  
    const playlistRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  
    const responseText = await playlistRes.text();
    console.log('Spotify API status:', playlistRes.status);
    console.log('Spotify API response:', responseText);
  
    if (!playlistRes.ok) {
      return res
        .status(playlistRes.status)
        .json({ error: 'Failed to fetch playlist', status: playlistRes.status, details: responseText });
    }
  
    const data = JSON.parse(responseText);
    return res.status(200).json(data);
  }
  