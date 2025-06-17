import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    console.log('Searching:', query)
  }

  return (
    <div className="container">
      <h1>MusicSeek 🎧</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for music..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}

export default App