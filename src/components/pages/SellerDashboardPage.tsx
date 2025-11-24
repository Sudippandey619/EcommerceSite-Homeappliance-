import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  Package, 
  ShoppingBag, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  AlertCircle
} from 'lucide-react';
import { SellerLayout } from '../seller/SellerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsData = [
  {
    title: 'Total Earnings',
    value: 'NPR 2,45,670',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Total Products',
    value: '48',
    change: '+3',
    trend: 'up',
    icon: Package,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Pending Orders',
    value: '5',
    change: '-2',
    trend: 'down',
    icon: ShoppingBag,
    color: 'from-orange-500 to-amber-600',
  },
  {
    title: 'This Month Sales',
    value: 'NPR 45,230',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-600',
  },
];

const salesData = [
  { month: 'Jan', sales: 12000, orders: 45 },
  { month: 'Feb', sales: 19000, orders: 62 },
  { month: 'Mar', sales: 15000, orders: 54 },
  { month: 'Apr', sales: 22000, orders: 71 },
  { month: 'May', sales: 28000, orders: 89 },
  { month: 'Jun', sales: 24000, orders: 78 },
];

const categoryData = [
  { name: 'Refrigerators', value: 35, color: '#27AE60' },
  { name: 'Washing Machines', value: 25, color: '#F2994A' },
  { name: 'Air Conditioners', value: 20, color: '#3498DB' },
  { name: 'Microwaves', value: 12, color: '#9B59B6' },
  { name: 'Others', value: 8, color: '#95A5A6' },
];

const recentOrders = [
  {
    id: 'ORD-1234',
    customer: 'Sita Adhikari',
    product: 'LG Refrigerator 260L',
    amount: 'NPR 45,000',
    status: 'pending',
    date: '2025-10-11',
  },
  {
    id: 'ORD-1233',
    customer: 'Ram Karki',
    product: 'Samsung Washing Machine',
    amount: 'NPR 38,500',
    status: 'shipped',
    date: '2025-10-10',
  },
  {
    id: 'ORD-1232',
    customer: 'Maya Thapa',
    product: 'Panasonic Microwave',
    amount: 'NPR 12,800',
    status: 'delivered',
    date: '2025-10-09',
  },
  {
    id: 'ORD-1231',
    customer: 'Hari Shrestha',
    product: 'Daikin AC 1.5 Ton',
    amount: 'NPR 65,000',
    status: 'pending',
    date: '2025-10-09',
  },
];

const lowStockProducts = [
  { name: 'LG Refrigerator 190L', stock: 2, threshold: 5 },
  { name: 'Samsung Microwave 23L', stock: 1, threshold: 5 },
  { name: 'Haier Washing Machine 7kg', stock: 3, threshold: 5 },
];

export const SellerDashboardPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge
                      variant={stat.trend === 'up' ? 'default' : 'secondary'}
                      className={stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                    >
                      {stat.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-gray-600 text-sm mb-1">{stat.title}</div>
                  <div className="text-gray-900">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales and orders for the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#27AE60" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#27AE60" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#27AE60" fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Distribution of products by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-900">{order.id}</span>
                          <Badge
                            variant={
                              order.status === 'delivered'
                                ? 'default'
                                : order.status === 'shipped'
                                ? 'secondary'
                                : 'outline'
                            }
                            className={
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'shipped'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-orange-100 text-orange-700'
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{order.customer} • {order.product}</div>
                        <div className="text-xs text-gray-500 mt-1">{order.date}</div>
                      </div>
                      <div className="text-gray-900">{order.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Low Stock Alerts */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="shadow-lg border-0 border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Low Stock Alert
                </CardTitle>
                <CardDescription>Products running low on inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-sm text-gray-900 mb-2">{product.name}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Stock: {product.stock}</span>
                        <Badge variant="outline" className="bg-white">
                          Min: {product.threshold}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </SellerLayout>
  );
};
