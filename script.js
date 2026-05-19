
Action: file_editor create /app/static/script.js --file-text "/* ==============================================================
   TechSathi AI — Vanilla JS (no framework)
   Handles: language toggle, mobile menu, nav scroll, FAQ accordion,
   playground tabs/select/generate (calls /api/ai/generate),
   waitlist form, toast notifications.
   ============================================================== */

(function () {
  \"use strict\";

  // ---------- Config ----------
  // Same backend used by the React app. In production replace with same-origin \"/api\".
  const API_BASE = \"https://techsathi-suite.preview.emergentagent.com/api\";

  // ---------- i18n dictionary ----------
  const DICT = {
    en: {
      nav_tools: \"Tools\",
      nav_playground: \"Playground\",
      nav_pricing: \"Pricing\",
      nav_cta: \"Join Waitlist\",
      hero_tag: \"Your all-in-one AI Sathi\",
      hero_title_a: \"One AI partner for \",
      hero_title_b: \"every Indian student & business.\",
      hero_sub: \"Resumes, projects, websites, chatbots, marketing — TechSathi AI does it all in English or Hinglish. Simple, affordable, and built for Bharat.\",
      hero_cta_primary: \"Try the Playground\",
      hero_cta_secondary: \"See all tools\",
      hero_badge: \"Built for Bharat · Powered by Claude\",
      students_eyebrow: \"For Students\",
      students_title: \"Study smarter. Land the role.\",
      students_sub: \"Four AI tools that turn late-night confusion into placement offers.\",
      business_eyebrow: \"For Small Businesses\",
      business_title: \"Grow digitally, without a tech team.\",
      business_sub: \"Website, chatbot, content, and marketing — automated by AI, finished before chai.\",
      how_eyebrow: \"How it works\",
      how_title: \"Three steps from idea to output.\",
      playground_eyebrow: \"Live Playground\",
      playground_title: \"Try TechSathi now, no signup needed.\",
      playground_sub: \"Pick a tool, add a prompt, and watch our Claude-powered Sathi craft the output.\",
      pricing_eyebrow: \"Affordable pricing\",
      pricing_title: \"Priced for the Indian wallet.\",
      testi_eyebrow: \"Loved by Bharat\",
      testi_title: \"From hostel rooms to kirana stores.\",
      faq_eyebrow: \"FAQ\",
      faq_title: \"Everything you wanted to ask.\",
      cta_title: \"Ready to meet your Sathi?\",
      cta_sub: \"Join 1,200+ students and founders already on the waitlist.\",
      cta_button: \"Join the waitlist\",
      cta_success: \"You're in! We'll reach out soon 🙏\",
      footer_tag: \"Your Sathi in every click.\",
      tool_run: \"Generate\",
      tool_running: \"Thinking…\",
      tool_copied: \"Copied to clipboard\",
      tool_output_empty: \"Your Sathi's output will appear here.\",
      tool_resume: \"Resume Generator\",
    },
    hinglish: {
      nav_tools: \"Tools\",
      nav_playground: \"Playground\",
      nav_pricing: \"Pricing\",
      nav_cta: \"Waitlist Join Karo\",
      hero_tag: \"Aapka all-in-one AI Sathi\",
      hero_title_a: \"Har Indian student aur business ke liye \",
      hero_title_b: \"ek hi AI partner.\",
      hero_sub: \"Resume ho, project ho, website ho ya marketing — TechSathi AI sab kuch karta hai, English ya Hinglish me. Simple, affordable, aur Bharat ke liye bana.\",
      hero_cta_primary: \"Playground Try Karo\",
      hero_cta_secondary: \"Sab tools dekho\",
      hero_badge: \"Bharat ke liye · Claude se powered\",
      students_eyebrow: \"Students ke liye\",
      students_title: \"Smart padho. Job pao.\",
      students_sub: \"4 AI tools jo raat ki confusion ko placement offer me badal dein.\",
      business_eyebrow: \"Chote businesses ke liye\",
      business_title: \"Bina tech team ke digital grow karo.\",
      business_sub: \"Website, chatbot, content, marketing — sab AI karega, chai se pehle.\",
      how_eyebrow: \"Kaise kaam karta hai\",
      how_title: \"Idea se output tak — teen steps.\",
      playground_eyebrow: \"Live Playground\",
      playground_title: \"Abhi try karo, signup nahi chahiye.\",
      playground_sub: \"Tool chuno, prompt do, aur dekho Sathi kaise banata hai.\",
      pricing_eyebrow: \"Affordable pricing\",
      pricing_title: \"Indian jeb ke hisaab se.\",
      testi_eyebrow: \"Bharat ko pasand\",
      testi_title: \"Hostel se kirana tak.\",
      faq_eyebrow: \"FAQ\",
      faq_title: \"Jo sawal aapke mann me hain.\",
      cta_title: \"Apne Sathi se milne ke liye tayaar?\",
      cta_sub: \"1,200+ students aur founders pehle se waitlist pe hain.\",
      cta_button: \"Waitlist join karo\",
      cta_success: \"Ho gaya! Jaldi milenge 🙏\",
      footer_tag: \"Har click me aapka Sathi.\",
      tool_run: \"Generate karo\",
      tool_running: \"Soch raha hai…\",
      tool_copied: \"Copy ho gaya\",
      tool_output_empty: \"Sathi ka output yahan dikhega.\",
      tool_resume: \"Resume Banao\",
    },
  };

  // ---------- Playground tools ----------
  const TOOLS = {
    student: [
      { id: \"resume\", en: \"Resume Generator\", hi: \"Resume Banao\", ex: \"3rd year CSE student, skills: React, Python, internship at a fintech. Applying for SDE internship.\" },
      { id: \"internship\", en: \"Internship Finder\", hi: \"Internship Finder\", ex: \"Final year ECE, good at embedded systems and ML basics, open to both hardware and software roles.\" },
      { id: \"project-ideas\", en: \"Project Ideas\", hi: \"Project Ideas\", ex: \"Web dev beginner, know JS + React, want 3 portfolio-worthy projects for placements.\" },
      { id: \"study\", en: \"Study Buddy\", hi: \"Study Sathi\", ex: \"Explain Big-O notation like I'm in 10th standard, with a desi example.\" },
    ],
    business: [
      { id: \"content-gen\", en: \"Content Generator\", hi: \"Content Banao\", ex: \"Business: home-made masala brand in Jaipur, targeting urban millennials on Instagram.\" },
      { id: \"social-media\", en: \"Social Planner\", hi: \"Social Planner\", ex: \"Business: yoga studio in Pune, want 7 days of content mixing reels and carousels.\" },
      { id: \"marketing\", en: \"Marketing Funnel\", hi: \"Marketing Funnel\", ex: \"D2C candle brand, monthly budget ₹30k, selling via Instagram + own website.\" },
      { id: \"website\", en: \"Website Builder\", hi: \"Website Builder\", ex: \"Freelance wedding photographer in Delhi, wants a portfolio + booking enquiry site.\" },
      { id: \"chatbot-builder\", en: \"Chatbot Builder\", hi: \"Chatbot Builder\", ex: \"Cloud kitchen in Bangalore, needs a WhatsApp bot for order queries and menu FAQ.\" },
    ],
  };

  // ---------- State ----------
  let lang = \"en\";
  let currentTab = \"student\";

  // ---------- DOM refs ----------
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => Array.from((p || document).querySelectorAll(s));

  // ---------- i18n apply ----------
  function applyLang() {
    $$(\"[data-i18n]\").forEach(el => {
      const key = el.getAttribute(\"data-i18n\");
      if (DICT[lang][key] != null) el.textContent = DICT[lang][key];
    });
    $$(\".ts-lang-opt\").forEach(opt => {
      opt.classList.toggle(\"active\", opt.dataset.lang === lang);
    });
    document.documentElement.setAttribute(\"lang\", lang === \"en\" ? \"en\" : \"hi\");
    refreshToolSelect();
  }

  function setLang(next) {
    lang = next;
    applyLang();
  }

  // ---------- Navbar scroll ----------
  function setupNavScroll() {
    const nav = $(\"#navbar\");
    const onScroll = () => nav.classList.toggle(\"scrolled\", window.scrollY > 20);
    window.addEventListener(\"scroll\", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile menu ----------
  function setupMobileMenu() {
    const burger = $(\"#burger\");
    const menu = $(\"#mobileMenu\");
    burger.addEventListener(\"click\", () => {
      const isHidden = menu.hasAttribute(\"hidden\");
      if (isHidden) menu.removeAttribute(\"hidden\");
      else menu.setAttribute(\"hidden\", \"\");
    });
    $$(\"#mobileMenu a\").forEach(a => a.addEventListener(\"click\", () => menu.setAttribute(\"hidden\", \"\")));
  }

  // ---------- Language toggles ----------
  function setupLangToggles() {
    $$(\".ts-lang-toggle\").forEach(toggle => {
      toggle.addEventListener(\"click\", (e) => {
        const target = e.target.closest(\".ts-lang-opt\");
        if (target && target.dataset.lang) setLang(target.dataset.lang);
        else setLang(lang === \"en\" ? \"hinglish\" : \"en\");
      });
    });
  }

  // ---------- Playground ----------
  function refreshToolSelect() {
    const select = $(\"#toolSelect\");
    if (!select) return;
    const previous = select.value;
    const tools = TOOLS[currentTab];
    select.innerHTML = \"\";
    tools.forEach(t => {
      const opt = document.createElement(\"option\");
      opt.value = t.id;
      opt.textContent = lang === \"hinglish\" ? t.hi : t.en;
      opt.setAttribute(\"data-testid\", `playground-option-${t.id}`);
      select.appendChild(opt);
    });
    // Restore previous selection if still available
    if (tools.find(t => t.id === previous)) select.value = previous;
  }

  function setupPlaygroundTabs() {
    $$(\".ts-tab\").forEach(tab => {
      tab.addEventListener(\"click\", () => {
        currentTab = tab.dataset.tab;
        $$(\".ts-tab\").forEach(t => t.classList.toggle(\"active\", t === tab));
        refreshToolSelect();
      });
    });
  }

  function setupUseExample() {
    const btn = $(\"#useExample\");
    const select = $(\"#toolSelect\");
    const input = $(\"#promptInput\");
    btn.addEventListener(\"click\", () => {
      const allTools = [...TOOLS.student, ...TOOLS.business];
      const tool = allTools.find(t => t.id === select.value);
      if (tool) input.value = tool.ex;
    });
  }

  function setupToolCardLinks() {
    $$(\"[data-tool]\").forEach(el => {
      if (el.tagName !== \"BUTTON\") return;
      el.addEventListener(\"click\", () => {
        const toolId = el.dataset.tool;
        if (!toolId) return;
        // Switch to correct tab
        const inStudent = TOOLS.student.some(t => t.id === toolId);
        currentTab = inStudent ? \"student\" : \"business\";
        $$(\".ts-tab\").forEach(t => t.classList.toggle(\"active\", t.dataset.tab === currentTab));
        refreshToolSelect();
        $(\"#toolSelect\").value = toolId;
        document.getElementById(\"playground\").scrollIntoView({ behavior: \"smooth\" });
      });
    });
  }

  async function setupGenerate() {
    const btn = $(\"#generateBtn\");
    const select = $(\"#toolSelect\");
    const input = $(\"#promptInput\");
    const output = $(\"#output\");
    const copyBtn = $(\"#copyBtn\");

    btn.addEventListener(\"click\", async () => {
      const prompt = input.value.trim();
      if (!prompt) {
        toast(lang === \"en\" ? \"Please enter a prompt first\" : \"Pehle prompt toh likho\", \"error\");
        return;
      }
      btn.classList.add(\"loading\");
      output.textContent = \"\";
      output.innerHTML = `<div class=\"ts-output-empty\"><span class=\"ts-spinner\" style=\"border-top-color:var(--ts-brand);border-color:rgba(224,93,58,0.25);border-top-color:var(--ts-brand)\"></span><p style=\"margin-top:0.75rem\">${DICT[lang].tool_running}</p></div>`;
      copyBtn.setAttribute(\"hidden\", \"\");

      try {
        const res = await fetch(`${API_BASE}/ai/generate`, {
          method: \"POST\",
          headers: { \"Content-Type\": \"application/json\" },
          body: JSON.stringify({ tool: select.value, language: lang, prompt }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        output.textContent = data.output || \"\";
        copyBtn.removeAttribute(\"hidden\");
      } catch (err) {
        output.innerHTML = `<div class=\"ts-output-empty\"><p style=\"color:#B91C1C\">${lang === \"en\" ? \"Generation failed. Try again.\" : \"Kuch galat ho gaya, phir se try karo.\"}</p></div>`;
        toast(lang === \"en\" ? \"Generation failed\" : \"Generation fail ho gaya\", \"error\");
      } finally {
        btn.classList.remove(\"loading\");
      }
    });

    copyBtn.addEventListener(\"click\", () => {
      const text = output.textContent || \"\";
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        toast(DICT[lang].tool_copied, \"success\");
      });
    });
  }

  // ---------- Waitlist ----------
  function setupWaitlist() {
    const form = $(\"#waitlistForm\");
    const emailInput = $(\"#waitlistEmail\");
    const countEl = $(\"#waitlistCount\");
    const submitBtn = form.querySelector(\"button[type='submit']\");

    // Bootstrap count
    fetch(`${API_BASE}/waitlist/count`)
      .then(r => r.ok ? r.json() : { count: 1247 })
      .then(d => { countEl.textContent = `${Number(d.count).toLocaleString(\"en-IN\")} on the waitlist`; })
      .catch(() => { countEl.textContent = \"1,247 on the waitlist\"; });

    form.addEventListener(\"submit\", async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email || !email.includes(\"@\")) {
        toast(lang === \"en\" ? \"Enter a valid email\" : \"Sahi email daalo\", \"error\");
        return;
      }
      submitBtn.disabled = true;
      submitBtn.style.opacity = \"0.8\";
      try {
        const res = await fetch(`${API_BASE}/waitlist`, {
          method: \"POST\",
          headers: { \"Content-Type\": \"application/json\" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error(\"Failed\");
        toast(DICT[lang].cta_success, \"success\");
        submitBtn.querySelector(\"span[data-i18n]\").textContent = \"✓ Done\";
        emailInput.value = \"\";
      } catch (err) {
        toast(lang === \"en\" ? \"Something went wrong\" : \"Kuch galat ho gaya\", \"error\");
        submitBtn.disabled = false;
        submitBtn.style.opacity = \"1\";
      }
    });
  }

  // ---------- Toast ----------
  let toastTimer = null;
  function toast(msg, kind) {
    const el = $(\"#toast\");
    el.textContent = msg;
    el.className = `ts-toast show ${kind || \"\"}`;
    el.removeAttribute(\"hidden\");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove(\"show\");
    }, 2600);
  }

  // ---------- Init ----------
  document.addEventListener(\"DOMContentLoaded\", () => {
    applyLang();
    setupNavScroll();
    setupMobileMenu();
    setupLangToggles();
    setupPlaygroundTabs();
    setupUseExample();
    setupToolCardLinks();
    setupGenerate();
    setupWaitlist();
    refreshToolSelect();
  });
})();
"
Observation: Create successful: /app/static/script.js
