import React from "react";
import { Sparkles, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLang } from "../context/LanguageContext";

export const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="border-t border-[var(--ts-border)] bg-[var(--ts-bg-alt)]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[var(--ts-brand)] flex items-center justify-center text-white">
                <Sparkles size={18} strokeWidth={2} />
              </div>
              <span className="font-display font-semibold text-xl tracking-tight">
                TechSathi<span className="text-[var(--ts-brand)]">.</span>AI
              </span>
            </div>
            <p className="text-[var(--ts-text-secondary)] max-w-sm mb-6">{t("footer_tag")}</p>
            <div className="flex gap-3">
              {[{ Icon: Twitter, name: "twitter" }, { Icon: Linkedin, name: "linkedin" }, { Icon: Instagram, name: "instagram" }].map(({ Icon, name }, i) => (
                <a
                  key={name}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-[var(--ts-border)] flex items-center justify-center text-[var(--ts-text-secondary)] hover:border-[var(--ts-brand)] hover:text-[var(--ts-brand)] transition-colors"
                  data-testid={`social-link-${i}`}
                  aria-label="social"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-bold text-[var(--ts-text-secondary)] mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[var(--ts-text)]">
              <li><a href="#tools" className="hover:text-[var(--ts-brand)] transition-colors">Tools</a></li>
              <li><a href="#playground" className="hover:text-[var(--ts-brand)] transition-colors">Playground</a></li>
              <li><a href="#pricing" className="hover:text-[var(--ts-brand)] transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-[var(--ts-brand)] transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-bold text-[var(--ts-text-secondary)] mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--ts-text)]">
              <li><a href="#" className="hover:text-[var(--ts-brand)] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[var(--ts-brand)] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[var(--ts-brand)] transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-[var(--ts-brand)] transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--ts-border)] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--ts-text-secondary)]">
          <span>© 2026 TechSathi AI · Made in Bharat</span>
          <span>Powered by Claude Sonnet 4.5</span>
        </div>
      </div>
    </footer>
  );
};
