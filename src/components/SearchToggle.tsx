// src/components/SearchToggle.tsx
type Props = {
  searchMode: "track" | "playlist";
  setSearchMode: (mode: "track" | "playlist") => void;
};

export default function SearchToggle({ searchMode, setSearchMode }: Props) {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={`px-4 py-2 border rounded-md ${
          searchMode === "track" ? "border-black font-bold" : "border-gray-300"
        }`}
        onClick={() => setSearchMode("track")}
      >
        🔍 Buscar individualmente
      </button>
      <button
        className={`px-4 py-2 border rounded-md ${
          searchMode === "playlist" ? "border-black font-bold" : "border-gray-300"
        }`}
        onClick={() => setSearchMode("playlist")}
      >
        📋 Importar playlist
      </button>
    </div>
  );
}
