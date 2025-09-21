import { Header } from "@/components/layout/header"
import { ProfileContent } from "@/components/profile/profile-content"
import { Footer } from "@/components/layout/footer"

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <ProfileContent userId={params.userId} />
      </main>
      <Footer />
    </div>
  )
}
