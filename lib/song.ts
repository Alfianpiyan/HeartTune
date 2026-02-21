export const SONGS = [
  {
    id: "1",
    title: "Perfect",
    artist: "Ed Sheeran",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=80&h=80&fit=crop",
  },
  {
    id: "2",
    title: "All of Me",
    artist: "John Legend",
    genre: "Soul",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop",
  },
  {
    id: "3",
    title: "A Thousand Years",
    artist: "Christina Perri",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&h=80&fit=crop",
  },
  {
    id: "4",
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
  },
  {
    id: "5",
    title: "Lover",
    artist: "Taylor Swift",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop",
  },
  {
    id: "6",
    title: "Die With A Smile",
    artist: "Bruno Mars",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=80&h=80&fit=crop",
  },
  {
    id: "7",
    title: "Cinta Luar Biasa",
    artist: "Andmesh",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&h=80&fit=crop",
  },
] as const;

export type Song = (typeof SONGS)[number];
