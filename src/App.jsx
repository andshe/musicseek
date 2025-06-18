import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

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
    <div className="container">
      <h1>MusicSeek 🎧</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      <div className="results">
        {results.map((track) => (
          <div key={track.trackId} className="track">
            <img src={track.artworkUrl100} alt={track.trackName} />
            <div>
              <p><strong>{track.trackName}</strong> - {track.artistName}</p>
              <audio controls src={track.previewUrl}></audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App