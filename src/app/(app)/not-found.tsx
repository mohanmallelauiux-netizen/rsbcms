import Link from 'next/link'
import { ArrowRight, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <span className="text-xxs font-semibold uppercase tracking-widest text-primary animate-pulse">
          Error 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Page Not Found
        </h1>
        <p className="text-xs text-muted leading-relaxed font-light">
          The property, publication, or page you are trying to access has been relocated or is private.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/"
            className="rounded-full bg-primary hover:bg-primary/95 text-background px-6 py-3 text-xs font-semibold tracking-wide flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Go to Homepage</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border bg-secondary/35 px-6 py-3 text-xs font-semibold tracking-wide text-foreground hover:bg-secondary transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
