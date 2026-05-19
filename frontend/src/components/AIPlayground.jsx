import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLang } from "../context/LanguageContext";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { Sparkles, Copy, Loader2, Wand2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TOOL_OPTIONS = [
  { id: "resume", en: "Resume Generator", hi: "Resume Banao", ex: "3rd year CSE student, skills: React, Python, internship at a fintech. Applying for SDE internship." },
  { id: "internship", en: "Internship Finder", hi: "Internship Finder", ex: "Final year ECE, good at embedded systems and ML basics, open to both hardware and software roles." },
  { id: "project-ideas", en: "Project Ideas", hi: "Project Ideas", ex: "Web dev beginner, know JS + React, want 3 portfolio-worthy projects for placements." },
  { id: "study", en: "Study Buddy", hi: "Study Sathi", ex: "Explain Big-O notation like I'm in 10th standard, with a desi example." },
  { id: "content-gen", en: "Content Generator", hi: "Content Banao", ex: "Business: home-made masala brand in Jaipur, targeting urban millennials on Instagram." },
  { id: "social-media", en: "Social Planner", hi: "Social Planner", ex: "Business: yoga studio in Pune, want 7 days of content mixing reels and carousels." },
  { id: "marketing", en: "Marketing Funnel", hi: "Marketing Funnel", ex: "D2C candle brand, monthly budget ₹30k, selling via Instagram + own website." },
  { id: "website", en: "Website Builder", hi: "Website Builder", ex: "Freelance wedding photographer in Delhi, wants a portfolio + booking enquiry site." },
  { id: "chatbot-builder", en: "Chatbot Builder", hi: "Chatbot Builder", ex: "Cloud kitchen in Bangalore, needs a WhatsApp bot for order queries and menu FAQ." },
];

export const AIPlayground = () => {
  const { t, lang } = useLang();
  const [tab, setTab] = useState("student");
  const [selectedTool, setSelectedTool] = useState("resume");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const outputRef = useRef(null);

  useEffect(() => {
    // Update default tool when tab changes
    if (tab === "student") setSelectedTool("resume");
    else setSelectedTool("content-gen");
  }, [tab]);

  const studentTools = TOOL_OPTIONS.filter(t => ["resume", "internship", "project-ideas", "study"].includes(t.id));
  const businessTools = TOOL_OPTIONS.filter(t => ["content-gen", "social-media", "marketing", "website", "chatbot-builder"].includes(t.id));
  const availableTools = tab === "student" ? studentTools : businessTools;

  const currentTool = TOOL_OPTIONS.find(t => t.id === selectedTool);

  const useExample = () => {
    if (currentTool) setPrompt(currentTool.ex);
  };

  const generate = async () => {
    if (!prompt.trim()) {
      toast.error(lang === "en" ? "Please enter a prompt first" : "Pehle prompt toh likho");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const { data } = await axios.post(`${API}/ai/generate`, {
        tool: selectedTool,
        language: lang,
        prompt,
      });
      setOutput(data.output);
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 150);
    } catch (e) {
      toast.error(lang === "en" ? "Generation failed. Try again." : "Kuch galat ho gaya, phir se try karo.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success(t("tool_copied"));
  };

  return (
    <section id="playground" className="py-24 md:py-32 relative overflow-hidden" data-testid="playground-section">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] ts-glow -translate-y-1/2 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-12 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--ts-brand)] mb-4">
            {t("playground_eyebrow")}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[var(--ts-text)]">
            {t("playground_title")}
          </h2>
          <p className="mt-4 text-[var(--ts-text-secondary)]">{t("playground_sub")}</p>
        </div>

        <div className="bg-white border border-[var(--ts-border)] rounded-3xl overflow-hidden shadow-xl shadow-[var(--ts-secondary)]/5">
          <div className="grid lg:grid-cols-5">
            {/* Left panel - Input */}
            <div className="lg:col-span-2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[var(--ts-border)] bg-[var(--ts-bg-alt)]/50">
              <Tabs value={tab} onValueChange={setTab} className="mb-6">
                <TabsList className="grid grid-cols-2 w-full bg-white border border-[var(--ts-border)] rounded-full p-1 h-auto">
                  <TabsTrigger
                    value="student"
                    data-testid="playground-tab-student"
                    className="rounded-full data-[state=active]:bg-[var(--ts-brand)] data-[state=active]:text-white text-sm py-2"
                  >For Students</TabsTrigger>
                  <TabsTrigger
                    value="business"
                    data-testid="playground-tab-business"
                    className="rounded-full data-[state=active]:bg-[var(--ts-secondary)] data-[state=active]:text-white text-sm py-2"
                  >For Business</TabsTrigger>
                </TabsList>
              </Tabs>

              <label className="text-xs uppercase tracking-[0.15em] font-bold text-[var(--ts-text-secondary)] mb-2 block">
                Choose a tool
              </label>
              <Select value={selectedTool} onValueChange={setSelectedTool}>
                <SelectTrigger className="w-full bg-white border-[var(--ts-border)] rounded-xl h-11" data-testid="playground-tool-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableTools.map(tool => (
                    <SelectItem key={tool.id} value={tool.id} data-testid={`playground-option-${tool.id}`}>
                      {lang === "hinglish" ? tool.hi : tool.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between mt-6 mb-2">
                <label className="text-xs uppercase tracking-[0.15em] font-bold text-[var(--ts-text-secondary)]">
                  Your prompt
                </label>
                <button
                  onClick={useExample}
                  data-testid="playground-example-btn"
                  className="text-xs text-[var(--ts-brand)] hover:text-[var(--ts-brand-hover)] font-medium inline-flex items-center gap-1"
                >
                  <Wand2 size={12} /> Use example
                </button>
              </div>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("tool_placeholder")}
                rows={7}
                data-testid="playground-prompt-input"
                className="bg-white border-[var(--ts-border)] rounded-xl resize-none focus-visible:ring-[var(--ts-brand)]"
              />

              <Button
                onClick={generate}
                disabled={loading}
                data-testid="playground-generate-btn"
                className="w-full mt-5 bg-[var(--ts-brand)] hover:bg-[var(--ts-brand-hover)] text-white rounded-full h-12 font-medium"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin mr-2" /> {t("tool_running")}</>
                ) : (
                  <><Sparkles size={18} className="mr-2" /> {t("tool_run")}</>
                )}
              </Button>

              <p className="text-[10px] text-[var(--ts-text-secondary)] mt-3 text-center">
                Powered by Claude Sonnet 4.5 · Generations logged anonymously
              </p>
            </div>

            {/* Right panel - Output */}
            <div className="lg:col-span-3 p-6 md:p-8 flex flex-col min-h-[520px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--ts-sage-dark)] animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.15em] font-bold text-[var(--ts-text-secondary)]">
                    Sathi Output
                  </span>
                </div>
                {output && (
                  <button
                    onClick={copy}
                    data-testid="playground-copy-btn"
                    className="text-xs inline-flex items-center gap-1.5 text-[var(--ts-text-secondary)] hover:text-[var(--ts-text)] bg-[var(--ts-bg-alt)] px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Copy size={12} /> Copy
                  </button>
                )}
              </div>

              <div
                ref={outputRef}
                data-testid="playground-output"
                className="flex-1 bg-[var(--ts-bg-alt)]/40 border border-[var(--ts-border)] rounded-2xl p-5 md:p-6 overflow-auto font-mono text-sm leading-relaxed whitespace-pre-wrap text-[var(--ts-text)]"
                style={{ maxHeight: "560px" }}
              >
                {loading && (
                  <div className="flex items-center gap-3 text-[var(--ts-text-secondary)]">
                    <Loader2 size={16} className="animate-spin" />
                    <span>{t("tool_running")}</span>
                  </div>
                )}
                {!loading && !output && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[var(--ts-border)] flex items-center justify-center mb-4">
                      <Sparkles size={22} className="text-[var(--ts-brand)]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[var(--ts-text-secondary)] max-w-xs">{t("tool_output_empty")}</p>
                  </div>
                )}
                {!loading && output && output}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
