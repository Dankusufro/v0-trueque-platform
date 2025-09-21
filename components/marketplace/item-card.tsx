"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock } from "lucide-react"
import type { Item } from "@/lib/types"

interface ItemCardProps {
  item: Item
  onClick: () => void
}

export function ItemCard({ item, onClick }: ItemCardProps) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group" onClick={onClick}>
      <div className="aspect-square relative overflow-hidden">
        <img
          src={item.images[0] || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-2 right-2 ${getConditionColor(item.condition)}`} variant="secondary">
          {item.condition}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <span className="text-sm font-medium text-primary whitespace-nowrap ml-2">
            {formatValue(item.estimatedValue)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
            <AvatarFallback className="text-xs">{item.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate">{item.user.name}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">{item.user.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
