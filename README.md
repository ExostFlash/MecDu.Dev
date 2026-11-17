# MecDu.Dev

Site vitrine de **MecDu.Dev** — *L'expertise backend, l'élégance frontend.*

Next.js (App Router) + Tailwind CSS, exporté en site statique pour GitHub Pages.

## Développement

```bash
npm install
npm run dev
```

## Build statique

```bash
npm run build   # génère ./out
```

## Déploiement GitHub Pages

1. Pousser le dépôt sur GitHub (branche `main`).
2. Dans **Settings → Pages**, choisir **Source : GitHub Actions**.
3. Chaque push sur `main` lance `.github/workflows/deploy.yml`.

Le workflow détecte automatiquement le chemin de base :
- dépôt `ExostFlash.github.io` ou domaine personnalisé → site servi à la racine ;
- autre dépôt → site servi sous `/<nom-du-repo>`.

**Domaine personnalisé (mecdu.dev)** : ajouter le domaine dans *Settings → Pages → Custom domain*
et faire pointer le DNS vers GitHub Pages.

## Structure

- `src/lib/site.ts` — textes et liens
- `src/lib/projects.ts` — chargement des projets depuis https://lehub.tf/api/links (côté navigateur)
- `src/components/` — Header, Hero (matrix), À propos, Services, Projets, Contact, Footer
- `public/images/` — logo et illustrations
