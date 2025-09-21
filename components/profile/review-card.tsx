import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import type { Review } from "@/lib/types"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.fromUser.avatar || "/placeholder.svg"} alt={review.fromUser.name} />
            <AvatarFallback>{review.fromUser.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{review.fromUser.name}</h4>
              <span className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-1 mb-2">{renderStars(review.rating)}</div>

            {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
