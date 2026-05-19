import React from "react";
import { useLang } from "../context/LanguageContext";

const testimonials = [
  {
    quote: "TechSathi ne mera resume 20 minute me banaya. 3 hafte me Flipkart se internship call aayi.",
    quote_en: "TechSathi built my resume in 20 minutes. Got a Flipkart internship call within 3 weeks.",
    name: "Ananya Singh",
    role: "CS Student · NIT Jaipur",
    img: "https://images.pexels.com/photos/17602823/pexels-photo-17602823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tag: "Student",
  },
  {
    quote: "I launched my candle brand's website + WhatsApp bot in one afternoon. Earlier I was paying 40k for this.",
    quote_en: "I launched my candle brand's website + WhatsApp bot in one afternoon. Earlier I was paying 40k for this.",
    name: "Rohan Mehta",
    role: "Founder · LumenCo",
    img: "https://images.unsplash.com/photo-1638544637644-2a2905d4f448?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbWFsbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBzdGFydHVwfGVufDB8fHx8MTc3Nzc0NzE2Nnww&ixlib=rb-4.1.0&q=85",
    tag: "Founder",
  },
  {
    quote: "Study Sathi ne operating systems ko itna simple bana diya ki mere dost bhi isse use kar rahe hain.",
    quote_en: "Study Sathi made OS so simple that my friends started using it too.",
    name: "Karthik Raghavan",
    role: "B.Tech Final Year",
    img: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=600&auto=format&fit=crop",
    tag: "Student",
  },
];

export const Testimonials = () => {
  const { t, lang } = useLang();
  return (
    <section className="py-24 md:py-32" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-16 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--ts-sage-dark)] mb-4">
            {t("testi_eyebrow")}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[var(--ts-text)]">
            {t("testi_title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((x, i) => (
            <article
              key={x.name}
              data-testid={`testimonial-${i}`}
              className="bg-white border border-[var(--ts-border)] rounded-3xl p-7 ts-hover-lift flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={x.img}
                  alt={x.name}
                  className="w-14 h-14 rounded-full object-cover border border-[var(--ts-border)]"
                />
                <div>
                  <div className="font-medium text-[var(--ts-text)]">{x.name}</div>
                  <div className="text-xs text-[var(--ts-text-secondary)]">{x.role}</div>
                </div>
                <span className="ml-auto text-[10px] uppercase tracking-[0.15em] font-bold text-[var(--ts-brand)] bg-[var(--ts-saffron-light)] px-2 py-1 rounded-full">
                  {x.tag}
                </span>
              </div>
              <blockquote className="text-[var(--ts-text)] text-base leading-relaxed flex-1">
                "{lang === "hinglish" ? x.quote : x.quote_en}"
              </blockquote>
              <div className="flex gap-1 mt-6">
                {["s1", "s2", "s3", "s4", "s5"].map((s) => (
                  <span key={s} className="text-[var(--ts-brand)]">★</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
