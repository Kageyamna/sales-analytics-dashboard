"""
Router para endpoints de analytics
Contiene todos los endpoints para el dashboard
"""
from fastapi import APIRouter, HTTPException
from app.models.schemas import KPIResponse, MonthlySales, CategoryData, MonthlyRevenue, OrderData
from app.data.mock_data import get_kpi_data, get_monthly_sales, get_category_data, get_monthly_revenue, get_orders

router = APIRouter()

@router.get("/kpis", response_model=KPIResponse)
async def get_kpis():
    """
    Obtener KPIs principales del dashboard
    Returns: Revenue total, customers, orders, y usuarios activos
    """
    try:
        return get_kpi_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo KPIs: {str(e)}")

@router.get("/monthly-sales", response_model=list[MonthlySales])
async def get_monthly_sales_data():
    """
    Obtener datos de ventas mensuales (últimos 6 meses)
    Returns: Lista de ventas por mes
    """
    try:
        return get_monthly_sales()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo ventas mensuales: {str(e)}")

@router.get("/categories", response_model=list[CategoryData])
async def get_categories():
    """
    Obtener distribución de ventas por categorías
    Returns: Lista de categorías con sus valores
    """
    try:
        return get_category_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo categorías: {str(e)}")

@router.get("/monthly-revenue", response_model=list[MonthlyRevenue])
async def get_revenue():
    """
    Obtener revenue mensual
    Returns: Lista de revenue por mes
    """
    try:
        return get_monthly_revenue()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo revenue: {str(e)}")

@router.get("/orders", response_model=list[OrderData])
async def get_orders_data():
    """
    Obtener lista de órdenes recientes
    Returns: Lista de órdenes con detalles
    """
    try:
        return get_orders()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo órdenes: {str(e)}")
