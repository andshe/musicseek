import { useState, useRef } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import TrackResultCard from './components/TrackResultCard'

type TrackLinks = {
  spotify?: string;
  itunes?: string;
  bandcamp?: string;
  discogs?: string;
};

type TrackResultCardProps = {
  title: string;
  artist: string;
  image: string;
  previewUrl?: string;
  links: TrackLinks;
};

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TrackResultCardProps[]>([])
  const audioRef = useRef(null)

  const handleSearch = async () => {
    console.log('Searching:', query)
    const enrichedResults = await searchITunes(query)
    setResults(enrichedResults)
  }

  const searchITunes = async (query: string): Promise<TrackResultCardProps[]> => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music`
      )
      const data = await response.json()
      const results = data.results as any[]

      const enrichedResults: TrackResultCardProps[] = await Promise.all(
        results.map(async (track) => {
          const discogsLink = await searchDiscogsForTrack(track.artistName, track.trackName)

          return {
            title: track.trackName,
            artist: track.artistName,
            image: track.artworkUrl100,
            previewUrl: track.previewUrl,
            links: {
              itunes: track.trackViewUrl,
              discogs: discogsLink ?? undefined,
            },
          }
        })
      )

      return enrichedResults
    } catch (error) {
      console.error('API error:', error)
      return []
    }
  }

  const searchDiscogsForTrack = async (artist: string, title: string): Promise<string | null> => {
    const token = import.meta.env.VITE_DISCOGS_TOKEN
    const query = `${artist} ${title}`
    const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release&token=${token}`
    const discogsBaseUrl = "https://www.discogs.com";


    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        const discogsLink = `${discogsBaseUrl}${data.results[0].uri}`;
        return discogsLink 
      }
      return null
    } catch (error) {
      console.error('Discogs API error:', error)
      return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        MusicSeek by AndShe
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

        {results.map((track, i) => (
          <TrackResultCard
            key={`${track.title}-${track.artist}-${i}`}
            title={track.title}
            artist={track.artist}
            image={track.image}
            previewUrl={track.previewUrl}
            links={track.links}
          />
        ))}
      </div>
    </div>
  )
}

export default App