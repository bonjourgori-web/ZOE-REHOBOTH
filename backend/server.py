from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Annotated
from datetime import datetime, timezone, timedelta
import os
import logging
import bcrypt
import jwt
import uuid

# ─── DB Setup ─────────────────────────────────────────────
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ["ADMIN_EMAIL"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ─── CORS ─────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Helpers ──────────────────────────────────────────────
def hash_password(p: str) -> str:
    return bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())

def create_token(data: dict, expires_delta: timedelta) -> str:
    payload = {**data, "exp": datetime.now(timezone.utc) + expires_delta}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def doc_to_dict(doc: dict) -> dict:
    d = {k: v for k, v in doc.items() if k != "_id"}
    if "_id" in doc:
        d["id"] = str(doc["_id"])
    return d

async def get_admin(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        h = request.headers.get("Authorization", "")
        if h.startswith("Bearer "):
            token = h[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Non authentifié")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Accès refusé")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expirée")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

# ─── Startup: seed admin ───────────────────────────────────
@app.on_event("startup")
async def startup():
    existing = await db.admins.find_one({"email": ADMIN_EMAIL})
    if not existing:
        await db.admins.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        logger.info("Admin créé: %s", ADMIN_EMAIL)
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.admins.update_one(
            {"email": ADMIN_EMAIL},
            {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}}
        )
        logger.info("Admin mis à jour: %s", ADMIN_EMAIL)

    # Seed default testimonials if empty
    count = await db.testimonials.count_documents({})
    if count == 0:
        defaults = [
            {"name": "Marie-Claire K.", "location": "Abidjan, CI", "book": "Protocoles des Palais pour Percées Professionnelles", "text": "Ce livre a complètement transformé ma vision professionnelle. Après avoir appliqué les protocoles, j'ai obtenu une promotion que j'attendais depuis 2 ans. Gloire à Dieu !", "stars": 5, "approved": True, "created_at": datetime.now(timezone.utc).isoformat()},
            {"name": "Emmanuel T.", "location": "Lomé, Togo", "book": "Déclarations pour la Vie (Volume 1)", "text": "Ces déclarations ont révolutionné ma vie de prière. Chaque matin je les déclare et je vois des miracles se produire dans ma famille et mes affaires.", "stars": 5, "approved": True, "created_at": datetime.now(timezone.utc).isoformat()},
            {"name": "Ruth A.", "location": "Paris, France", "book": "La Mission d'Ambassadeur", "text": "Vogel Deza m'a aidée à comprendre ma vocation. Je sais maintenant que je suis une ambassadrice du Christ dans mon milieu professionnel. Ce livre est un trésor.", "stars": 5, "approved": True, "created_at": datetime.now(timezone.utc).isoformat()},
            {"name": "Pastor Jean-Paul N.", "location": "Abidjan, CI", "book": "Soyons Édifiés (30 Prières Quotidiennes)", "text": "J'offre ce livre à tous les membres de mon église. Les 30 prières de Vogel Deza sont profondes et transformatrices. Nous le lisons en famille chaque matin.", "stars": 5, "approved": True, "created_at": datetime.now(timezone.utc).isoformat()},
            {"name": "Esther M.", "location": "Côte d'Ivoire", "book": "Paroles de Percées pour Destinées Glorieuses", "text": "J'ai acheté ce livre pour mes enfants et ils adorent déclarer les versets chaque matin. Ma fille de 8 ans connaît déjà 15 déclarations par cœur. Lewis Ekra est un vrai don de Dieu.", "stars": 5, "approved": True, "created_at": datetime.now(timezone.utc).isoformat()},
            {"name": "David O.", "location": "Lyon, France", "book": "Protocoles des Palais pour Percées Professionnelles", "text": "En tant qu'entrepreneur chrétien, ce livre m'a donné les clés spirituelles qui manquaient à mon business. En 3 mois après la lecture, j'ai signé mon plus gros contrat.", "stars": 5, "approved": True, "created_at": datetime.now(timezone.utc).isoformat()},
        ]
        await db.testimonials.insert_many(defaults)
        logger.info("Témoignages par défaut insérés")

# ─── Models ───────────────────────────────────────────────
class LoginInput(BaseModel):
    email: str
    password: str

class TestimonialCreate(BaseModel):
    name: str
    location: str
    book: str
    text: str
    stars: int = 5
    approved: bool = True

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    book: Optional[str] = None
    text: Optional[str] = None
    stars: Optional[int] = None
    approved: Optional[bool] = None

