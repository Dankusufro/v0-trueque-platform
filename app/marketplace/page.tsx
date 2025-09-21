import { Header } from "@/components/layout/header"
import { MarketplaceContent } from "@/components/marketplace/marketplace-content"
import { Footer } from "@/components/layout/footer"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <MarketplaceContent />
      </main>
      <Footer />
    </div>
  )
}
