import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const songDedications = [
  {
    from: "alexa",
    to: "emil",
    message: "wish i could forget how safe it felt being around you dulu",
    song: "Always",
    artist: "Daniel Caesar",
    cover: "https://i.scdn.co/image/ab67616d0000b273...",
  },
  {
    from: "dio",
    to: "vanya",
    message:
      "funny how someone bisa jadi stranger padahal they knew all your secrets",
    song: "White Ferrari",
    artist: "Frank Ocean",
    cover: "https://i.scdn.co/image/ab67616d0000b273...",
  },
  {
    from: "sarah",
    to: "marcel",
    message:
      "i still use the playlist u made pas aku sedih.. it still helps somehow",
    song: "Apocalypse",
    artist: "Cigarettes After Sex",
    cover: "https://i.scdn.co/image/ab67616d0000b273...",
  },
  {
    from: "nina",
    to: "keyra",
    message:
      "tiap lewat coffee shop itu i wonder if u still remember our promises",
    song: "Someone To Spend Time Wi...",
    artist: "Los Retros",
    cover: "https://i.scdn.co/image/ab67616d0000b273...",
  },
  {
    from: "ryan",
    to: "reza",
    message:
      "masih ada notes kita di gallery, full of plans yang ga pernah kejadian",
    song: "when was it over? (feat...)",
    artist: "Sasha Alex Sloan, Sam Hunt",
    cover: "https://i.scdn.co/image/ab67616d0000b273...",
  },
  {
    from: "mira",
    to: "nayla",
    message:
      "thank you for being my safe place through 2023.. even if we drifted",
    song: "SOUL LADY",
    artist: "YUKIKA",
    cover: "https://i.scdn.co/image/ab67616d0000b273...",
  },
];

const firstRow = songDedications.slice(0, songDedications.length / 2);
const secondRow = songDedications.slice(songDedications.length / 2);

const SongCard = ({
  from,
  to,
  message,
  song,
  artist,
  cover,
}: {
  from: string;
  to: string;
  message: string;
  song: string;
  artist: string;
  cover: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-[420px] h-[180px] cursor-pointer overflow-hidden rounded-xl border p-5",
        "border-gray-200 bg-white shadow-sm",
        "hover:shadow-md transition-all duration-300",
        "dark:border-gray-700 dark:bg-gray-800",
        "flex flex-col justify-between",
      )}
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div>
        <p className="text-sm text-gray-500 dark:text-blue-300 mb-2">
          To: <span className="font-semibold">{to}</span>
        </p>

        <div className="mb-3">
          <p
            className="text-base text-gray-900 dark:text-blue-200 leading-relaxed line-clamp-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {message}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <img
          src={cover}
          alt={song}
          className="w-11 h-11 rounded object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-blue-400 truncate">
            {song}
          </h3>
          <p className="text-xs text-gray-500 dark:text-blue-300 truncate">
            {artist}
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        </div>
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 bg-gray-50 dark:bg-gray-900">
      <Marquee pauseOnHover className="[--duration:30s] mb-4">
        {firstRow.map((dedication, idx) => (
          <SongCard key={idx} {...dedication} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((dedication, idx) => (
          <SongCard key={idx} {...dedication} />
        ))}
      </Marquee>
      <div className="from-gray-50 dark:from-gray-900 pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r"></div>
      <div className="from-gray-50 dark:from-gray-900 pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l"></div>
    </div>
  );
}
