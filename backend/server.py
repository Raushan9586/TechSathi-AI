from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any, List
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
CLAUDE_MODEL = "claude-sonnet-4-5-20250929"

app = FastAPI(title="TechSathi AI API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- System Prompts (EN + Hinglish) ----------
SYSTEM_PROMPTS: Dict[str, Dict[str, str]] = {
    "resume": {
        "en": "You are an expert resume writer for Indian students. Given the student's background, craft a crisp, modern, ATS-friendly resume in markdown with sections: Summary, Skills, Education, Projects, Experience, Achievements. Keep language professional, action-verb driven, and quantified where possible. Output only the resume in markdown.",
        "hinglish": "Aap ek expert resume writer ho jo Indian students ke liye resumes banate ho. Student ki details ke basis par ek crisp, modern, ATS-friendly resume markdown me banao with sections: Summary, Skills, Education, Projects, Experience, Achievements. Language Hinglish ho par professional tone rakho. Sirf resume markdown me output karo."
    },
    "internship": {
        "en": "You are a career advisor for Indian students. Based on the student's skills, year, and interests, suggest 5 realistic internship roles. For each: role title, 2-3 target companies (mix of startups + MNCs), key skills to highlight, and one actionable tip to apply. Use a clean markdown list.",
        "hinglish": "Aap ek career advisor ho Indian students ke liye. Student ki skills, year, aur interests ke base par 5 realistic internship roles suggest karo. Har ek ke liye: role title, 2-3 target companies (startups + MNCs mix), key skills, aur ek apply karne ka practical tip. Clean Hinglish markdown me."
    },
    "project-ideas": {
        "en": "You are a senior engineer mentor. Based on the student's domain and skill level, suggest 5 unique project ideas. For each: Project name, 2-line description, tech stack, difficulty (Beginner/Intermediate/Advanced), and one standout feature that would impress recruiters. Markdown format.",
        "hinglish": "Aap ek senior engineer mentor ho. Student ke domain aur skill level ke hisaab se 5 unique project ideas suggest karo. Har ek ke liye: Project name, 2-line description, tech stack, difficulty (Beginner/Intermediate/Advanced), aur ek standout feature jo recruiters ko impress kare. Hinglish markdown me."
    },
    "study": {
        "en": "You are a patient, expert study buddy for Indian students. Explain the given topic or answer the question clearly with: a simple real-life analogy, the core concept in 3-4 points, a worked example, and one practice question. Use markdown.",
        "hinglish": "Aap ek patient, expert study buddy ho Indian students ke liye. Diye gaye topic ya question ko clearly samjhao with: ek simple desi analogy, core concept 3-4 points me, ek worked example, aur ek practice question. Hinglish markdown me."
    },
    "content-gen": {
        "en": "You are a creative copywriter for Indian small businesses. Generate compelling marketing content based on the business details provided. Include: a punchy headline, 3 tagline options, a 100-word about paragraph, and 3 value-prop bullets. Markdown format.",
        "hinglish": "Aap ek creative copywriter ho Indian small businesses ke liye. Business details ke basis par marketing content banao. Include: punchy headline, 3 tagline options, 100-word about paragraph, aur 3 value-prop bullets. Hinglish markdown me."
    },
    "social-media": {
        "en": "You are a social media strategist for Indian SMBs. Generate a week of content (7 posts) for the given business/topic. For each post: platform (Instagram/LinkedIn/X), hook, caption (with emojis), 5 hashtags. Markdown table or list.",
        "hinglish": "Aap ek social media strategist ho Indian SMBs ke liye. Diye gaye business/topic ke liye 7 din ka content plan banao. Har post me: platform (Instagram/LinkedIn/X), hook, caption (with emojis), 5 hashtags. Hinglish markdown list me."
    },
    "marketing": {
        "en": "You are a marketing automation expert. For the given business, design a simple marketing funnel: Awareness, Consideration, Conversion, Retention. For each stage: 2 tactics, 1 tool suggestion, and one sample message. Markdown format.",
        "hinglish": "Aap ek marketing automation expert ho. Given business ke liye ek simple marketing funnel design karo: Awareness, Consideration, Conversion, Retention. Har stage ke liye: 2 tactics, 1 tool suggestion, aur ek sample message. Hinglish markdown me."
    },
    "website": {
        "en": "You are an AI website architect. Based on the business idea, outline a 5-section website: Hero (headline + CTA), About, Services (3), Testimonials, Contact. For each section give exact copy text ready to use. Markdown format.",
        "hinglish": "Aap ek AI website architect ho. Business idea ke basis par 5-section website outline karo: Hero (headline + CTA), About, Services (3), Testimonials, Contact. Har section ke liye ready-to-use copy text do. Hinglish markdown me."
    },
    "chatbot-builder": {
        "en": "You are a chatbot designer. For the given business, draft a customer-support chatbot: a welcome message, 5 common FAQs with answers, 3 quick-reply buttons, and an escalation flow to a human. Markdown.",
        "hinglish": "Aap ek chatbot designer ho. Given business ke liye customer-support chatbot draft karo: welcome message, 5 common FAQs with answers, 3 quick-reply buttons, aur human escalation flow. Hinglish markdown me."
    },
}


# ---------- Models ----------
class GenerateRequest(BaseModel):
    tool: str
    language: str = "en"  # "en" | "hinglish"
    prompt: str
    session_id: Optional[str] = None


class GenerateResponse(BaseModel):
    id: str
    tool: str
    language: str
    output: str
    created_at: str


class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str
    business_context: Optional[str] = None
    language: str = "en"


class ChatResponse(BaseModel):
    session_id: str
    reply: str


class WaitlistRequest(BaseModel):
    email: EmailStr
    persona: Optional[str] = None  # "student" | "business"
    name: Optional[str] = None


class WaitlistResponse(BaseModel):
    id: str
    email: str
    created_at: str


# ---------- Helpers ----------
async def run_claude(system_message: str, user_text: str, session_id: Optional[str] = None) -> str:
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")
    sid = session_id or str(uuid.uuid4())
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=sid,
        system_message=system_message,
    ).with_model("anthropic", CLAUDE_MODEL)
    resp = await chat.send_message(UserMessage(text=user_text))
    return resp if isinstance(resp, str) else str(resp)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "TechSathi AI API", "status": "ok"}


