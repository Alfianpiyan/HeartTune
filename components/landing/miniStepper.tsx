"use client";

import { Mail, User, Music, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  preview: string;
}

interface Props {
  message: string;
  setMessage: (val: string) => void;
  recipient: string;
  setRecipient: (val: string) => void;
  songs: Song[];
  selectedSong: Song | null;
}


export function getStepperSteps({
  message,
  setMessage,
  recipient,
  setRecipient,
  songs,
  selectedSong,
}: Props) {
  return [
    <div key="msg" className="flex flex-col h-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded-md bg-[#061025]/10 flex items-center justify-center">
          <Mail className="w-3 h-3 text-[#1E3A5F]" />
        </div>
        <span className="text-[10px] font-bold text-[#1E3A5F]">
          Write your message
        </span>
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Pour your heart out..."
        className="flex-1 w-full px-2 py-1.5 text-[9px] border border-[#1E3A5F]/20 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]/40 resize-none leading-relaxed placeholder:text-gray-400"
      />
    </div>,

    <div key="to" className="flex flex-col h-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded-md bg-[#1E3A5F]/10 flex items-center justify-center">
          <User className="w-3 h-3 text-[#1E3A5F]" />
        </div>
        <span className="text-[10px] font-bold text-[#1E3A5F]">
          Who is this for?
        </span>
      </div>
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient name..."
        className="w-full px-2 py-1.5 text-[9px] border border-[#1E3A5F]/20 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]/40 placeholder:text-gray-400"
      />
      <p className="text-[7px] text-[#4A6FA5]/70 mt-1.5">
        Leave blank to post anonymously
      </p>
    </div>,

    <div key="song" className="flex flex-col h-full">
  <div className="flex items-center gap-1.5 mb-1.5">
    <div className="w-5 h-5 rounded-md bg-[#1E3A5F]/10 flex items-center justify-center">
      <Music className="w-3 h-3 text-[#1E3A5F]" />
    </div>
    <span className="text-[10px] font-bold text-[#1E3A5F]">
      Selected Melody
    </span>
  </div>

 {songs.length > 0 ? (
  <div className="flex flex-col gap-2">
    {songs.map((song) => (
      <div
        key={song.id}
        className="flex items-center gap-2 bg-white border border-[#1E3A5F]/20 rounded-lg p-2"
      >
        <img
          src={song.cover}
          alt={song.title}
          className="w-10 h-10 rounded-md object-cover"
        />

        <div className="flex flex-col">
          <p className="text-[9px] font-semibold text-gray-800">
            {song.title}
          </p>
          <p className="text-[8px] text-gray-500">
            {song.artist}
          </p>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-[8px] text-red-500">
    No songs found
  </p>
)}
</div>,


    <div
      key="done"
      className="flex flex-col items-center justify-center h-full text-center gap-2"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        <CheckCircle2 className="w-9 h-9 text-green-500" />
      </motion.div>

      <div>
        <p className="text-[11px] font-bold text-gray-800">
          Message Delivered!
        </p>
        <p className="text-[8px] text-gray-500 mt-0.5">
          Now live in the collection
        </p>
      </div>

      <div className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/60 rounded-lg px-2 py-1.5 text-left space-y-0.5">
      <p className="text-[8px] text-green-700 font-semibold flex items-center gap-1 truncate">
  <Music className="w-2.5 h-2.5 shrink-0" />
 {selectedSong?.title} — {selectedSong?.artist}
</p>

        {recipient && (
          <p className="text-[7px] text-green-600 flex items-center gap-1">
            <User className="w-2.5 h-2.5 shrink-0" /> {recipient}
          </p>
        )}

        {message && (
          <p className="text-[7px] text-green-600/70 italic line-clamp-1">
            "{message}"
          </p>
        )}
      </div>
    </div>,
  ];
}
