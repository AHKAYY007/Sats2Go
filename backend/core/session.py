from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from core.config import settings
from typing import AsyncGenerator

# - Producton
DATABASE_URL = settings.DATABASE_URL

# - Development
DATABASE_URL_DEV = settings.DATABASE_URL_DEV

# engine
engine = create_async_engine(
    DATABASE_URL, 
    echo=True
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession
)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
