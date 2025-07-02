import { useState, useRef, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import TrackResultCard from './components/TrackResultCard'
import { searchDiscogsForTrack } from './api/discogs';
import SearchToggle from "./components/SearchToggle";
import './i18n';
import { useTranslation } from 'react-i18next';


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
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<'individual' | 'playlist'>('individual');
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TrackResultCardProps[]>([])
  const audioRef = useRef(null)
  const { t } = useTranslation();


  const handleSearch = async () => {
    setIsLoading(true);
    try {
      console.log('Searching:', query);
  
      if (searchMode === 'individual') {
        const enrichedResults = await searchITunes(query);
        setResults(enrichedResults);
      } else if (searchMode === 'playlist') {
        const playlistId = extractPlaylistId(query);
  
        if (!playlistId) {
          alert('Invalid playlist URL');
          return;
        }
  
        const data = await fetchPublicPlaylist(playlistId);
        const adaptedResults = mapSpotifyResults(data.tracks.items);
        setResults(adaptedResults);
        
      } else {
        const enrichedResults = await searchITunes(query);
        setResults(enrichedResults);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching the results. Check the console for more details.");
    } finally {
      setIsLoading(false);
    }
  };
  

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
  const handleTrackPlay = (audioEl: HTMLAudioElement) => {
    if (currentAudioRef.current && currentAudioRef.current !== audioEl) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    currentAudioRef.current = audioEl;
  };

  const extractPlaylistId = (url: string): string | null => {
    const match = url.match(/playlist\/([a-zA-Z0-9]+)(\?|$)/);
    console.log(match)
    return match ? match[1] : null;
  };
  
  const fetchPublicPlaylist = async (playlistId: string) => {
    const token = localStorage.getItem("spotify_token");
  
    const res = await fetch(`/api/spotify/playlist?playlistId=${playlistId}&access_token=${token}`);
    if (!res.ok) {
      throw new Error('Failed to fetch playlist');
    }
    return res.json();
  };
  
  
  const mapSpotifyResults = (spotifyItems: any[]): TrackResultCardProps[] => {
    return spotifyItems.map((item) => {
      const track = item.track;
      return {
        title: track.name,
        artist: track.artists?.[0]?.name ?? 'Unknown',
        image: track.album?.images?.[0]?.url ?? '',
        previewUrl: track.preview_url ?? undefined,
        links: {
          spotify: track.external_urls?.spotify,
        },
      };
    });
  };
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("spotify_token", token);
      window.history.replaceState({}, document.title, "/"); // limpia la URL
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <button
        onClick={() => {
          window.location.href = "/api/spotify/auth";
        }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Login with Spotify
      </button>

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        MusicSeek 
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        
        <SearchToggle searchMode={searchMode} setSearchMode={setSearchMode} />

        {searchMode === "individual" && (
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} mode={searchMode}/>
        )}

        {/* En el futuro, podés agregar acá el importador de playlist */}
        {searchMode === "playlist" && (
          <div className="p-4 bg-white border rounded shadow space-y-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('playlist_placeholder')}
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              {t('search_button')}
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center my-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
          </div>
        )}

        {results.map((track, i) => (
          <TrackResultCard
            key={`${track.title}-${track.artist}-${i}`}
            title={track.title}
            artist={track.artist}
            image={track.image}
            previewUrl={track.previewUrl}
            links={track.links}
            onPlay={handleTrackPlay}
          />
        ))}
      </div>
    </div>
  )
}

export default App