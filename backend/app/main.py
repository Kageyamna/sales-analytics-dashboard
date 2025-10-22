"""
Main FastAPI application entry point
Incluye configuración CORS y rutas principales
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analytics

# Crear instancia de FastAPI con metadata
app = FastAPI(
    title="Sales Analytics API",
    description="API RESTful para dashboard de análisis de ventas",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configuración de CORS - permite requests desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(analytics.router, prefix="/api", tags=["Analytics"])

@app.get("/")
async def root():
    """
    Endpoint raíz - información de la API
    """
    return {
        "message": "Sales Analytics API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    """
    Health check endpoint para monitoreo
    """
    return {"status": "healthy", "service": "sales-analytics-api"}
