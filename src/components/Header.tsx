"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const [active, setActive] = useState<string>("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#accueil" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span className="font-stencil text-xl text-text">
            MecDu<span className="text-accent-bright">.Dev</span>
          </span>
        </a>

        <nav className="hidden md:block" aria-label="Navigation principale">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active === n.id ? "text-text" : "text-muted hover:text-text"
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300 ${
                      active === n.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
            <li className="ml-3">
              <a
                href="#contact"
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
              >
                Démarrer un projet
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-text md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line md:hidden" aria-label="Navigation mobile">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 font-medium ${
                    active === n.id ? "bg-accent/15 text-accent-bright" : "text-muted"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
