"""
Mock data para el dashboard
En producción, estos datos vendrían de una base de datos real
"""
from app.models.schemas import KPIResponse, MonthlySales, CategoryData, MonthlyRevenue, OrderData
from typing import List

def get_kpi_data() -> KPIResponse:
    """Retorna datos de KPIs principales"""
    return KPIResponse(
        total_revenue=487650.00,
        total_customers=1234,
        total_orders=3567,
        active_users=892
    )

def get_monthly_sales() -> List[MonthlySales]:
    """Retorna datos de ventas mensuales (últimos 6 meses)"""
    return [
        MonthlySales(month="Mayo", sales=65000),
        MonthlySales(month="Junio", sales=72000),
        MonthlySales(month="Julio", sales=68500),
        MonthlySales(month="Agosto", sales=81200),
        MonthlySales(month="Septiembre", sales=75800),
        MonthlySales(month="Octubre", sales=89300)
    ]

def get_category_data() -> List[CategoryData]:
    """Retorna distribución de ventas por categorías"""
    return [
        CategoryData(name="Electronics", value=125000),
        CategoryData(name="Clothing", value=98000),
        CategoryData(name="Home & Garden", value=87500),
        CategoryData(name="Sports", value=76000),
        CategoryData(name="Books", value=45000)
    ]

def get_monthly_revenue() -> List[MonthlyRevenue]:
    """Retorna revenue mensual"""
    return [
        MonthlyRevenue(month="Mayo", revenue=78000),
        MonthlyRevenue(month="Junio", revenue=85000),
        MonthlyRevenue(month="Julio", revenue=79500),
        MonthlyRevenue(month="Agosto", revenue=92000),
        MonthlyRevenue(month="Septiembre", revenue=87300),
        MonthlyRevenue(month="Octubre", revenue=95800)
    ]

def get_orders() -> List[OrderData]:
    """Retorna lista de órdenes recientes"""
    return [
        OrderData(
            id=1001,
            customer="Juan Pérez",
            product="Laptop HP",
            quantity=1,
            total=1299.99,
            status="Completed"
        ),
        OrderData(
            id=1002,
            customer="María García",
            product="iPhone 15",
            quantity=2,
            total=1998.00,
            status="Pending"
        ),
        OrderData(
            id=1003,
            customer="Carlos Rodríguez",
            product="Nike Air Max",
            quantity=1,
            total=159.99,
            status="Completed"
        ),
        OrderData(
            id=1004,
            customer="Ana Martínez",
            product="Samsung TV 55\"",
            quantity=1,
            total=799.99,
            status="Processing"
        ),
        OrderData(
            id=1005,
            customer="Luis Hernández",
            product="PlayStation 5",
            quantity=1,
            total=499.99,
            status="Completed"
        ),
        OrderData(
            id=1006,
            customer="Sofia López",
            product="iPad Pro",
            quantity=1,
            total=1099.00,
            status="Pending"
        ),
        OrderData(
            id=1007,
            customer="Diego Torres",
            product="MacBook Pro",
            quantity=1,
            total=2399.00,
            status="Completed"
        ),
        OrderData(
            id=1008,
            customer="Elena Ramírez",
            product="AirPods Pro",
            quantity=3,
            total=747.00,
            status="Processing"
        )
    ]
