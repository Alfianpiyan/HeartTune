"use client";

import { Mail, User, Music, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  message: string;
  setMessage: (val: string) => void;
  recipient: string;
  setRecipient: (val: string) => void;
  songName: string;
  setSongName: (val: string) => void;
  songs: string[];
}

export function getStepperSteps({
  message,
  setMessage,
  recipient,
  setRecipient,
  songName,
  setSongName,
  songs,
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
          Pick a melody
        </span>
      </div>
      <select
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        className="w-full px-2 py-1.5 text-[9px] border border-[#1E3A5F]/20 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]/40 text-gray-700"
      >
        {songs.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>
      <p className="text-[7px] text-[#4A6FA5]/70 mt-1.5">
        Choose the melody that fits your feeling
      </p>
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
          {songName}
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
