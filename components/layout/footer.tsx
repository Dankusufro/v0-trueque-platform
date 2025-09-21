import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl">TruequePlus</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              La plataforma líder para intercambios seguros y confiables en América Latina.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/marketplace" className="hover:text-primary">
                  Explorar
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/publish" className="hover:text-primary">
                  Publicar artículo
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-primary">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-primary">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-primary">
                  Seguridad
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-primary">
                  Normas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TruequePlus. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
