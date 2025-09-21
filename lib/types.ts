export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  location: string
  rating: number
  totalTrades: number
  joinedAt: Date
  bio?: string
}

export interface Item {
  id: string
  title: string
  description: string
  category: string
  condition: "nuevo" | "como-nuevo" | "bueno" | "regular"
  images: string[]
  estimatedValue: number
  userId: string
  user: User
  location: string
  isAvailable: boolean
  createdAt: Date
  tags: string[]
}

export interface TradeOffer {
  id: string
  fromUserId: string
  toUserId: string
  fromUser: User
  toUser: User
  offeredItems: Item[]
  requestedItems: Item[]
  status: "pending" | "accepted" | "rejected" | "completed" | "cancelled"
  message?: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
}

export interface Review {
  id: string
  fromUserId: string
  toUserId: string
  fromUser: User
  toUser: User
  tradeOfferId: string
  rating: number
  comment?: string
  createdAt: Date
}

export interface UserStats {
  totalTrades: number
  successfulTrades: number
  averageRating: number
  totalReviews: number
  responseTime: string
  joinedAt: Date
}
