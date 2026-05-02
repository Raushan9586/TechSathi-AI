import React from "react";
import { useLang } from "../context/LanguageContext";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    id: "free",
    name: "Sathi Free",
    price: "₹0",
    period: "forever",
    desc: "Try the platform, no card needed.",
    features: ["3 generations / day", "All 9 AI tools", "English + Hinglish", "Community support"],
    cta: "Start free",
    highlight: false,
  },
  {
    id: "student",
    name: "Student",
    price: "₹199",
    period: "/ month",
    desc: "Built for learners and job-seekers.",
    features: ["Unlimited student tools", "Priority resume reviews", "Mentor chat (beta)", "Internship database access", "Email support"],
    cta: "Get Student plan",
    highlight: true,
    badge: "Most popular",
  },
  {
    id: "business",
    name: "Business",
    price: "₹799",
    period: "/ month",
    desc: "For founders, freelancers, SMBs.",
    features: ["Unlimited business tools", "Deploy chatbots on web + WhatsApp", "Brand voice memory", "API access", "Priority human support"],
    cta: "Get Business plan",
    highlight: false,
  },
];

export const Pricing = () => {
  const { t } = useLang();
  return (
    <section id="pricing" className="py-24 md:py-32 bg-[var(--ts-bg-alt)]" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-16 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--ts-brand)] mb-4">
            {t("pricing_eyebrow")}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[var(--ts-text)]">
            {t("pricing_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.id}
              data-testid={`pricing-card-${plan.id}`}
              className={`relative rounded-3xl p-8 ts-hover-lift flex flex-col ${
                plan.highlight
                  ? "bg-[var(--ts-secondary)] text-white border-2 border-[var(--ts-brand)]"
                  : "bg-white border border-[var(--ts-border)]"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-8 bg-[var(--ts-brand)] text-white text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <h3 className={`font-display text-2xl font-medium mb-1 ${plan.highlight ? "text-white" : "text-[var(--ts-text)]"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-white/70" : "text-[var(--ts-text-secondary)]"}`}>
                {plan.desc}
              </p>
              <div className="mb-6">
                <span className="font-display text-5xl font-medium">{plan.price}</span>
                <span className={`ml-1 text-sm ${plan.highlight ? "text-white/60" : "text-[var(--ts-text-secondary)]"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check size={16} strokeWidth={2} className={plan.highlight ? "text-[var(--ts-brand)] mt-0.5 flex-shrink-0" : "text-[var(--ts-sage-dark)] mt-0.5 flex-shrink-0"} />
                    <span className={plan.highlight ? "text-white/90" : "text-[var(--ts-text)]"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                data-testid={`pricing-cta-${plan.id}`}
                className={`w-full rounded-full h-12 font-medium ${
                  plan.highlight
                    ? "bg-[var(--ts-brand)] hover:bg-[var(--ts-brand-hover)] text-white"
                    : "bg-[var(--ts-secondary)] hover:bg-[var(--ts-secondary-hover)] text-white"
                }`}
              >
                <a href="#cta">{plan.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
