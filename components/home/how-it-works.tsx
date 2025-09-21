import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageCircle, Handshake, Star } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Busca y Publica",
    description: "Encuentra artículos que te interesen o publica los tuyos para intercambiar.",
  },
  {
    icon: MessageCircle,
    title: "Conecta y Negocia",
    description: "Contacta con otros usuarios y negocia los términos del intercambio.",
  },
  {
    icon: Handshake,
    title: "Intercambia",
    description: "Realiza el intercambio de forma segura en un lugar público acordado.",
  },
  {
    icon: Star,
    title: "Califica",
    description: "Califica tu experiencia para ayudar a construir confianza en la comunidad.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Intercambiar es fácil y seguro. Sigue estos simples pasos para comenzar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center relative">
              <CardContent className="p-6">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>

                <div className="mt-4 mb-4">
                  <step.icon className="h-12 w-12 mx-auto text-primary" />
                </div>

                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
