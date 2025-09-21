"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import type { Item, TradeOffer } from "@/lib/types"

interface TradeOfferModalProps {
  targetItem: Item
  isOpen: boolean
  onClose: () => void
}

export function TradeOfferModal({ targetItem, isOpen, onClose }: TradeOfferModalProps) {
  const [userItems, setUserItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      const allItems = storage.getItems()
      const myItems = allItems.filter((item) => item.userId === user.id && item.isAvailable)
      setUserItems(myItems)
    }
  }, [user])

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleSubmit = async () => {
    if (!user || selectedItems.length === 0) return

    setIsSubmitting(true)

    try {
      const allItems = storage.getItems()
      const offeredItems = allItems.filter((item) => selectedItems.includes(item.id))

      const newOffer: TradeOffer = {
        id: Date.now().toString(),
        fromUserId: user.id,
        toUserId: targetItem.userId,
        fromUser: user,
        toUser: targetItem.user,
        offeredItems,
        requestedItems: [targetItem],
        status: "pending",
        message: message.trim() || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const existingOffers = storage.getTradeOffers()
      storage.saveTradeOffers([...existingOffers, newOffer])

      toast({
        title: "¡Oferta enviada!",
        description: "Tu propuesta de intercambio ha sido enviada al usuario.",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la oferta. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const totalOfferedValue = userItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.estimatedValue, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Proponer Intercambio</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Artículo solicitado */}
          <div>
            <h3 className="font-semibold mb-3">Artículo que solicitas:</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={targetItem.images[0] || "/placeholder.svg"}
                    alt={targetItem.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{targetItem.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{targetItem.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline">{targetItem.condition}</Badge>
                      <span className="font-medium text-primary">{formatValue(targetItem.estimatedValue)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Artículos a ofrecer */}
          <div>
            <h3 className="font-semibold mb-3">Tus artículos para intercambiar:</h3>

            {userItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tienes artículos disponibles para intercambiar.</p>
                <Button variant="outline" className="mt-2 bg-transparent">
                  Publicar artículo
                </Button>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {userItems.map((item) => (
                  <Card key={item.id} className="cursor-pointer hover:bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleItemToggle(item.id)}
                        />
                        <img
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.condition}
                            </Badge>
                            <span className="text-sm font-medium text-primary">{formatValue(item.estimatedValue)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {selectedItems.length > 0 && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Valor total ofrecido:</span>
                <span className="text-lg font-bold text-primary">{formatValue(totalOfferedValue)}</span>
              </div>
              <div className="flex justify-between items-center mt-1 text-sm text-muted-foreground">
                <span>Valor solicitado:</span>
                <span>{formatValue(targetItem.estimatedValue)}</span>
              </div>
            </div>
          )}

          {/* Mensaje */}
          <div>
            <Label htmlFor="message">Mensaje (opcional)</Label>
            <Textarea
              id="message"
              placeholder="Escribe un mensaje para el propietario..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>

          {/* Acciones */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={selectedItems.length === 0 || isSubmitting} className="flex-1">
              {isSubmitting ? "Enviando..." : "Enviar propuesta"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
