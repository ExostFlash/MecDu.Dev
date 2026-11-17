"use client";

import { ArrowUpRight, RotateCw, Search, X } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  filterProjects,
  loadProjects,
  PAGE_SIZE,
  searchIndex,
  topTags,
  type Project,
} from "@/lib/projects";

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; projects: Project[] };

export default function ProjectGrid() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let cancelled = false;
    loadProjects()
      .then((projects) => !cancelled && setState({ status: "ready", projects }))
      .catch(() => !cancelled && setState({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const projects = useMemo(() => (state.status === "ready" ? state.projects : []), [state]);
  const index = useMemo(() => searchIndex(projects), [projects]);
  const tags = useMemo(() => topTags(projects), [projects]);
  const filtered = useMemo(
    () => filterProjects(projects, index, deferredQuery, tag),
    [projects, index, deferredQuery, tag],
  );
  const shown = filtered.slice(0, visible);

  if (state.status === "loading") return <Skeletons />;

  if (state.status === "error")
    return (
      <div className="rounded-2xl border border-dashed border-line p-10 text-center">
        <p className="text-muted">Impossible de charger les projets pour le moment.</p>
        <button
          type="button"
          onClick={() => {
            setState({ status: "loading" });
            setAttempt((a) => a + 1);
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 text-sm font-semibold text-text transition-colors hover:border-accent"
        >
          <RotateCw className="size-4" />
          Réessayer
        </button>
      </div>
    );

  if (projects.length === 0)
    return (
      <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
        De nouveaux projets arrivent bientôt.
      </p>
    );

  const total = projects.length;
  const tools = total > PAGE_SIZE;

  return (
    <div>
      {tools && (
        <div className="mb-8 space-y-4">
          <label className="relative block max-w-xl">
            <span className="sr-only">Rechercher un projet</span>
            <Search className="pointer-events-none absolute top-3.5 left-4 size-5 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder={`Rechercher parmi ${total.toLocaleString("fr-FR")} projets…`}
              className="w-full rounded-xl border border-line bg-surface py-3 pr-4 pl-12 text-text outline-none placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>

          {tags.length > 1 && (
            <ul className="flex flex-wrap gap-2" aria-label="Filtrer par tag">
              {tags.map((t) => {
                const on = tag === t;
                return (
                  <li key={t}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setTag(on ? null : t);
                        setVisible(PAGE_SIZE);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                        on
                          ? "border-accent bg-accent/15 text-accent-bright"
                          : "border-line text-muted hover:border-accent/60 hover:text-text"
                      }`}
                    >
                      {t}
                      {on && <X className="size-3" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="font-mono text-xs text-muted" aria-live="polite">
            {filtered.length.toLocaleString("fr-FR")} projet{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {shown.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          Aucun projet ne correspond à votre recherche.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold text-text transition-colors hover:border-accent"
          >
            Afficher plus de projets
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const [imgFailed, setImgFailed] = useState(false);
  const host = new URL(p.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_40px_-10px_rgba(195,3,0,0.45)] sm:p-8"
    >
      <div className="flex items-start gap-5">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-bg transition-colors group-hover:border-accent/60">
          {p.image && !imgFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.image}
              alt={`Logo ${p.name}`}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="font-stencil text-4xl text-accent-bright uppercase">
              {p.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {p.kicker && (
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">{p.kicker}</p>
          )}
          <h3 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-text">
            <span className="truncate">{p.name}</span>
            <ArrowUpRight className="size-5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-bright" />
          </h3>
          <p className="mt-1 truncate font-mono text-xs text-accent-bright/80">{host}</p>
        </div>
      </div>

      {p.description ? (
        <p className="mt-6 line-clamp-5 flex-1 leading-relaxed text-muted">{p.description}</p>
      ) : (
        <div className="flex-1" />
      )}

      {p.tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
    </a>
  );
}

function Skeletons() {
  return (
    <ul className="grid gap-6 md:grid-cols-2" aria-busy="true" aria-label="Chargement des projets">
      {[0, 1].map((i) => (
        <li key={i} className="animate-pulse rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex items-start gap-5">
            <div className="size-20 rounded-2xl bg-surface-2" />
            <div className="flex-1 space-y-3 pt-1">
              <div className="h-3 w-1/3 rounded bg-surface-2" />
              <div className="h-6 w-1/2 rounded bg-surface-2" />
              <div className="h-3 w-1/4 rounded bg-surface-2" />
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            <div className="h-6 w-16 rounded-md bg-surface-2" />
            <div className="h-6 w-20 rounded-md bg-surface-2" />
          </div>
        </li>
      ))}
    </ul>
  );
}
