import { Card, CardContent } from "@/components/ui/card"
import { mockCategories } from "@/lib/data"

export function Categories() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explora por Categorías</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas navegando por nuestras categorías organizadas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
