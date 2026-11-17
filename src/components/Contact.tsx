"use client";

import { Mail, MessageSquare, Send, User } from "lucide-react";
import { useState, type FormEvent } from "react";

import { site } from "@/lib/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { externalProps, socialLinks } from "./SocialLinks";

const field =
  "w-full rounded-xl border border-line bg-bg py-3 pr-4 pl-11 text-text placeholder:text-muted/70 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const valid = name.trim() && /\S+@\S+\.\S+/.test(email) && msg.trim();

  // Site statique (GitHub Pages) : le formulaire prépare un email dans le client de messagerie.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const subject = encodeURIComponent(`Contact depuis mecdu.dev — ${name}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-surface py-28">
      <div className="pointer-events-none absolute -top-40 right-0 size-[30rem] rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 lg:grid-cols-2">
        <Reveal>
          <SectionHeading index="04" kicker="Parlons de votre projet" title="Contactez-nous">
            Nous sommes impatients de collaborer avec vous et de transformer vos idées en succès
            numériques.
          </SectionHeading>

          <ul className="grid gap-3 sm:grid-cols-2">
            {socialLinks.map((l) => (
              <li key={l.label} className="sm:last:col-span-2">
                <a
                  href={l.href}
                  {...externalProps(l.href)}
                  className="flex items-center gap-4 rounded-xl border border-line bg-bg p-4 transition-colors hover:border-accent/60"
                >
                  <l.icon className="size-5 shrink-0 text-accent-bright" />
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{l.label}</span>
                    <span className="block truncate font-medium text-text">{l.detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
              <span className="size-3 rounded-full bg-accent" />
              <span className="size-3 rounded-full bg-muted/40" />
              <span className="size-3 rounded-full bg-muted/40" />
              <span className="ml-3 font-mono text-xs text-muted">contact@mecdu.dev ~ nouveau-message</span>
            </div>

            <div className="space-y-4 p-6 sm:p-8">
              <label className="relative block">
                <span className="sr-only">Nom et prénom</span>
                <User className="pointer-events-none absolute top-3.5 left-4 size-5 text-muted" />
                <input
                  className={field}
                  placeholder="Nom et prénom"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="relative block">
                <span className="sr-only">Email</span>
                <Mail className="pointer-events-none absolute top-3.5 left-4 size-5 text-muted" />
                <input
                  type="email"
                  className={field}
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="relative block">
                <span className="sr-only">Message</span>
                <MessageSquare className="pointer-events-none absolute top-3.5 left-4 size-5 text-muted" />
                <textarea
                  rows={6}
                  className={`${field} resize-y`}
                  placeholder="Message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  required
                />
              </label>
              <button
                type="submit"
                disabled={!valid}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-40"
              >
                Envoyer
                <Send className="size-4 transition-transform group-enabled:group-hover:translate-x-1" />
              </button>
              <p className="text-center font-mono text-xs text-muted">
                Ouvre votre messagerie avec le message pré-rempli.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
