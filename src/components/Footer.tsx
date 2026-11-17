import { nav, site, socials } from "@/lib/site";
import Logo from "./Logo";
import { externalProps, socialLinks } from "./SocialLinks";

const columns = [
  {
    title: "Explorer",
    links: nav.map((n) => ({ label: n.label, href: `#${n.id}` })),
  },
  {
    title: "Services",
    links: [
      { label: "Développement backend", href: "#services" },
      { label: "Création front-end", href: "#services" },
      { label: "Hébergement & emails", href: "#services" },
      { label: "Solutions sur mesure", href: "#services" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-4 sm:col-span-2 md:col-span-1">
          <a href="#accueil" className="group inline-flex items-center gap-4">
            <Logo size="lg" />
            <span className="flex flex-col leading-none">
              <span className="font-stencil text-2xl text-text">
                MecDu<span className="text-accent-bright">.Dev</span>
              </span>
              <span className="mt-2 font-mono text-[10px] tracking-[0.3em] text-muted">
                STUDIO DE DÉVELOPPEMENT
              </span>
            </span>
          </a>
          <p className="font-mono text-xs text-accent-bright uppercase">{site.tagline}</p>
          <p className="max-w-sm text-sm text-muted">
            Fondée en {site.founded} par{" "}
            <a
              href={socials.linkedinFounder}
              target="_blank"
              rel="noopener"
              className="text-accent-bright underline-offset-2 hover:underline"
            >
              {site.founder}
            </a>
            , MecDu.Dev conçoit des solutions robustes, sécurisées et évolutives.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="mb-3 font-mono text-xs font-semibold tracking-[0.2em] text-text uppercase">
              {col.title}
            </h2>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-muted transition-colors hover:text-accent-bright">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 text-center">
          <h2 className="mb-4 font-mono text-xs font-semibold tracking-[0.2em] text-text uppercase">
            Suivre et contacter
          </h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {socialLinks.map((f) => (
              <li key={f.label}>
                <a
                  href={f.href}
                  {...externalProps(f.href)}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-text"
                >
                  <f.icon className="size-4" />
                  {f.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MecDu.Dev. Tous droits réservés.</p>
          <p>
            Créé et maintenu par{" "}
            <a
              href={socials.github}
              target="_blank"
              rel="noopener"
              className="text-accent-bright hover:underline"
            >
              {site.alias}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
