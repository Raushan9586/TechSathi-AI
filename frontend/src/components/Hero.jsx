import React from "react";
import { useLang } from "../context/LanguageContext";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const MASCOT = "https://static.prod-images.emergentagent.com/jobs/cf3fc19d-778f-44d8-9d69-ccaea22a7f93/images/1b9f6b0fb73c7193bb65d354346db84c03ffa8119139ef15bafe7fb30e968799.png";
const BG = "https://static.prod-images.emergentagent.com/jobs/cf3fc19d-778f-44d8-9d69-ccaea22a7f93/images/d9ba2870a688d39c03fb20e49bd8f55df185ac6359613af8ce824bf7c8ab6555.png";

export const Hero = () => {
  const { t } = useLang();
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden" data-testid="hero-section">
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 ts-dot-bg opacity-60 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] ts-glow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 ts-fade-up">
          <div className="inline-flex items-center gap-2 bg-[var(--ts-saffron-light)] border border-[var(--ts-brand)]/20 rounded-full px-4 py-1.5 text-xs font-medium text-[var(--ts-brand-hover)] mb-6" data-testid="hero-badge">
            <Sparkles size={14} strokeWidth={2} />
            <span>{t("hero_badge")}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[68px] leading-[1.02] tracking-tighter font-medium text-[var(--ts-text)]">
            {t("hero_title_a")}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--ts-brand)]">{t("hero_title_b")}</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[var(--ts-saffron-light)] -z-0" />
            </span>
          </h1>
          <p className="mt-6 text-lg text-[var(--ts-text-secondary)] max-w-xl leading-relaxed" data-testid="hero-subtitle">
            {t("hero_sub")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              data-testid="hero-primary-cta"
              className="bg-[var(--ts-brand)] hover:bg-[var(--ts-brand-hover)] text-white rounded-full px-7 h-12 font-medium shadow-lg shadow-[var(--ts-brand)]/20"
            >
              <a href="#playground" className="inline-flex items-center gap-2">
                {t("hero_cta_primary")}
                <ArrowRight size={18} strokeWidth={2} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              data-testid="hero-secondary-cta"
              className="border-2 border-[var(--ts-border)] hover:border-[var(--ts-secondary)] rounded-full px-7 h-12 bg-transparent"
            >
              <a href="#tools">{t("hero_cta_secondary")}</a>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 text-xs text-[var(--ts-text-secondary)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--ts-sage-dark)]" />
              <span>9 AI tools, 1 subscription</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--ts-brand)]" />
              <span>English + Hinglish</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--ts-secondary)]" />
              <span>Starts at ₹199/mo</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 relative ts-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 ts-glow" />
            <img
              src={MASCOT}
              alt="TechSathi AI companion"
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              data-testid="hero-mascot"
            />
            <div className="absolute top-8 -left-2 z-20 bg-white border border-[var(--ts-border)] rounded-2xl px-4 py-3 shadow-lg ts-hover-lift">
              <div className="text-[10px] text-[var(--ts-text-secondary)] uppercase tracking-wider font-semibold">Resume</div>
              <div className="text-sm font-medium text-[var(--ts-text)]">Ready in 30s ⚡</div>
            </div>
            <div className="absolute bottom-12 -right-4 z-20 bg-[var(--ts-secondary)] text-white rounded-2xl px-4 py-3 shadow-xl ts-hover-lift">
              <div className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Chatbot</div>
              <div className="text-sm font-medium">Deployed · 24/7</div>
            </div>
            <div className="absolute -bottom-2 left-10 z-20 bg-[var(--ts-saffron-light)] border border-[var(--ts-brand)]/30 rounded-2xl px-4 py-3 shadow-lg ts-hover-lift">
              <div className="text-[10px] text-[var(--ts-brand-hover)] uppercase tracking-wider font-semibold">Content</div>
              <div className="text-sm font-medium text-[var(--ts-text)]">7-day plan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
