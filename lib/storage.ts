import type { User, Item, TradeOffer, Review } from "./types"

// Simulación de almacenamiento local para la demo
class LocalStorage {
  private getStorageKey(key: string): string {
    return `trueque_${key}`
  }

  // Usuarios
  getUsers(): User[] {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem(this.getStorageKey("users"))
    return users ? JSON.parse(users) : []
  }

  saveUsers(users: User[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.getStorageKey("users"), JSON.stringify(users))
  }

  // Items
  getItems(): Item[] {
    if (typeof window === "undefined") return []
    const items = localStorage.getItem(this.getStorageKey("items"))
    return items ? JSON.parse(items) : []
  }

  saveItems(items: Item[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.getStorageKey("items"), JSON.stringify(items))
  }

  // Ofertas de intercambio
  getTradeOffers(): TradeOffer[] {
    if (typeof window === "undefined") return []
    const offers = localStorage.getItem(this.getStorageKey("trade_offers"))
    return offers ? JSON.parse(offers) : []
  }

  saveTradeOffers(offers: TradeOffer[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.getStorageKey("trade_offers"), JSON.stringify(offers))
  }

  // Reviews
  getReviews(): Review[] {
    if (typeof window === "undefined") return []
    const reviews = localStorage.getItem(this.getStorageKey("reviews"))
    return reviews ? JSON.parse(reviews) : []
  }

  saveReviews(reviews: Review[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.getStorageKey("reviews"), JSON.stringify(reviews))
  }

  // Usuario actual
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(this.getStorageKey("current_user"))
    return user ? JSON.parse(user) : null
  }

  setCurrentUser(user: User | null): void {
    if (typeof window === "undefined") return
    if (user) {
      localStorage.setItem(this.getStorageKey("current_user"), JSON.stringify(user))
    } else {
      localStorage.removeItem(this.getStorageKey("current_user"))
    }
  }
}

export const storage = new LocalStorage()
