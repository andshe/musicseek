import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    console.log('Searching:', query)
  }

  return (
    <div className="container">
      <h1>MusicSeek 🎧</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
    </div>
  )
}

export default App