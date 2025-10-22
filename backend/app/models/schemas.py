"""
Pydantic models para validación de datos
Define la estructura de todos los objetos del API
"""
from pydantic import BaseModel, Field
from typing import List

class KPIResponse(BaseModel):
    """Modelo para respuesta de KPIs principales"""
    total_revenue: float = Field(..., description="Revenue total en USD")
    total_customers: int = Field(..., description="Número total de clientes")
    total_orders: int = Field(..., description="Número total de órdenes")
    active_users: int = Field(..., description="Usuarios activos")

class MonthlySales(BaseModel):
    """Modelo para ventas mensuales"""
    month: str = Field(..., description="Nombre del mes")
    sales: float = Field(..., description="Ventas en USD")

class CategoryData(BaseModel):
    """Modelo para distribución por categorías"""
    name: str = Field(..., description="Nombre de la categoría")
    value: float = Field(..., description="Valor de ventas")

class MonthlyRevenue(BaseModel):
    """Modelo para revenue mensual"""
    month: str = Field(..., description="Nombre del mes")
    revenue: float = Field(..., description="Revenue en USD")

class OrderData(BaseModel):
    """Modelo para datos de órdenes"""
    id: int = Field(..., description="ID de la orden")
    customer: str = Field(..., description="Nombre del cliente")
    product: str = Field(..., description="Nombre del producto")
    quantity: int = Field(..., description="Cantidad de productos")
    total: float = Field(..., description="Total de la orden en USD")
    status: str = Field(..., description="Estado de la orden")
