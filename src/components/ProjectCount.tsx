"use client";

import { useEffect, useState } from "react";
import { loadProjects } from "@/lib/projects";

/** Nombre de projets, partagé avec la grille (un seul appel à l'API). */
export default function ProjectCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadProjects()
      .then((p) => !cancelled && setCount(p.length))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <>{count === null ? "—" : count.toLocaleString("fr-FR")}</>;
}
