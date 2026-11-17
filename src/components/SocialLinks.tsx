import { Mail } from "lucide-react";
import type { ComponentType } from "react";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { site, socials } from "@/lib/site";

export type SocialLink = {
  label: string;
  detail: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

/** Source unique pour « Suivre et contacter » (footer) et la section Contact. */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", detail: "ExostFlash", href: socials.github, icon: FaGithub },
  { label: "LinkedIn", detail: "MecDu.Dev", href: socials.linkedinCompany, icon: FaLinkedin },
  { label: "Instagram", detail: "@mecdu.dev", href: socials.instagram, icon: FaInstagram },
  { label: "Discord", detail: "Rejoindre le serveur", href: socials.discord, icon: FaDiscord },
  { label: "Email", detail: site.email, href: `mailto:${site.email}`, icon: Mail },
];

export const externalProps = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {};
