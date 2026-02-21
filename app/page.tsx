import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { MarqueeDemo } from "@/components/landing/marque"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <MarqueeDemo />
      <Footer/>
    </div>
  )
}