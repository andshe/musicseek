import { useTranslation } from 'react-i18next';

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
};

function SearchBar({ query, setQuery, onSearch }: SearchBarProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex gap-2">
      <input
        type="text"
        placeholder={t('search_placeholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSearch();
          }
        }}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {t('search_button')}
      </button>
    </div>
  );
}

export default SearchBar;
