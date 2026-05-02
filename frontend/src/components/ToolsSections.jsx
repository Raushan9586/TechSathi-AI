import React from "react";
import { useLang } from "../context/LanguageContext";
import { GraduationCap, Briefcase, Lightbulb, BookOpen, Globe, MessageSquare, Megaphone, PenTool, Target, ArrowUpRight } from "lucide-react";

const studentTools = [
  { id: "resume", icon: GraduationCap, en: "Resume Generator", hi: "Resume Banao", desc: "ATS-ready resume in 30 seconds. Tailored to the role you want.", color: "var(--ts-brand)" },
  { id: "internship", icon: Briefcase, en: "Internship Finder", hi: "Internship Finder", desc: "5 realistic roles + 2-3 target companies each, based on your skills.", color: "var(--ts-secondary)" },
  { id: "project-ideas", icon: Lightbulb, en: "Project Ideas", hi: "Project Ideas", desc: "Portfolio projects that make recruiters say 'interview tomorrow?'", color: "var(--ts-sage-dark)" },
  { id: "study", icon: BookOpen, en: "Study Sathi", hi: "Study Sathi", desc: "Any topic explained with Indian analogies, examples, and practice Qs.", color: "var(--ts-brand)" },
];

const businessTools = [
  { id: "website", icon: Globe, en: "AI Website Builder", hi: "Website Builder", desc: "Instant 5-section website copy — hero, about, services, contact.", color: "var(--ts-brand)" },
  { id: "chatbot-builder", icon: MessageSquare, en: "Chatbot Builder", hi: "Chatbot Builder", desc: "Customer support bot with FAQs, quick replies, human escalation.", color: "var(--ts-secondary)" },
  { id: "social-media", icon: PenTool, en: "Social Planner", hi: "Social Planner", desc: "7-day content calendar with hooks, captions, and hashtags.", color: "var(--ts-sage-dark)" },
  { id: "marketing", icon: Target, en: "Marketing Funnel", hi: "Marketing Funnel", desc: "Awareness → Retention playbook with tools and sample messages.", color: "var(--ts-brand)" },
  { id: "content-gen", icon: Megaphone, en: "Content Generator", hi: "Content Banao", desc: "Headlines, taglines, product descriptions — crafted to convert.", color: "var(--ts-secondary)" },
];

const ToolCard = ({ tool, lang, onTry }) => {
  const Icon = tool.icon;
  return (
    <div
      className="group relative bg-white border border-[var(--ts-border)] rounded-2xl p-6 md:p-7 ts-hover-lift flex flex-col"
      data-testid={`tool-card-${tool.id}`}
    >
      <div className="flex items-start justify-between mb-8">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
        >
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <ArrowUpRight size={18} className="text-[var(--ts-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="font-display text-xl font-medium text-[var(--ts-text)] mb-2">
        {lang === "hinglish" ? tool.hi : tool.en}
      </h3>
      <p className="text-sm text-[var(--ts-text-secondary)] leading-relaxed flex-1">{tool.desc}</p>
      <button
        onClick={() => onTry?.(tool.id)}
        data-testid={`tool-try-${tool.id}`}
        className="mt-5 self-start text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ts-brand)] hover:text-[var(--ts-brand-hover)] transition-colors"
      >
        Try now →
      </button>
    </div>
  );
};

export const ToolsSections = ({ onTryTool }) => {
  const { t, lang } = useLang();
  return (
    <section id="tools" className="py-24 md:py-32 bg-[var(--ts-bg-alt)]" data-testid="tools-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--ts-brand)] mb-4">
            {t("students_eyebrow")}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[var(--ts-text)] max-w-3xl">
            {t("students_title")}
          </h2>
          <p className="mt-4 text-[var(--ts-text-secondary)] max-w-2xl">{t("students_sub")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-24">
          {studentTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} lang={lang} onTry={onTryTool} />
          ))}
        </div>

        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--ts-sage-dark)] mb-4">
            {t("business_eyebrow")}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[var(--ts-text)] max-w-3xl">
            {t("business_title")}
          </h2>
          <p className="mt-4 text-[var(--ts-text-secondary)] max-w-2xl">{t("business_sub")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {businessTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} lang={lang} onTry={onTryTool} />
          ))}
        </div>
      </div>
    </section>
  );
};
