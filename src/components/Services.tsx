import { Globe, Server, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Server,
    title: "Développement backend",
    cmd: "api --robuste",
    text: "Notre cœur de métier. Des API et des architectures solides, sécurisées et évolutives, pensées pour tenir la charge et durer.",
  },
  {
    icon: Sparkles,
    title: "Création front-end",
    cmd: "ui --élégante",
    text: "Des interfaces modernes, rapides et accessibles, qui mettent en valeur votre produit sur tous les écrans.",
  },
  {
    icon: Globe,
    title: "Hébergement & emails",
    cmd: "deploy --domaine",
    text: "Stockage de vos sites, gestion des liens et des adresses email : on s'occupe de la mise en ligne, vous vous occupez de vos clients.",
  },
  {
    icon: ShieldCheck,
    title: "Sur mesure",
    cmd: "idée --> succès",
    text: "Chaque besoin est unique. Nous concevons avec vous une solution taillée pour vos objectifs, aujourd'hui comme demain.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-y border-line bg-surface py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeading index="02" kicker="Ce que nous faisons" title="Nos services">
            Des solutions robustes, sécurisées et évolutives qui aident nos clients à réussir dans
            un monde numérique en constante évolution.
          </SectionHeading>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_40px_-10px_rgba(195,3,0,0.45)]">
                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent-bright">
                  <s.icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold text-text">{s.title}</h3>
                <p className="mt-1 font-mono text-xs text-accent-bright">$ {s.cmd}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