@api_router.get("/tools")
async def list_tools():
    return {
        "student": [
            {"id": "resume", "name": "Resume Generator", "name_hi": "Resume Banao", "desc": "ATS-ready resumes in seconds"},
            {"id": "internship", "name": "Internship Finder", "name_hi": "Internship Dhundo", "desc": "Personalised role suggestions"},
            {"id": "project-ideas", "name": "Project Ideas", "name_hi": "Project Ideas", "desc": "Standout portfolio projects"},
            {"id": "study", "name": "Study Buddy", "name_hi": "Study Sathi", "desc": "Explain any topic, your way"},
        ],
        "business": [
            {"id": "website", "name": "AI Website Builder", "name_hi": "Website Banao", "desc": "5-section site copy instantly"},
            {"id": "chatbot-builder", "name": "Chatbot Builder", "name_hi": "Chatbot Banao", "desc": "Support bot with FAQs"},
            {"id": "social-media", "name": "Social Media Planner", "name_hi": "Social Plan", "desc": "7-day content calendar"},
            {"id": "marketing", "name": "Marketing Funnel", "name_hi": "Marketing Funnel", "desc": "End-to-end automation plan"},
            {"id": "content-gen", "name": "Content Generator", "name_hi": "Content Banao", "desc": "Headlines, taglines, copy"},
        ]
    }


@api_router.post("/ai/generate", response_model=GenerateResponse)
async def ai_generate(req: GenerateRequest):
    if req.tool not in SYSTEM_PROMPTS:
        raise HTTPException(status_code=400, detail=f"Unknown tool: {req.tool}")
    lang = req.language if req.language in ("en", "hinglish") else "en"
    system_msg = SYSTEM_PROMPTS[req.tool][lang]
    try:
        output = await run_claude(system_msg, req.prompt, req.session_id)
    except Exception as e:
        logger.exception("LLM generation failed")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)[:200]}")

    gen_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    await db.generations.insert_one({
        "id": gen_id,
        "tool": req.tool,
        "language": lang,
        "prompt": req.prompt,
        "output": output,
        "created_at": created_at,
    })
    return GenerateResponse(id=gen_id, tool=req.tool, language=lang, output=output, created_at=created_at)


@api_router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())
    lang = req.language if req.language in ("en", "hinglish") else "en"
    base = (
        "You are TechSathi, a friendly AI business assistant for Indian SMBs. Answer concisely, helpfully, and practically. "
        if lang == "en"
        else "Aap TechSathi ho, ek friendly AI business assistant Indian SMBs ke liye. Concise, helpful, aur practical jawab do Hinglish me. "
    )
    if req.business_context:
        base += f"\n\nBusiness context: {req.business_context}"

    try:
        reply = await run_claude(base, req.message, session_id=session_id)
    except Exception as e:
        logger.exception("Chat failed")
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)[:200]}")

    await db.chat_messages.insert_one({
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "user": req.message,
        "assistant": reply,
        "language": lang,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return ChatResponse(session_id=session_id, reply=reply)


@api_router.post("/waitlist", response_model=WaitlistResponse)
async def waitlist(req: WaitlistRequest):
    existing = await db.waitlist.find_one({"email": req.email}, {"_id": 0})
    if existing:
        return WaitlistResponse(id=existing["id"], email=existing["email"], created_at=existing["created_at"])
    doc = {
        "id": str(uuid.uuid4()),
        "email": req.email,
        "persona": req.persona,
        "name": req.name,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.waitlist.insert_one(doc)
    return WaitlistResponse(id=doc["id"], email=doc["email"], created_at=doc["created_at"])


@api_router.get("/waitlist/count")
async def waitlist_count():
    count = await db.waitlist.count_documents({})
    return {"count": count + 1247}  # bootstrap social proof


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
