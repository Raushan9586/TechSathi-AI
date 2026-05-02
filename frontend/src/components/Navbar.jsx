import React, { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import { Button } from "./ui/button";
import { Menu, X, Sparkles } from "lucide-react";

export const Navbar = () => {
  const { lang, toggle, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#tools", label: t("nav_tools") },
    { href: "#playground", label: t("nav_playground") },
    { href: "#pricing", label: t("nav_pricing") },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-white/80 border-b border-[var(--ts-border)] shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" data-testid="logo-link">
          <div className="w-9 h-9 rounded-xl bg-[var(--ts-brand)] flex items-center justify-center text-white">
            <Sparkles size={18} strokeWidth={2} />
          </div>
          <span className="font-display font-semibold text-xl tracking-tight text-[var(--ts-text)]">
            TechSathi<span className="text-[var(--ts-brand)]">.</span>AI
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.href.slice(1)}`}
              className="text-sm text-[var(--ts-text-secondary)] hover:text-[var(--ts-text)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            data-testid="language-toggle"
            className="hidden sm:flex items-center bg-[var(--ts-bg-alt)] border border-[var(--ts-border)] rounded-full p-1 text-xs font-medium"
            aria-label="Switch language"
          >
            <span
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "en" ? "bg-[var(--ts-brand)] text-white shadow-sm" : "text-[var(--ts-text-secondary)]"
              }`}
            >EN</span>
            <span
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "hinglish" ? "bg-[var(--ts-brand)] text-white shadow-sm" : "text-[var(--ts-text-secondary)]"
              }`}
            >हि</span>
          </button>

          <Button
            asChild
            data-testid="nav-cta-button"
            className="hidden md:inline-flex bg-[var(--ts-secondary)] hover:bg-[var(--ts-secondary-hover)] text-white rounded-full px-5"
          >
            <a href="#cta">{t("nav_cta")}</a>
          </Button>

          <button
            className="md:hidden p-2 text-[var(--ts-text)]"
            onClick={() => setOpen(o => !o)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[var(--ts-border)] px-5 py-4 flex flex-col gap-3">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--ts-text-secondary)] py-2"
            >{l.label}</a>
          ))}
          <button
            onClick={toggle}
            className="self-start px-3 py-1 rounded-full bg-[var(--ts-brand)] text-white text-xs"
            data-testid="language-toggle-mobile"
          >{lang === "en" ? "Switch to हिं" : "Switch to EN"}</button>
        </div>
      )}
    </nav>
  );
};
