export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Préfixe un chemin de /public avec le basePath (GitHub Pages sous /<repo>). */
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: "MecDu.Dev",
  tagline: "L'expertise backend, l'élégance frontend.",
  url: "https://mecdu.dev",
  email: "contact@mecdu.dev",
  founder: "Amaury MAIZY",
  alias: "ExostFlash",
  founded: 2023,
};

export const nav = [
  { id: "accueil", label: "Accueil" },
  { id: "abouts", label: "À propos" },
  { id: "services", label: "Services" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
] as const;

export const socials = {
  github: "https://github.com/ExostFlash",
  linkedinCompany: "https://www.linkedin.com/company/mecdudev/",
  linkedinFounder: "https://www.linkedin.com/in/amaury-maizy/",
  instagram: "https://www.instagram.com/mecdu.dev/",
  discord: "https://discord.com/invite/dRjUH5qKZQ",
};
