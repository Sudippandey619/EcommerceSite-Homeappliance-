import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle, Clock, Eye } from 'lucide-react';
import { SellerLayout } from '../seller/SellerLayout';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  date: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-1234',
    customer: {
      name: 'Sita Adhikari',
      email: 'sita@example.com',
      phone: '+977 9841234567',
      address: 'Baneshwor, Kathmandu',
    },
    items: [
      { name: 'LG Refrigerator 260L', quantity: 1, price: 45000 },
    ],
    total: 45000,
    status: 'pending',
    paymentMethod: 'Khalti',
    date: '2025-10-11',
  },
  {
    id: 'ORD-1233',
    customer: {
      name: 'Ram Karki',
      email: 'ram@example.com',
      phone: '+977 9851234567',
      address: 'Lalitpur-3, Patan',
    },
    items: [
      { name: 'Samsung Washing Machine', quantity: 1, price: 38500 },
    ],
    total: 38500,
    status: 'shipped',
    paymentMethod: 'eSewa',
    date: '2025-10-10',
  },
  {
    id: 'ORD-1232',
    customer: {
      name: 'Maya Thapa',
      email: 'maya@example.com',
      phone: '+977 9861234567',
      address: 'Chabahil, Kathmandu',
    },
    items: [
      { name: 'Panasonic Microwave', quantity: 1, price: 12800 },
    ],
    total: 12800,
    status: 'delivered',
    paymentMethod: 'COD',
    date: '2025-10-09',
  },
  {
    id: 'ORD-1231',
    customer: {
      name: 'Hari Shrestha',
      email: 'hari@example.com',
      phone: '+977 9871234567',
      address: 'Bhaktapur-5',
    },
    items: [
      { name: 'Daikin AC 1.5 Ton', quantity: 1, price: 65000 },
    ],
    total: 65000,
    status: 'processing',
    paymentMethod: 'Bank Transfer',
    date: '2025-10-09',
  },
  {
    id: 'ORD-1230',
    customer: {
      name: 'Gita Maharjan',
      email: 'gita@example.com',
      phone: '+977 9881234567',
      address: 'Sundhara, Kathmandu',
    },
    items: [
      { name: 'LG Microwave 20L', quantity: 2, price: 11500 },
    ],
    total: 23000,
    status: 'pending',
    paymentMethod: 'IME Pay',
    date: '2025-10-08',
  },
];

export const SellerOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter((order) => order.status === selectedStatus);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const stats = [
    { label: 'Pending', count: orders.filter((o) => o.status === 'pending').length, color: 'from-yellow-500 to-orange-500' },
    { label: 'Processing', count: orders.filter((o) => o.status === 'processing').length, color: 'from-blue-500 to-cyan-500' },
    { label: 'Shipped', count: orders.filter((o) => o.status === 'shipped').length, color: 'from-purple-500 to-pink-500' },
    { label: 'Delivered', count: orders.filter((o) => o.status === 'delivered').length, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
                      <div className="text-gray-900">{stat.count}</div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      {getStatusIcon(stat.label.toLowerCase() as Order['status'])}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-gray-900">{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </Badge>
                        <span className="text-sm text-gray-500">{order.date}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Customer</div>
                          <div className="text-gray-900">{order.customer.name}</div>
                          <div className="text-gray-500 text-xs">{order.customer.phone}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Delivery Address</div>
                          <div className="text-gray-900">{order.customer.address}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-600 text-sm mb-1">Items</div>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-gray-900">
                            {item.name} × {item.quantity} - NPR {(item.price * item.quantity).toLocaleString()}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total: </span>
                          <span className="text-gray-900">NPR {order.total.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Payment: </span>
                          <Badge variant="outline">{order.paymentMethod}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:items-end">
                      <Select
                        value={order.status}
                        onValueChange={(value: Order['status']) =>
                          handleStatusChange(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-full lg:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button 
                        variant="outline" 
                        className="w-full lg:w-40"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                <DialogDescription>Complete order information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-900 mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-gray-600">Name:</span> {selectedOrder.customer.name}</div>
                    <div><span className="text-gray-600">Email:</span> {selectedOrder.customer.email}</div>
                    <div><span className="text-gray-600">Phone:</span> {selectedOrder.customer.phone}</div>
                    <div><span className="text-gray-600">Address:</span> {selectedOrder.customer.address}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-900 mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>{item.name} × {item.quantity}</span>
                        <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-900">Total Amount:</span>
                    <span className="text-gray-900">NPR {selectedOrder.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Payment Method:</span>
                    <Badge>{selectedOrder.paymentMethod}</Badge>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SellerLayout>
  );
};
