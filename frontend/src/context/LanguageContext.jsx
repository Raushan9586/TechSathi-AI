import React, { createContext, useContext, useState, useMemo } from "react";

const LanguageContext = createContext(null);

const dictionary = {
  en: {
    nav_features: "Features",
    nav_tools: "Tools",
    nav_pricing: "Pricing",
    nav_playground: "Playground",
    nav_cta: "Join Waitlist",
    hero_tag: "Your all-in-one AI Sathi",
    hero_title_a: "One AI partner for ",
    hero_title_b: "every Indian student & business.",
    hero_sub: "Resumes, projects, websites, chatbots, marketing — TechSathi AI does it all in English or Hinglish. Simple, affordable, and built for Bharat.",
    hero_cta_primary: "Try the Playground",
    hero_cta_secondary: "See all tools",
    hero_badge: "Built for Bharat · Powered by Claude",
    students_eyebrow: "For Students",
    students_title: "Study smarter. Land the role.",
    students_sub: "Four AI tools that turn late-night confusion into placement offers.",
    business_eyebrow: "For Small Businesses",
    business_title: "Grow digitally, without a tech team.",
    business_sub: "Website, chatbot, content, and marketing — automated by AI, finished before chai.",
    how_eyebrow: "How it works",
    how_title: "Three steps from idea to output.",
    playground_eyebrow: "Live Playground",
    playground_title: "Try TechSathi now, no signup needed.",
    playground_sub: "Pick a tool, add a prompt, and watch our Claude-powered Sathi craft the output.",
    pricing_eyebrow: "Affordable pricing",
    pricing_title: "Priced for the Indian wallet.",
    testi_eyebrow: "Loved by Bharat",
    testi_title: "From hostel rooms to kirana stores.",
    faq_eyebrow: "FAQ",
    faq_title: "Everything you wanted to ask.",
    cta_title: "Ready to meet your Sathi?",
    cta_sub: "Join 1,200+ students and founders already on the waitlist.",
    cta_placeholder: "your.email@domain.com",
    cta_button: "Join the waitlist",
    cta_success: "You're in! We'll reach out soon 🙏",
    footer_tag: "Your Sathi in every click.",
    tool_run: "Generate",
    tool_running: "Thinking…",
    tool_copied: "Copied to clipboard",
    tool_placeholder: "Describe what you need — your skills, business, or question…",
    tool_output_empty: "Your Sathi's output will appear here.",
  },
  hinglish: {
    nav_features: "Features",
    nav_tools: "Tools",
    nav_pricing: "Pricing",
    nav_playground: "Playground",
    nav_cta: "Waitlist Join Karo",
    hero_tag: "Aapka all-in-one AI Sathi",
    hero_title_a: "Har Indian student aur business ke liye ",
    hero_title_b: "ek hi AI partner.",
    hero_sub: "Resume ho, project ho, website ho ya marketing — TechSathi AI sab kuch karta hai, English ya Hinglish me. Simple, affordable, aur Bharat ke liye bana.",
    hero_cta_primary: "Playground Try Karo",
    hero_cta_secondary: "Sab tools dekho",
    hero_badge: "Bharat ke liye · Claude se powered",
    students_eyebrow: "Students ke liye",
    students_title: "Smart padho. Job pao.",
    students_sub: "4 AI tools jo raat ki confusion ko placement offer me badal dein.",
    business_eyebrow: "Chote businesses ke liye",
    business_title: "Bina tech team ke digital grow karo.",
    business_sub: "Website, chatbot, content, marketing — sab AI karega, chai se pehle.",
    how_eyebrow: "Kaise kaam karta hai",
    how_title: "Idea se output tak — teen steps.",
    playground_eyebrow: "Live Playground",
    playground_title: "Abhi try karo, signup nahi chahiye.",
    playground_sub: "Tool chuno, prompt do, aur dekho Sathi kaise banata hai.",
    pricing_eyebrow: "Affordable pricing",
    pricing_title: "Indian jeb ke hisaab se.",
    testi_eyebrow: "Bharat ko pasand",
    testi_title: "Hostel se kirana tak.",
    faq_eyebrow: "FAQ",
    faq_title: "Jo sawal aapke mann me hain.",
    cta_title: "Apne Sathi se milne ke liye tayaar?",
    cta_sub: "1,200+ students aur founders pehle se waitlist pe hain.",
    cta_placeholder: "aapka.email@domain.com",
    cta_button: "Waitlist join karo",
    cta_success: "Ho gaya! Jaldi milenge 🙏",
    footer_tag: "Har click me aapka Sathi.",
    tool_run: "Generate karo",
    tool_running: "Soch raha hai…",
    tool_copied: "Copy ho gaya",
    tool_placeholder: "Batao kya chahiye — skills, business ya sawal…",
    tool_output_empty: "Sathi ka output yahan dikhega.",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const value = useMemo(() => ({
    lang,
    setLang,
    toggle: () => setLang(l => (l === "en" ? "hinglish" : "en")),
    t: (key) => dictionary[lang][key] ?? dictionary.en[key] ?? key,
  }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
