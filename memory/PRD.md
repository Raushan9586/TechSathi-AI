# TechSathi AI — PRD

## Original Problem Statement
Modern AI-powered SaaS platform "TechSathi AI" for Indian students and small businesses. Combines multiple AI tools (resume gen, internship recs, project ideas, study help / website builder, chatbot, social content, marketing automation). Bilingual (English + Hinglish). Positioned as an all-in-one AI digital sathi (partner).

## Architecture
- **Backend**: FastAPI + MongoDB + emergentintegrations (Claude Sonnet 4.5 via EMERGENT_LLM_KEY)
- **Frontend**: React 19 + Tailwind + Shadcn UI + sonner + lucide-react
- **Language**: Global React Context toggle for EN / Hinglish — affects both UI copy and LLM prompts

## Core Requirements
1. Landing page (hero, tools, how it works, pricing, testimonials, FAQ, waitlist CTA, footer)
2. Bilingual EN / Hinglish toggle
3. Interactive AI playground powered by Claude Sonnet 4.5
4. Waitlist email capture
5. 9 AI tools (4 student + 5 business)

## User Personas
- **Student (Ananya, 3rd year engg)** — needs resume, internship leads, project ideas, study help
- **Founder (Rohan, D2C SMB)** — needs website copy, chatbot, social calendar, marketing plan

## What's Implemented (Feb 2026 — v1)
- Backend: `/api/` health, `/api/tools`, `/api/ai/generate` (9 tools × 2 languages), `/api/chat`, `/api/waitlist`, `/api/waitlist/count`
- Frontend: Full landing page with Navbar, Hero (mascot + floating cards), Tools bento sections, HowItWorks, AIPlayground (live Claude generation), Pricing (3 tiers), Testimonials, FAQ (Accordion), Waitlist CTA, Footer
- Language context with full dictionary in both locales
- Outfit + IBM Plex Sans + JetBrains Mono fonts
- Indian-tech aesthetic: terracotta + deep indigo + sage
- data-testid across all interactive elements

## Prioritized Backlog
### P0 (next)
- User auth + saved generations history per account
- Export resume to PDF
- WhatsApp chatbot connector (business plan)

### P1
- Stripe / Razorpay payments for pricing tiers
- Admin dashboard for waitlist / generations
- Brand voice memory (fine-tune prompts per business)

### P2
- API access tier for business plan
- Referral / college-ambassador program
- Mobile app (React Native)
