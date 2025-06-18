type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
};

function SearchBar({ query, setQuery, onSearch }: SearchBarProps) {
  return (
    <div className="w-full flex gap-2">
      <input
        type="text"
        placeholder="Type here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Seek
      </button>
    </div>
  );
}

export default SearchBar;
