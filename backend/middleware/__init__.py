import time
import hashlib
import logging
from collections import defaultdict
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

logger = logging.getLogger(__name__)

# ─── Rate Limiter (in-memory, per IP) ────────────────────────────
_rate_store: dict[str, list[float]] = defaultdict(list)

RATE_LIMITS = {
    "/api/quote": {"max": 5, "window": 300},
    "/api/contact": {"max": 5, "window": 300},
    "/api/recrutement": {"max": 3, "window": 600},
    "/api/track": {"max": 60, "window": 60},
    "/api/dashboard/login": {"max": 10, "window": 300},
    "/api/send-monthly-report": {"max": 2, "window": 3600},
}


def _get_client_ip(request: Request) -> str:
    # 13/11/2026 (relecture du site) : X-Real-IP d'abord. Il est posé par le nginx du serveur
    # (proxy_set_header X-Real-IP $remote_addr, bloc /api/ du site) et le visiteur ne peut pas
    # le choisir. Le premier X-Forwarded-For, lui, est écrit par le visiteur s'il le veut :
    # s'y fier laissait contourner le blocage après 5 essais du tableau d'administration et
    # la limite d'envois des formulaires en changeant d'adresse à chaque essai.
    # X-Forwarded-For ne sert plus que sans X-Real-IP (essais hors ligne, poste local).
    real_ip = request.headers.get("x-real-ip", "").strip()
    if real_ip:
        return real_ip
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _check_rate_limit(ip: str, path: str) -> bool:
    config = None
    for route, cfg in RATE_LIMITS.items():
        if path == route:
            config = cfg
            break
    if not config:
        return True

    key = f"{ip}:{path}"
    now = time.time()
    window = config["window"]
    max_req = config["max"]

    timestamps = _rate_store[key]
    _rate_store[key] = [t for t in timestamps if now - t < window]

    if len(_rate_store[key]) >= max_req:
        logger.warning(f"Rate limit exceeded: {ip} on {path} ({len(_rate_store[key])}/{max_req})")
        return False

    _rate_store[key].append(now)
    return True


# ─── Security Headers Middleware ─────────────────────────────────

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)

        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://assets.emergent.sh https://us.i.posthog.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data: https: blob:; "
            "connect-src 'self' https: wss:; "
            "frame-ancestors 'none';"
        )

        return response


# ─── Rate Limiting Middleware ────────────────────────────────────

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "POST":
            ip = _get_client_ip(request)
            path = request.url.path
            if not _check_rate_limit(ip, path):
                logger.warning(f"Blocked request from {ip} to {path} (rate limit)")
                return Response(
                    content='{"detail":"Trop de requêtes. Veuillez patienter quelques minutes."}',
                    status_code=429,
                    media_type="application/json",
                )
        return await call_next(request)


# ─── Suspicious Request Logger ───────────────────────────────────

class SuspiciousRequestLogger(BaseHTTPMiddleware):
    SUSPICIOUS_PATTERNS = [
        "../", "..\\", "<script", "javascript:", "SELECT ", "DROP ",
        "UNION ", "INSERT ", "DELETE ", "--", "/*", "*/", "eval(",
        "document.cookie", "window.location", "onload=", "onerror=",
    ]

    async def dispatch(self, request: Request, call_next):
        url = str(request.url)
        query = request.url.query or ""
        check_str = f"{url} {query}".lower()

        for pattern in self.SUSPICIOUS_PATTERNS:
            if pattern.lower() in check_str:
                ip = _get_client_ip(request)
                logger.warning(f"SUSPICIOUS REQUEST from {ip}: {request.method} {url} (matched: {pattern})")
                break

        return await call_next(request)
