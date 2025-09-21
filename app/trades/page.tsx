import { Header } from "@/components/layout/header"
import { TradesContent } from "@/components/trades/trades-content"
import { Footer } from "@/components/layout/footer"

export default function TradesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <TradesContent />
      </main>
      <Footer />
    </div>
  )
}
