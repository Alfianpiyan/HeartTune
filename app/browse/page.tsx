"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { supabase } from "@/lib/db";
import { ReviewCard } from "@/components/card-1";
import Link from "next/link";

export default function BrowsePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("tb_pesan")
      .select(`
        id,
        nama_tujuan,
        nama_pengirim,
        pesan,
        music_title,
        music_artist,
        music_cover
      `)
      .ilike("nama_tujuan", `%${query}%`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setResults(data || []);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 pt-24">
      <div className="w-full max-w-xl">
        <h1
          className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #0A1F3D 0%, #4A7FBD 100%)",
          }}
        >
          Explore
        </h1>

        <p className="text-[#0A1F3D]/45 text-sm mb-8 leading-relaxed">
          Scroll the latest messages or start typing a recipient name to find
          your messages.
        </p>

        <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSearch();
  }}
  className="relative group"
>
  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0A1F3D] to-[#4A7FBD] rounded-xl opacity-0 group-focus-within:opacity-20 blur-sm transition-all duration-300" />

  <div className="relative flex items-center bg-white border border-[#EBF0F7] rounded-xl shadow-sm group-focus-within:border-[#4A7FBD]/40 transition-all">
    <div className="pl-4">
      <Search className="w-4 h-4 text-[#0A1F3D]/25" />
    </div>

    <input
      type="text"
      placeholder="Enter recipient name..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="flex-1 py-3.5 px-3 text-sm outline-none"
    />

    {query && (
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setResults([]);
        }}
        className="pr-3 text-[#0A1F3D]/25 hover:text-[#0A1F3D]/50"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    )}

    <div className="pr-2">
      <button
        type="submit"
        className="px-4 py-2 bg-[#0A1F3D] text-white text-[12px] font-semibold rounded-lg hover:bg-[#1E3A5F]"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  </div>
</form>

        <p className="text-[12px] text-[#0A1F3D]/20 mt-2 ml-1">
          Try searching a name like "safina" or "zoro"
        </p>

        <div className="mt-6 space-y-3">
          {results.map((item) => (
            <div
              key={item.id}
              className="p-4 transition"
            >
            <Link href={`/detail/${item.id}`}>
      <ReviewCard
  nama_pengirim={item.nama_pengirim}
  nama_tujuan={item.nama_tujuan}
  pesan={item.pesan}
  music_title={item.music_title}
  music_artist={item.music_artist}
  music_cover={item.music_cover}
/>
</Link>
            </div>
          ))}

          {!loading && results.length === 0 && query && (
            <p className="text-sm text-[#0A1F3D]/30 text-center">
              No messages found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}