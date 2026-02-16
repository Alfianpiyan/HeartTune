import { Hero } from "@/components/landing/hero"
import { MarqueeDemo } from "@/components/landing/marque"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <MarqueeDemo />
    </div>
  )
}