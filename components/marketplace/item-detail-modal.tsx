"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, Heart, Share2, MessageCircle } from "lucide-react"
import { TradeOfferModal } from "./trade-offer-modal"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import type { Item } from "@/lib/types"

interface ItemDetailModalProps {
  item: Item
  isOpen: boolean
  onClose: () => void
}

export function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  const [tradeOfferOpen, setTradeOfferOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { user } = useAuth()

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

  const isOwnItem = user?.id === item.userId

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{item.title}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Imágenes */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg border">
                <img
                  src={item.images[currentImageIndex] || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${getConditionColor(item.condition)}`} variant="secondary">
                  {item.condition}
                </Badge>
              </div>

              {item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                        index === currentImageIndex ? "border-primary" : "border-border"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detalles */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-primary">{formatValue(item.estimatedValue)}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>

              <Separator />

              {/* Información del usuario */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                  <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.user.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.user.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{item.user.totalTrades} intercambios</span>
                  </div>
                </div>
                <Link href={`/profile/${item.user.id}`}>
                  <Button variant="outline" size="sm">
                    Ver perfil
                  </Button>
                </Link>
              </div>

              <Separator />

              {/* Detalles adicionales */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Publicado el {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Acciones */}
              <div className="space-y-3">
                {!isOwnItem ? (
                  <>
                    <Button className="w-full" size="lg" onClick={() => setTradeOfferOpen(true)} disabled={!user}>
                      Proponer intercambio
                    </Button>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <MessageCircle className="h-4 w-4" />
                      Enviar mensaje
                    </Button>
                    {!user && (
                      <p className="text-xs text-muted-foreground text-center">
                        Inicia sesión para proponer intercambios
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Este es tu artículo</p>
                    <Button variant="outline" className="mt-2 bg-transparent">
                      Editar publicación
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {tradeOfferOpen && (
        <TradeOfferModal targetItem={item} isOpen={tradeOfferOpen} onClose={() => setTradeOfferOpen(false)} />
      )}
    </>
  )
}
