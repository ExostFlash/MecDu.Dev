import ProjectGrid from "./ProjectGrid";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projets" className="py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeading index="03" kicker="Ce que nous construisons" title="Nos Projets">
            Nos projets sont le reflet de notre vision et de notre engagement à apporter des
            solutions innovantes sur le marché.
          </SectionHeading>
        </Reveal>

        {/* Les projets sont chargés côté client depuis l'API lehub.tf */}
        <ProjectGrid />
      </div>
    </section>
  );
}
