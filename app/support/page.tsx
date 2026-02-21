"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const N = "#0A1F3D";

const DONATE_OPTIONS = [
  {
    id: "saweria",
    name: "Saweria",
    description: "Support langsung ke kreator lewat platform lokal.",
    url: "https://saweria.co/username",
  },
  {
    id: "dana",
    name: "DANA",
    description: "Transfer bebas via e-wallet DANA, cepat dan mudah.",
    url: "https://link.dana.id/kumpulan?username",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-[26px] font-bold" style={{ color: N }}>
            Support Kami
          </h1>
          <p className="text-[13px] mt-1.5 max-w-sm leading-relaxed" style={{ color: `${N}65` }}>
            Support kecilmu sangat membantu kami untuk terus berkembang.
          </p>
        </motion.div>

        <div className="h-px mb-7" style={{ background: `${N}10` }} />

        <div className="grid grid-cols-2 gap-4">
          {DONATE_OPTIONS.map((opt, i) => (
            <motion.a
              key={opt.id}
              href={opt.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, ease: "easeOut", delay: i * 0.09 + 0.1 }}
              whileHover={{ y: -3, boxShadow: `0 10px 36px ${N}22`, borderColor: N }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col justify-between p-5 rounded-2xl border bg-white"
              style={{
                borderColor: `${N}14`,
                boxShadow: `0 2px 16px ${N}08`,
              }}
            >
              <div>
                <p className="text-[17px] font-bold mb-1.5" style={{ color: N }}>
                  {opt.name}
                </p>
                <p className="text-[12px] leading-relaxed" style={{ color: `${N}65` }}>
                  {opt.description}
                </p>
              </div>

              <div className="flex items-center justify-end mt-6">
                <span className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: `${N}70` }}>
                  Buka <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-7 text-center text-[11px]"
          style={{ color: `${N}45` }}
        >
          Semua support digunakan untuk biaya server dan fitur baru. Terima kasih!
        </motion.p>

      </div>
    </div>
  );
}