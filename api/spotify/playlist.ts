/// <reference types="node" />

export default async function handler(req: any, res: any) {
  const { playlistId, access_token } = req.query;

  if (!playlistId || typeof playlistId !== 'string') {
    return res.status(400).json({ error: 'Missing playlistId' });
  }

  if (!access_token || typeof access_token !== 'string') {
    return res.status(400).json({ error: 'Missing access_token from frontend' });
  }

  console.log('Received playlistId:', playlistId);
  console.log('Using access_token from frontend');

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
