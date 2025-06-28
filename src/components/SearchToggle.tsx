// src/components/SearchToggle.tsx
import { useTranslation } from 'react-i18next';

type Props = {
  searchMode: "track" | "playlist";
  setSearchMode: (mode: "track" | "playlist") => void;
};

export default function SearchToggle({ searchMode, setSearchMode }: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={`px-4 py-2 border rounded-md ${
          searchMode === "track" ? "border-black font-bold" : "border-gray-300"
        }`}
        onClick={() => setSearchMode("track")}
      >
        {t('search_individually')}
      </button>
      <button
        className={`px-4 py-2 border rounded-md ${
          searchMode === "playlist" ? "border-black font-bold" : "border-gray-300"
        }`}
        onClick={() => setSearchMode("playlist")}
      >
         {t('import_playlist')}
      </button>
    </div>
  );
}
