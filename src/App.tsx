import { useState, useRef } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import TrackResultCard from './components/TrackResultCard'
import { searchDiscogsForTrack } from './api/discogs';

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
      const response = await fetch(`/api/itunes?query=${encodeURIComponent(query)}`);
      const data = await response.json();
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