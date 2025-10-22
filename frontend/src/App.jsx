import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  DollarSign, Users, ShoppingCart, Activity, 
  Search, TrendingUp 
} from 'lucide-react';

// API Base URL - cambia esto según tu entorno
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  // Estados para manejar los datos del dashboard
  const [kpiData, setKpiData] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar datos al montar el componente
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Función para obtener todos los datos del dashboard
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Realizar todas las peticiones en paralelo
      const [kpi, sales, categories, revenue, orders] = await Promise.all([
        axios.get(`${API_URL}/api/kpis`),
        axios.get(`${API_URL}/api/monthly-sales`),
        axios.get(`${API_URL}/api/categories`),
        axios.get(`${API_URL}/api/monthly-revenue`),
        axios.get(`${API_URL}/api/orders`)
      ]);

      setKpiData(kpi.data);
      setMonthlySales(sales.data);
      setCategoryData(categories.data);
      setMonthlyRevenue(revenue.data);
      setTableData(orders.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Error al cargar los datos del dashboard');
      setLoading(false);
    }
  };

  // Filtrar datos de la tabla según el término de búsqueda
  const filteredTableData = tableData.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Colores para el gráfico circular
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  // Componente para las tarjetas KPI
  const KPICard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm ml-1">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl ${color}`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          <p className="text-gray-700 mt-4 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-red-600 text-xl font-semibold">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sales Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Vista en tiempo real de tus métricas de ventas
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Revenue Total"
            value={`$${kpiData?.total_revenue?.toLocaleString()}`}
            icon={DollarSign}
            trend="+12.5%"
            color="bg-gradient-to-br from-indigo-500 to-purple-600"
          />
          <KPICard
            title="Customers"
            value={kpiData?.total_customers?.toLocaleString()}
            icon={Users}
            trend="+8.2%"
            color="bg-gradient-to-br from-purple-500 to-pink-600"
          />
          <KPICard
            title="Orders"
            value={kpiData?.total_orders?.toLocaleString()}
            icon={ShoppingCart}
            trend="+15.3%"
            color="bg-gradient-to-br from-pink-500 to-rose-600"
          />
          <KPICard
            title="Active Users"
            value={kpiData?.active_users?.toLocaleString()}
            icon={Activity}
            trend="+5.7%"
            color="bg-gradient-to-br from-orange-500 to-amber-600"
          />
        </div>

        {/* Gráfico de Líneas - Ventas Mensuales */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Ventas Mensuales (Últimos 6 Meses)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráficos: Pie Chart y Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico Circular - Distribución por Categorías */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Distribución por Categorías
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Barras - Revenue Mensual */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Revenue Mensual
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="revenue" 
                  fill="url(#colorGradient)" 
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de Datos con Búsqueda */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Órdenes Recientes
            </h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar órdenes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Producto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cantidad</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredTableData.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{order.id}</td>
                    <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-700">{order.product}</td>
                    <td className="py-3 px-4 text-gray-700">{order.quantity}</td>
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      ${order.total.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white text-sm">
            © 2025 Sales Analytics Dashboard - Desarrollado con React + FastAPI
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