class EventCreate(BaseModel):
    date_fr: str
    date_en: str
    title_fr: str
    title_en: str
    location: str
    description_fr: str
    description_en: str
    author: str
    upcoming: bool = True

class EventUpdate(BaseModel):
    date_fr: Optional[str] = None
    date_en: Optional[str] = None
    title_fr: Optional[str] = None
    title_en: Optional[str] = None
    location: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    author: Optional[str] = None
    upcoming: Optional[bool] = None

# ─── Auth Routes ──────────────────────────────────────────
@api_router.post("/auth/login")
async def login(data: LoginInput, response: __import__("fastapi").Response):
    admin = await db.admins.find_one({"email": data.email.lower().strip()})
    if not admin or not verify_password(data.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    token = create_token(
        {"sub": str(admin["_id"]), "email": admin["email"], "role": "admin"},
        timedelta(hours=24)
    )
    response.set_cookie(
        key="access_token", value=token,
        httponly=True, secure=False, samesite="lax", max_age=86400, path="/"
    )
    return {"token": token, "email": admin["email"], "role": "admin"}

@api_router.get("/auth/me")
async def me(admin=Depends(get_admin)):
    return {"email": admin["email"], "role": admin["role"]}

@api_router.post("/auth/logout")
async def logout(response: __import__("fastapi").Response):
    response.delete_cookie("access_token")
    return {"message": "Déconnecté"}

# ─── Public: Testimonials ─────────────────────────────────
@api_router.get("/testimonials")
async def get_testimonials():
    docs = await db.testimonials.find({"approved": True}).to_list(20)
    return [doc_to_dict(d) for d in docs]

# ─── Public: Events ───────────────────────────────────────
@api_router.get("/events")
async def get_events():
    docs = await db.events.find({}).sort("created_at", -1).to_list(20)
    return [doc_to_dict(d) for d in docs]

# ─── Admin: Testimonials ──────────────────────────────────
@api_router.get("/admin/testimonials")
async def admin_get_testimonials(admin=Depends(get_admin)):
    docs = await db.testimonials.find({}).to_list(100)
    return [doc_to_dict(d) for d in docs]

@api_router.post("/admin/testimonials")
async def admin_create_testimonial(data: TestimonialCreate, admin=Depends(get_admin)):
    doc = {**data.model_dump(), "created_at": datetime.now(timezone.utc).isoformat()}
    result = await db.testimonials.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)
    return doc

@api_router.put("/admin/testimonials/{tid}")
async def admin_update_testimonial(tid: str, data: TestimonialUpdate, admin=Depends(get_admin)):
    update = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="Aucune donnée")
    await db.testimonials.update_one({"_id": ObjectId(tid)}, {"$set": update})
    doc = await db.testimonials.find_one({"_id": ObjectId(tid)})
    return doc_to_dict(doc)

@api_router.delete("/admin/testimonials/{tid}")
async def admin_delete_testimonial(tid: str, admin=Depends(get_admin)):
    await db.testimonials.delete_one({"_id": ObjectId(tid)})
    return {"message": "Supprimé"}

# ─── Admin: Events ────────────────────────────────────────
@api_router.get("/admin/events")
async def admin_get_events(admin=Depends(get_admin)):
    docs = await db.events.find({}).to_list(100)
    return [doc_to_dict(d) for d in docs]

@api_router.post("/admin/events")
async def admin_create_event(data: EventCreate, admin=Depends(get_admin)):
    doc = {**data.model_dump(), "created_at": datetime.now(timezone.utc).isoformat()}
    result = await db.events.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)
    return doc

@api_router.put("/admin/events/{eid}")
async def admin_update_event(eid: str, data: EventUpdate, admin=Depends(get_admin)):
    update = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="Aucune donnée")
    await db.events.update_one({"_id": ObjectId(eid)}, {"$set": update})
    doc = await db.events.find_one({"_id": ObjectId(eid)})
    return doc_to_dict(doc)

@api_router.delete("/admin/events/{eid}")
async def admin_delete_event(eid: str, admin=Depends(get_admin)):
    await db.events.delete_one({"_id": ObjectId(eid)})
    return {"message": "Supprimé"}

# ─── Root ─────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "ZOE & REHOBOTH API"}

app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
