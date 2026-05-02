import React from "react";
import { useLang } from "../context/LanguageContext";
import { MousePointerClick, Sparkles, Rocket } from "lucide-react";

const BENTO = "https://static.prod-images.emergentagent.com/jobs/cf3fc19d-778f-44d8-9d69-ccaea22a7f93/images/ff5ceb80591e90573ad64949706ec5130868509f08ad56615221ea91ccb6bc0c.png";

const steps = [
  { num: "01", icon: MousePointerClick, en_title: "Pick a tool", hi_title: "Tool chuno", en_desc: "Choose from 9 AI tools — resume, website, content, chatbot and more.", hi_desc: "9 AI tools me se ek chuno — resume, website, content, chatbot ya aur bhi." },
  { num: "02", icon: Sparkles, en_title: "Describe your need", hi_title: "Apna need batao", en_desc: "Write a prompt in English or Hinglish. One line is enough.", hi_desc: "English ya Hinglish me ek line likho — bas itna kaafi hai." },
  { num: "03", icon: Rocket, en_title: "Ship instantly", hi_title: "Turant deploy", en_desc: "Copy, share, deploy — your output is ready in under 30 seconds.", hi_desc: "Copy karo, share karo, deploy karo — 30 second me output ready." },
];

export const HowItWorks = () => {
  const { t, lang } = useLang();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" data-testid="how-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--ts-brand)] mb-4">
              {t("how_eyebrow")}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[var(--ts-text)] mb-8">
              {t("how_title")}
            </h2>
            <div className="rounded-3xl overflow-hidden border border-[var(--ts-border)] ts-hover-lift">
              <img src={BENTO} alt="TechSathi AI workflow" className="w-full h-auto" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="group bg-white border border-[var(--ts-border)] rounded-2xl p-6 md:p-8 ts-hover-lift flex gap-6"
                  data-testid={`how-step-${i + 1}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="font-mono text-4xl font-medium text-[var(--ts-border)] group-hover:text-[var(--ts-brand)] transition-colors">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={22} strokeWidth={1.5} className="text-[var(--ts-brand)]" />
                      <h3 className="font-display text-xl font-medium text-[var(--ts-text)]">
                        {lang === "hinglish" ? step.hi_title : step.en_title}
                      </h3>
                    </div>
                    <p className="text-[var(--ts-text-secondary)] leading-relaxed">
                      {lang === "hinglish" ? step.hi_desc : step.en_desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
