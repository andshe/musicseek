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
  onPlay?: (audioEl: HTMLAudioElement) => void;
};

function TrackResultCard({
  title,
  artist,
  image,
  previewUrl,
  links,
  onPlay,
  
}: TrackResultCardProps) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-4 w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/*  */}
      <div className="flex gap-4 items-start">
        {/* Image */}
        <img
          src={image}
          alt={`${title} cover`}
          className="w-24 h-24 rounded-md object-cover shrink-0"
        />

        {/* Info */}
        <div className="flex-1 flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{artist}</p>

          <div className="flex gap-2 flex-wrap mt-2">
            {links.spotify && (
              <a
                href={links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-700 transition"
              >
                Spotify
              </a>
            )}
            {links.itunes && (
              <a
                href={links.itunes}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-700 transition"
              >
                iTunes
              </a>
            )}
            {links.bandcamp && (
              <a
                href={links.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-purple-700 transition"
              >
                Bandcamp
              </a>
            )}
            {links.discogs && (
              <a
                href={links.discogs}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-yellow-600 transition"
              >
                Discogs
              </a>
            )}
          </div>
        </div>
      </div>

      {previewUrl && (
        <audio
          controls
          className="w-full"
          src={previewUrl}
          onPlay={(e) => {
            if (onPlay) onPlay(e.currentTarget);
          }}
        >
          Your browser does not support HTML5 audio.
        </audio>
      )}
    </div>
  );
}

export default TrackResultCard;