"use client";


import React, { useState, useEffect } from "react";

import SongFessForm from "@/components/writeFess/form";


type FieldState = "idle" | "active" | "filled" | "error";

function useFieldState(value: string, required = true): FieldState {
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (value) setTouched(true);
  }, [value]);
  if (!touched) return "idle";
  if (required && !value) return "error";
  if (value) return "filled";
  return "idle";
}

// function SuccessModal({ onClose, song, recipient }: {
//   onClose: () => void;
//   song: Song | null;
//   recipient: string;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center px-4"
//       style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.85, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.85, opacity: 0, y: 20 }}
//         transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
//       >
       
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: [0, 1.3, 1] }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5"
//         >
//           <Heart className="w-9 h-9 fill-rose-400 text-rose-400" />
//         </motion.div>

//         <h3 className="text-xl font-black text-gray-900 mb-1">Fess Terkirim! </h3>
//         <p className="text-sm text-gray-500 mb-5">
//           Melody-mu sudah masuk ke koleksi
//           {recipient && <span className="font-semibold text-[#1E3A5F]"> untuk {recipient}</span>}
//         </p>

//         {song && (
//           <div className="flex items-center gap-3 bg-[#F5F8FC] rounded-2xl p-3 mb-6 text-left">
//             <img src={song.cover} alt={song.title} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
//             <div>
//               <p className="text-xs font-bold text-[#1E3A5F]">{song.title}</p>
//               <p className="text-[10px] text-gray-500">{song.artist}</p>
//             </div>
//           </div>
//         )}

//         <div className="flex gap-2">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl text-sm font-bold hover:bg-[#2d5085] transition-colors"
//           >
//             Kirim Lagi
//           </button>
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
//           >
//             Lihat Koleksi
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

export default function WritePage() {
  return <SongFessForm />;
}