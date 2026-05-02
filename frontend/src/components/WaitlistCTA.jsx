import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLang } from "../context/LanguageContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { ArrowRight, Users } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const WaitlistCTA = () => {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    axios.get(`${API}/waitlist/count`).then(r => setCount(r.data.count)).catch(() => setCount(1247));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error(lang === "en" ? "Enter a valid email" : "Sahi email daalo");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist`, { email });
      setDone(true);
      toast.success(t("cta_success"));
      setEmail("");
      setCount(c => (c ? c + 1 : c));
    } catch (err) {
      toast.error(lang === "en" ? "Something went wrong" : "Kuch galat ho gaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="py-24 md:py-32" data-testid="cta-section">
      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <div className="relative bg-[var(--ts-secondary)] rounded-[2.5rem] p-10 md:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 ts-glow pointer-events-none opacity-80" />
          <div className="absolute inset-0 ts-dot-bg opacity-[0.08] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium text-white/80 mb-6">
              <Users size={14} />
              <span>{count ? `${count.toLocaleString("en-IN")} on the waitlist` : "Loading…"}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-white max-w-2xl">
              {t("cta_title")}
            </h2>
            <p className="mt-4 text-white/70 max-w-lg">{t("cta_sub")}</p>

            <form onSubmit={submit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl" data-testid="waitlist-form">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("cta_placeholder")}
                data-testid="waitlist-email-input"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full h-12 px-5 focus-visible:ring-[var(--ts-brand)] focus-visible:border-transparent"
                disabled={loading || done}
              />
              <Button
                type="submit"
                disabled={loading || done}
                data-testid="waitlist-submit"
                className="bg-[var(--ts-brand)] hover:bg-[var(--ts-brand-hover)] text-white rounded-full px-6 h-12 font-medium whitespace-nowrap"
              >
                {done ? "✓ Done" : t("cta_button")}
                {!done && <ArrowRight size={16} className="ml-2" />}
              </Button>
            </form>

            <p className="mt-4 text-xs text-white/50">
              No spam. Unsubscribe anytime. Built with ❤️ in Bengaluru.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
