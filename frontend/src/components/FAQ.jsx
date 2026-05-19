import React from "react";
import { useLang } from "../context/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const faqs = [
  {
    q_en: "Is TechSathi AI really free to try?",
    q_hi: "Kya TechSathi AI free hai try karne ke liye?",
    a_en: "Yes! Free tier gives you 3 generations per day across all 9 tools — no credit card required.",
    a_hi: "Bilkul! Free plan me 3 generations per day milte hain saare 9 tools par — koi card nahi chahiye.",
  },
  {
    q_en: "Which AI model powers TechSathi?",
    q_hi: "TechSathi ke peeche kaunsa AI hai?",
    a_en: "We use Anthropic's Claude Sonnet 4.5 — one of the most capable models for Indian English and Hinglish.",
    a_hi: "Hum Anthropic ke Claude Sonnet 4.5 ka use karte hain — Indian English aur Hinglish ke liye best models me se ek.",
  },
  {
    q_en: "Can I really use it in Hinglish?",
    q_hi: "Kya main sach me Hinglish me use kar sakta hoon?",
    a_en: "Absolutely. Toggle the language in the header — prompts and output both adapt to Hinglish instantly.",
    a_hi: "Haan ji! Header me language toggle karo — prompts aur output dono Hinglish me aa jaenge.",
  },
  {
    q_en: "Is my data safe?",
    q_hi: "Mera data safe hai kya?",
    a_en: "Your prompts are used only to generate output. We never sell data, and paid plans allow you to delete history anytime.",
    a_hi: "Haan. Aapke prompts sirf output banane ke liye use hote hain. Hum data sell nahi karte aur paid plan me history kabhi bhi delete kar sakte ho.",
  },
  {
    q_en: "Do you offer student discounts?",
    q_hi: "Students ke liye discount hai?",
    a_en: "Yes — verify with your college email and get 40% off the Student plan for a full year.",
    a_hi: "Haan! College email se verify karo aur Student plan par poore saal 40% discount pao.",
  },
  {
    q_en: "Can small businesses deploy the chatbot on WhatsApp?",
    q_hi: "Kya chhote business WhatsApp par chatbot deploy kar sakte hain?",
    a_en: "On the Business plan, yes — we provide a one-click WhatsApp connector using your business number.",
    a_hi: "Business plan me haan — aapke business number ke saath one-click WhatsApp connector milta hai.",
  },
];

export const FAQ = () => {
  const { t, lang } = useLang();
  return (
    <section id="faq" className="py-24 md:py-32 bg-[var(--ts-bg-alt)]" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-5 md:px-10">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--ts-brand)] mb-4">
            {t("faq_eyebrow")}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[var(--ts-text)]">
            {t("faq_title")}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q_en}
              value={`faq-${i}`}
              data-testid={`faq-item-${i}`}
              className="bg-white border border-[var(--ts-border)] rounded-2xl px-6 data-[state=open]:border-[var(--ts-brand)]/40"
            >
              <AccordionTrigger className="text-left font-display text-lg font-medium hover:no-underline py-5">
                {lang === "hinglish" ? item.q_hi : item.q_en}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--ts-text-secondary)] leading-relaxed pb-5">
                {lang === "hinglish" ? item.a_hi : item.a_en}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
