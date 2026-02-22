import * as React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Homemade_Apple } from "next/font/google";
import { cn } from "@/lib/utils"; // Assuming 'cn' utility from shadcn setup

// Interface for component props for type-safety and reusability
export interface ReviewCardProps {
  music_title: string;
  music_artist?: string;
  nama_pengirim: string;
  nama_tujuan: string;
  pesan: string;
  music_cover: string;
  className?: string;
}

const homemadeApple = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
});


const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    {
      music_title,
      music_artist,
      nama_pengirim,
      nama_tujuan,
      pesan,
      music_cover,
      className,
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-card text-card-foreground border rounded-xl p-6 shadow-sm w-full",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={music_cover || "/placeholder.jpg"}
              alt={music_title}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{music_title}</h3>
              {music_artist && (
                <p className="text-xs text-muted-foreground">
                  {music_artist}
                </p>
              )}
            </div>
          </div>
          {/* TUJUAN */}
          <span className="text-xs px-2 py-1 rounded-full bg-muted">
            To: {nama_tujuan}
          </span>
        </div>

        {/* BODY */}
        <p
          className={cn(
            homemadeApple.className,
            "mt-4 text-xl text-muted-foreground"
          )}
        >
          {pesan}
        </p>

        {/* FOOTER */}
        <p className="mt-3 text-xs text-muted-foreground">
          From: <span className="font-medium">{nama_pengirim}</span>
        </p>
      </motion.div>
    );
  }
);

ReviewCard.displayName = "ReviewCard";

export { ReviewCard };