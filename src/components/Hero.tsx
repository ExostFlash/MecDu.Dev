import { ArrowDown, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import Matrix from "./Matrix";

export default function Hero() {
  return (
    <section id="accueil" className="relative flex min-h-svh items-center overflow-hidden">
      <div className="absolute inset-0">
        <Matrix className="opacity-60" />
      </div>
      {/* Vignette pour garder le texte lisible au-dessus de la matrix */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.85)_0%,rgba(5,5,5,0.55)_45%,rgba(5,5,5,0.2)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-32 text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/60 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur">
          <span className="size-2 animate-pulse rounded-full bg-accent-bright" />
          Studio de développement — depuis {site.founded}
        </p>

        <h1 className="font-stencil text-6xl text-accent-bright drop-shadow-[0_0_30px_rgba(195,3,0,0.55)] sm:text-8xl md:text-9xl">
          {site.name}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-2xl font-medium text-text sm:text-4xl">
          {site.tagline}
        </p>

        <p className="caret mx-auto mt-6 font-mono text-sm text-muted sm:text-base">
          <span className="text-accent-bright">$</span> build --backend robuste --frontend élégant
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#projets"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(195,3,0,0.35)] transition-colors hover:bg-accent-bright"
          >
            Découvrir nos projets
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-black/50 px-6 py-3 font-semibold text-text backdrop-blur transition-colors hover:border-accent"
          >
            Contactez-nous
          </a>
        </div>
      </div>

      <a
        href="#abouts"
        aria-label="Défiler vers À propos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted hover:text-accent-bright"
      >
        <ArrowDown className="size-6" />
      </a>
    </section>
  );
}
