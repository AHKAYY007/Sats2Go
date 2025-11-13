from uvicorn import run
from fastapi import FastAPI
from core.config import settings
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from app.routers import voucher
from core.session import init_db
from contextlib import asynccontextmanager


# ---- EVENT HANDLERS ---- #
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler to initialize the database on startup."""
    await init_db()
    print("Database initialized successfully....")
    yield


# ---- APPLICATION ---- #
app = FastAPI(
    title="Sats2Go API",
    description="A fastAPI backend for Sats2Go. It's  platform for an offline bitcoin voucher system.",
    version="1.0.0",
    debug=settings.DEBUG,
    lifespan=lifespan,
)

# ---- MIDDLEWARE ---- #
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=['*'],
)   


app.add_middleware(
    GZipMiddleware, 
    minimum_size=1000,
    compresslevel=5
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- ROUTES ---- #
app.include_router(voucher.router)


# ---- HEALTHCHECK & ROOT ENDPOINTS ---- #
@app.get("/")
async def read_root():
    """Root endpoint providing basic API information."""
    return {
        "message": "Sats2Go API running successfully!, sending bitcoins to the moon 🚀🌕",
        "docs": "/docs",
        "redoc": "/redoc"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok"
    }


if __name__ == "__main__":
    run(
        app, 
        host="0.0.0.0", 
        port=8000,
        reload=settings.DEBUG
    )