/** Source des projets, appelée depuis le navigateur (CORS ouvert). */
export const PROJECTS_API = "https://lehub.tf/api/links";

/** Nombre de projets affichés au départ et ajoutés à chaque « Afficher plus ». */
export const PAGE_SIZE = 6;

export type Project = {
  name: string;
  slug: string;
  url: string;
  image: string | null;
  kicker: string;
  description: string;
  tags: string[];
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** N'accepte que des liens http(s) : une URL "javascript:" venue de l'API ne doit jamais finir dans un href. */
function safeUrl(v: unknown, base?: string): string | null {
  const s = str(v);
  if (!s) return null;
  try {
    const u = new URL(s, base);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}

/** Valide et nettoie la réponse de l'API (champs manquants, image null, description vide…). */
export function parseProjects(raw: unknown): Project[] {
  if (!Array.isArray(raw)) throw new Error("Réponse inattendue de l'API");
  const seen = new Set<string>();
  const out: Project[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const r = item as Record<string, unknown>;
    const name = str(r.name);
    const url = safeUrl(r.url);
    if (!name || !url) continue;
    let slug = str(r.slug) || name.toLowerCase().replace(/\s+/g, "-");
    while (seen.has(slug)) slug += "-";
    seen.add(slug);
    out.push({
      name,
      slug,
      url,
      // Image relative → résolue par rapport au domaine de l'API
      image: safeUrl(r.image, PROJECTS_API),
      kicker: str(r.kicker),
      description: str(r.description),
      tags: Array.isArray(r.tags) ? r.tags.map(str).filter(Boolean) : [],
    });
  }
  return out;
}

let cache: Promise<Project[]> | null = null;

/** Un seul appel réseau partagé par tous les composants de la page. */
export function loadProjects(): Promise<Project[]> {
  cache ??= fetch(PROJECTS_API, { headers: { Accept: "application/json" } })
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(parseProjects)
    .catch((e) => {
      cache = null; // permet de réessayer
      throw e;
    });
  return cache;
}

/** Tags les plus fréquents, pour les filtres. */
export function topTags(projects: Project[], limit = 12): string[] {
  const counts = new Map<string, number>();
  for (const p of projects) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"))
    .slice(0, limit)
    .map(([t]) => t);
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Pré-calcule le texte de recherche une fois par projet (utile avec des dizaines de milliers). */
export const searchIndex = (projects: Project[]) =>
  projects.map((p) => normalize(`${p.name} ${p.kicker} ${p.description} ${p.tags.join(" ")}`));

export function filterProjects(
  projects: Project[],
  index: string[],
  query: string,
  tag: string | null,
) {
  const q = normalize(query.trim());
  if (!q && !tag) return projects;
  return projects.filter((p, i) => (!tag || p.tags.includes(tag)) && (!q || index[i].includes(q)));
}
