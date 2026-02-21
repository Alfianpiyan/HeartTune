"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function BrowsePage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 pt-24">
      <div className="w-full max-w-xl">
        <h1
          className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #0A1F3D 0%, #4A7FBD 100%)" }}
        >
          Explore
        </h1>
        <p className="text-[#0A1F3D]/45 text-sm mb-8 leading-relaxed">
          Scroll the latest messages or start typing a recipient name to find your messages.
        </p>
        <div className="relative group">
          {/* Glow background */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0A1F3D] to-[#4A7FBD] rounded-xl opacity-0 group-focus-within:opacity-20 blur-sm transition-all duration-300" />

          <div className="relative flex items-center bg-white border border-[#EBF0F7] rounded-xl shadow-sm group-focus-within:border-[#4A7FBD]/40 group-focus-within:shadow-md transition-all duration-300">
            <div className="pl-4 shrink-0">
              <Search className="w-4 h-4 text-[#0A1F3D]/25 group-focus-within:text-[#4A7FBD] transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Enter recipient name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 py-3.5 px-3 text-sm text-[#0A1F3D] bg-transparent outline-none placeholder:text-[#0A1F3D]/25"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="pr-3 shrink-0 text-[#0A1F3D]/25 hover:text-[#0A1F3D]/50 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="pr-2 shrink-0">
              <button className="px-4 py-2 bg-[#0A1F3D] text-white text-[12px] font-semibold rounded-lg hover:bg-[#1E3A5F] transition-colors duration-200 shadow-sm">
                Search
              </button>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-[#0A1F3D]/20 mt-2.5 ml-1">
          Try searching a name like "safina" or "zoro"
        </p>

      </div>
    </div>
  );
}