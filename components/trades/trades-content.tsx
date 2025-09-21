"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import type { TradeOffer } from "@/lib/types"

export function TradesContent() {
  const [offers, setOffers] = useState<TradeOffer[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      const allOffers = storage.getTradeOffers()
      const userOffers = allOffers.filter((offer) => offer.fromUserId === user.id || offer.toUserId === user.id)
      setOffers(userOffers)
    }
  }, [user])

  const handleOfferAction = (offerId: string, action: "accepted" | "rejected") => {
    const updatedOffers = offers.map((offer) =>
      offer.id === offerId ? { ...offer, status: action, updatedAt: new Date() } : offer,
    )

    setOffers(updatedOffers)
    storage.saveTradeOffers(
      storage
        .getTradeOffers()
        .map((offer) => (offer.id === offerId ? { ...offer, status: action, updatedAt: new Date() } : offer)),
    )

    toast({
      title: action === "accepted" ? "Oferta aceptada" : "Oferta rechazada",
      description:
        action === "accepted"
          ? "La oferta ha sido aceptada. Contacta al usuario para coordinar el intercambio."
          : "La oferta ha sido rechazada.",
    })
  }

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const sentOffers = offers.filter((offer) => offer.fromUserId === user?.id)
  const receivedOffers = offers.filter((offer) => offer.toUserId === user?.id)

  if (!user) {
    return (
      <div className="container">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Mis Intercambios</h1>
          <p className="text-muted-foreground">Inicia sesión para ver tus intercambios</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mis Intercambios</h1>
        <p className="text-muted-foreground">Gestiona tus ofertas de intercambio enviadas y recibidas</p>
      </div>

      <Tabs defaultValue="received" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received">Recibidas ({receivedOffers.length})</TabsTrigger>
          <TabsTrigger value="sent">Enviadas ({sentOffers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          {receivedOffers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📥</div>
              <h3 className="text-xl font-semibold mb-2">No tienes ofertas recibidas</h3>
              <p className="text-muted-foreground">Las ofertas que otros usuarios te envíen aparecerán aquí</p>
            </div>
          ) : (
            receivedOffers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Oferta de {offer.fromUser.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(offer.status)}
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={offer.fromUser.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{offer.fromUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{offer.fromUser.name}</p>
                      <p className="text-sm text-muted-foreground">{new Date(offer.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {offer.message && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm">{offer.message}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Te ofrece:</h4>
                      <div className="space-y-2">
                        {offer.offeredItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-2 border rounded">
                            <img
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{formatValue(item.estimatedValue)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Por tu:</h4>
                      <div className="space-y-2">
                        {offer.requestedItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-2 border rounded">
                            <img
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{formatValue(item.estimatedValue)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {offer.status === "pending" && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => handleOfferAction(offer.id, "rejected")}
                        className="flex-1"
                      >
                        Rechazar
                      </Button>
                      <Button onClick={() => handleOfferAction(offer.id, "accepted")} className="flex-1">
                        Aceptar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          {sentOffers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📤</div>
              <h3 className="text-xl font-semibold mb-2">No has enviado ofertas</h3>
              <p className="text-muted-foreground">Explora el marketplace y envía ofertas de intercambio</p>
            </div>
          ) : (
            sentOffers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Oferta para {offer.toUser.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(offer.status)}
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={offer.toUser.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{offer.toUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{offer.toUser.name}</p>
                      <p className="text-sm text-muted-foreground">{new Date(offer.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Ofreces:</h4>
                      <div className="space-y-2">
                        {offer.offeredItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-2 border rounded">
                            <img
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{formatValue(item.estimatedValue)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Por:</h4>
                      <div className="space-y-2">
                        {offer.requestedItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-2 border rounded">
                            <img
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{formatValue(item.estimatedValue)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
