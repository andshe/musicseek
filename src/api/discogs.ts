
export async function searchDiscogsForTrack (artist: string, title: string): Promise<string | null> {
    const query = `${artist} ${title}`
    const url = `/api/discogs?query=${encodeURIComponent(query)}`
    const discogsBaseUrl = "https://www.discogs.com";
  
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.results && data.results.length > 0 && data.results[0].uri) {
        return `${discogsBaseUrl}${data.results[0].uri}`;
      }
      console.warn(`No Discogs result for ${query}`);
      return null
    } catch (error) {
      console.error('Discogs API error:', error)
      return null
    }
  }