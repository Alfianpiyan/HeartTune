"use client";
import {
  PenIcon,
  SearchIcon,
  MessageSquareIcon,
  Music2Icon,
  HeartIcon,
  SparklesIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { TypingAnimation } from "@/components/ui/typing-animation";

export function Herodlu() {
  const features = [
    {
      icon: <MessageSquareIcon className="w-8 h-8 text-[#1E3A5F]" />,
      title: "Share your Messages",
      description:
        "Choose a song and write a heartfelt message to someone special or save it as a little gift for yourself.",
      className: "lg:col-span-1",
      gradient: "from-[#E8EEF5] to-[#D4DEF0]",
      background: (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 text-[#1E3A5F] text-6xl animate-pulse">
            ♪
          </div>
          <div className="absolute bottom-4 left-4 text-[#1E3A5F] text-5xl animate-bounce">
            ♡
          </div>
        </div>
      ),
    },
    {
      icon: <SearchIcon className="w-8 h-8 text-[#1E3A5F]" />,
      title: "Browse Messages",
      description:
        "Find messages that were written for you. Search your name and uncover heartfelt messages written just for you.",
      className: "lg:col-span-1",
      gradient: "from-[#B8C9E0] to-[#A5BADB]",
      background: (
        <div className="absolute inset-0 flex items-center justify-end pr-8 opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[#1E3A5F] text-8xl"
          >
            ♫
          </motion.div>
        </div>
      ),
    },
    {
      icon: <PenIcon className="w-8 h-8 text-[#1E3A5F]" />,
      title: "Detail Messages",
      description:
        "Tap on any message card to discover the full story behind it and listen to the song that captures the emotion.",
      className: "lg:col-span-1",
      gradient: "from-[#8BA4CB] to-[#7694C3]",
      background: (
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-6 left-6 text-[#1E3A5F] text-5xl"
          ></motion.div>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 3,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-6 right-6 text-[#1E3A5F] text-6xl"
          >
            ♬
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#FAFBFC]"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Homemade+Apple&display=swap");

        .handwritten {
          font-family: "Homemade Apple", cursive;
          letter-spacing: 0.03em;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .music-note {
          animation: float 3s ease-in-out infinite;
        }

        .music-note:nth-child(2) {
          animation-delay: 1s;
        }

        .music-note:nth-child(3) {
          animation-delay: 2s;
        }

        .group:hover .group-hover-scale {
          transform: scale(1.05);
        }
      `}</style>

      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-12 left-8 md:left-16 text-[#1E3A5F] opacity-10 text-5xl md:text-6xl music-note">
          ♪
        </div>
        <div className="absolute top-28 right-12 md:right-24 text-[#1E3A5F] opacity-10 text-6xl md:text-8xl music-note">
          ♫
        </div>
        <div className="absolute bottom-6 left-1/4 text-[#1E3A5F] opacity-10 text-5xl md:text-7xl music-note">
          ♬
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="handwritten text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] mb-2 md:mb-3 leading-relaxed px-4 min-h-[120px] md:min-h-[160px] flex items-center justify-center">
            <TypingAnimation
              className="handwritten text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] leading-relaxed inline-block"
              duration={80}
              delay={500}
            >
              every 
              unwritten feeling,
              delivered through melody
            </TypingAnimation>
          </div>

          <p
            className="text-sm sm:text-base md:text-lg text-gray-600 mb-5 md:mb-6 animate-fade-in-up px-4"
            style={{ animationDelay: "4s", opacity: 0 }}
          >
            Pour your heart into a melody and let the rhythm carry your emotion.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center items-center animate-fade-in-up px-4"
            style={{ animationDelay: "4.5s", opacity: 0 }}
          >
            <button className="w-full sm:w-auto group relative px-4 md:px-5 py-2 md:py-2.5 bg-[#1E3A5F] text-white rounded-lg font-semibold text-xs md:text-sm hover:bg-[#2d5085] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <PenIcon className="w-3.5 h-3.5" />
                Write Your Melody
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A6FA5] to-[#1E3A5F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="w-full sm:w-auto px-4 md:px-5 py-2 md:py-2.5 bg-white text-[#1E3A5F] border-2 border-[#1E3A5F] rounded-lg font-semibold text-xs md:text-sm hover:bg-[#F5F8FC] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <SearchIcon className="w-3.5 h-3.5" />
              Explore the Collection
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.2,
                ease: "easeOut",
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className={cn(
                "group relative overflow-hidden bg-gradient-to-br rounded-2xl md:rounded-3xl p-5 md:p-6 border border-[#1E3A5F]/10",
                feature.className,
                feature.gradient,
              )}
            >
              {feature.background}

              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["200% 0", "-200% 0"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="relative mb-3 md:mb-4 bg-white w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-md z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-6 h-6 md:w-7 md:h-7 text-[#1E3A5F]">
                  {feature.icon}
                </div>
              </motion.div>

              <h3 className="relative text-lg md:text-xl font-bold text-[#1E3A5F] mb-2 md:mb-3 z-10">
                {feature.title}
              </h3>

              <p className="relative text-xs md:text-sm text-[#4A6FA5] leading-relaxed z-10">
                {feature.description}
              </p>

              <motion.div
                className="relative mt-3 md:mt-4 h-1 bg-[#1E3A5F] rounded-full opacity-20 z-10"
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}