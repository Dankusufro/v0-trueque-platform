"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, MessageCircle, Shield, TrendingUp } from "lucide-react"
import { ItemCard } from "@/components/marketplace/item-card"
import { ReviewCard } from "./review-card"
import { useAuth } from "@/contexts/auth-context"
import { storage } from "@/lib/storage"
import type { User, Item, Review, UserStats } from "@/lib/types"

interface ProfileContentProps {
  userId: string
}

export function ProfileContent({ userId }: ProfileContentProps) {
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [userItems, setUserItems] = useState<Item[]>([])
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const { user: currentUser } = useAuth()

  useEffect(() => {
    // Cargar datos del usuario
    const users = storage.getUsers()
    const foundUser = users.find((u) => u.id === userId)
    setProfileUser(foundUser || null)

    if (foundUser) {
      // Cargar items del usuario
      const allItems = storage.getItems()
      const items = allItems.filter((item) => item.userId === userId && item.isAvailable)
      setUserItems(items)

      // Cargar reviews del usuario
      const allReviews = storage.getTradeOffers() // En una app real, tendríamos reviews separadas
      // Simular reviews basadas en intercambios completados
      const mockReviews: Review[] = [
        {
          id: "1",
          fromUserId: "2",
          toUserId: userId,
          fromUser: users.find((u) => u.id === "2") || users[0],
          toUser: foundUser,
          tradeOfferId: "1",
          rating: 5,
          comment: "Excelente intercambio, muy confiable y puntual.",
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          fromUserId: "1",
          toUserId: userId,
          fromUser: users.find((u) => u.id === "1") || users[0],
          toUser: foundUser,
          tradeOfferId: "2",
          rating: 4,
          comment: "Buen intercambio, artículo como se describía.",
          createdAt: new Date("2024-01-10"),
        },
      ]
      setUserReviews(mockReviews.filter((r) => r.toUserId === userId))

      // Calcular estadísticas
      const stats: UserStats = {
        totalTrades: foundUser.totalTrades,
        successfulTrades: foundUser.totalTrades,
        averageRating: foundUser.rating,
        totalReviews: mockReviews.filter((r) => r.toUserId === userId).length,
        responseTime: "< 2 horas",
        joinedAt: foundUser.joinedAt,
      }
      setUserStats(stats)
    }
  }, [userId])

  if (!profileUser) {
    return (
      <div className="container">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Usuario no encontrado</h1>
          <p className="text-muted-foreground">El perfil que buscas no existe</p>
        </div>
      </div>
    )
  }

  const isOwnProfile = currentUser?.id === userId

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información del perfil */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={profileUser.avatar || "/placeholder.svg"} alt={profileUser.name} />
                  <AvatarFallback className="text-2xl">{profileUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mb-2">{profileUser.name}</h1>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{profileUser.rating}</span>
                  <span className="text-sm text-muted-foreground">({userStats?.totalReviews || 0} reseñas)</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  {profileUser.location}
                </div>
                {profileUser.bio && <p className="text-sm text-muted-foreground mb-4">{profileUser.bio}</p>}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Intercambios exitosos</span>
                  <span className="font-medium">{userStats?.successfulTrades || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tiempo de respuesta</span>
                  <span className="font-medium">{userStats?.responseTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Miembro desde</span>
                  <span className="font-medium">
                    {new Date(profileUser.joinedAt).toLocaleDateString("es-ES", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Identidad verificada</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span>Usuario activo</span>
                </div>
              </div>

              {!isOwnProfile && (
                <div className="mt-6 space-y-2">
                  <Button className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Enviar mensaje
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Reportar usuario
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="items" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="items">Artículos ({userItems.length})</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas ({userReviews.length})</TabsTrigger>
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="space-y-4">
              {userItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isOwnProfile ? "No tienes artículos publicados" : "No tiene artículos disponibles"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isOwnProfile
                      ? "Publica tu primer artículo para comenzar a intercambiar"
                      : "Este usuario no tiene artículos disponibles en este momento"}
                  </p>
                  {isOwnProfile && (
                    <Button className="mt-4 bg-transparent" variant="outline">
                      Publicar artículo
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userItems.map((item) => (
                    <ItemCard key={item.id} item={item} onClick={() => {}} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {userReviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold mb-2">Sin reseñas aún</h3>
                  <p className="text-muted-foreground">
                    Las reseñas de otros usuarios aparecerán aquí después de completar intercambios
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actividad de Intercambios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total de intercambios</span>
                        <span className="font-medium">{userStats?.totalTrades || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Intercambios exitosos</span>
                        <span className="font-medium">{userStats?.successfulTrades || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tasa de éxito</span>
                        <span className="font-medium">
                          {userStats?.totalTrades
                            ? Math.round(((userStats.successfulTrades || 0) / userStats.totalTrades) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reputación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Calificación promedio</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{profileUser.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total de reseñas</span>
                        <span className="font-medium">{userStats?.totalReviews || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tiempo de respuesta</span>
                        <span className="font-medium">{userStats?.responseTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Distribución de Calificaciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = userReviews.filter((r) => r.rating === rating).length
                        const percentage = userReviews.length > 0 ? (count / userReviews.length) * 100 : 0
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-12">
                              <span className="text-sm">{rating}</span>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
