import { asset, site, socials } from "@/lib/site";
import ProjectCount from "./ProjectCount";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const stats = [
  { value: String(site.founded), label: "Année de création" },
  { value: "Backend", label: "Cœur d'expertise" },
  { value: <ProjectCount />, label: "Projets en ligne" },
];

const values = ["Robustes", "Sécurisées", "Évolutives"];

export default function About() {
  return (
    <section id="abouts" className="relative overflow-x-clip py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <SectionHeading index="01" kicker="Qui sommes-nous" title="À propos de nous" />
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Fondée en {site.founded} par{" "}
              <a
                href={socials.linkedinFounder}
                target="_blank"
                rel="noopener"
                className="font-semibold text-text underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-bright"
              >
                {site.founder}
              </a>
              , alias <span className="font-mono text-accent-bright">{site.alias}</span>,{" "}
              <strong className="text-text">MecDu.Dev</strong> se consacre principalement au
              développement backend, tout en offrant également des services de création front-end
              et de stockage de sites avec liens et adresses email. Notre expertise technique et
              notre passion pour l&apos;innovation nous permettent de créer des solutions numériques
              sur mesure qui répondent aux besoins variés de nos clients.
            </p>
            <p>
              Chez MecDu.Dev, nous croyons en la puissance de la technologie pour transformer les
              idées en réalités tangibles. Nos projets en cours sont le reflet de notre vision et de
              notre engagement à apporter des solutions innovantes sur le marché.
            </p>
            <p>
              Notre mission est de repousser les limites de ce qui est possible avec la technologie,
              en créant des produits qui non seulement répondent aux besoins actuels, mais qui
              anticipent également les tendances futures.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {values.map((v) => (
              <li
                key={v}
                className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-sm text-accent-bright"
              >
                {v}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-accent/20 blur-3xl" />
          <div className="relative rounded-3xl border border-line bg-surface/80 p-8 backdrop-blur">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/aboutUs.png")}
              alt="Illustration d'une équipe menée par MecDu.Dev"
              className="mx-auto h-72 w-auto object-contain"
              loading="lazy"
            />
            <dl className="mt-8 grid grid-cols-3 divide-x divide-line border-t border-line pt-6 text-center">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse px-2">
                  <dt className="mt-1 text-xs text-muted">{s.label}</dt>
                  <dd className="font-stencil text-2xl text-text">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <Reveal className="relative mx-auto mt-20 max-w-4xl px-4">
        <blockquote className="border-l-4 border-accent pl-6 text-xl leading-relaxed text-text sm:text-2xl">
          « Chez MecDu.Dev, chaque projet est une opportunité de faire preuve d&apos;innovation et
          de créativité, tout en maintenant des standards élevés de qualité et de performance. »
        </blockquote>
      </Reveal>
    </section>
  );
}
