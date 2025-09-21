"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import { AuthModal } from "@/components/auth/auth-modal"
import { useAuth } from "@/contexts/auth-context"

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user } = useAuth()

  const handleGetStarted = () => {
    if (!user) {
      setAuthModalOpen(true)
    } else {
      // Redirect to marketplace
      window.location.href = "/marketplace"
    }
  }

  return (
    <>
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
              Intercambia lo que tienes por lo que <span className="text-primary">necesitas</span>
            </h1>

            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              Una plataforma segura y confiable para intercambiar bienes y servicios sin usar dinero. Únete a la
              economía circular.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="¿Qué estás buscando?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button size="lg" className="gap-2">
                Buscar
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="gap-2">
                Comenzar ahora
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Ver cómo funciona
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Artículos disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-sm text-muted-foreground">Usuarios activos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
                <div className="text-sm text-muted-foreground">Intercambios exitosos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultMode="register" />
    </>
  )
}
