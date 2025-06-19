
export default async function handler(req: any, res: any) {
    const { query } = req.query;
  
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Missing query parameter" });
    }
  
    const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(
      query
    )}&token=${process.env.DISCOGS_TOKEN}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch from Discogs" });
    }
  }
  