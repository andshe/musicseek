import { useState, useRef } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import TrackResultCard from './components/TrackResultCard'

type ITunesTrack = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  trackViewUrl: string;
  previewUrl: string;
};

function App() {
  const [query, setQuery] = useState('')
  
  const [results, setResults] = useState<ITunesTrack[]>([])

  const audioRef = useRef(null)

  const handleSearch = async () => {
    console.log('Searching:', query)

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music`
      )
      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error('API error:', error)
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        MusicSeek by AndShe
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

        {results.map((track) => (
          <TrackResultCard
            key={track.trackId}
            title={track.trackName}
            artist={track.artistName}
            image={track.artworkUrl100}
            previewUrl={track.previewUrl}
            links={{
              itunes: track.trackViewUrl,
            }}
          />
        ))}
      </div>
    </div>

  )
}

export default App