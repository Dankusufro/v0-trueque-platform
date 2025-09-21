"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock } from "lucide-react"
import { mockItems } from "@/lib/data"
import { storage } from "@/lib/storage"
import type { Item } from "@/lib/types"

export function FeaturedItems() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    // Inicializar items si no existen
    const existingItems = storage.getItems()
    if (existingItems.length === 0) {
      storage.saveItems(mockItems)
      setItems(mockItems)
    } else {
      setItems(existingItems.slice(0, 6)) // Mostrar solo 6 items destacados
    }
  }, [])

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "nuevo":
        return "bg-green-100 text-green-800"
      case "como-nuevo":
        return "bg-blue-100 text-blue-800"
      case "bueno":
        return "bg-yellow-100 text-yellow-800"
      case "regular":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Artículos Destacados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre los artículos más populares disponibles para intercambio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${getConditionColor(item.condition)}`} variant="secondary">
                  {item.condition}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                  <span className="text-sm font-medium text-primary">{formatValue(item.estimatedValue)}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                    <AvatarFallback className="text-xs">{item.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{item.user.name}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{item.user.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Ver todos los artículos
          </Button>
        </div>
      </div>
    </section>
  )
}
