/// <reference types="node" />

export default function handler(req: any, res: any) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  const scope = [
    'playlist-read-private',
    'playlist-read-collaborative'
  ].join(' ');

  const authUrl = `https://accounts.spotify.com/authorize?` +
    new URLSearchParams({
      response_type: 'code',
      client_id: clientId!,
      scope,
      redirect_uri: redirectUri!,
    });

  res.writeHead(302, { Location: authUrl });
  res.end();
}