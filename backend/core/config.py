from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
from typing import List

class Settings(BaseSettings):
    """Application configuration settings."""

    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8",
        case_sensitive=True
    )

    DATABASE_URL: str
    API_PREFIX: str
    DEBUG: bool = False
    ALLOWED_ORIGINS: str ="http://localhost:3000,http://localhost:5173"

    @field_validator('ALLOWED_ORIGINS')
    def parse_allowed_origins(cls, v: str) -> List[str]:
        return [origin.strip() for origin in v.split(",")] if v else []

settings = Settings()

