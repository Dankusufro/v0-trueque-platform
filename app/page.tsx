import { Header } from "@/components/layout/header"
import { Hero } from "@/components/home/hero"
import { FeaturedItems } from "@/components/home/featured-items"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedItems />
        <Categories />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
