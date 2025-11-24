import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  Mail,
  Star,
  MessageCircle,
  Share2
} from 'lucide-react';
import { format } from 'date-fns';

interface OrderTrackingPageProps {
  orderData: any;
  onBackToHome: () => void;
}

const trackingSteps = [
  {
    id: 'confirmed',
    title: 'Order Confirmed',
    description: 'Your order has been confirmed and is being prepared',
    icon: CheckCircle,
  },
  {
    id: 'processing',
    title: 'Processing',
    description: 'Your items are being prepared for shipment',
    icon: Package,
  },
  {
    id: 'shipped',
    title: 'Shipped',
    description: 'Your order is on its way to you',
    icon: Truck,
  },
  {
    id: 'delivered',
    title: 'Delivered',
    description: 'Your order has been delivered successfully',
    icon: CheckCircle,
  },
];

const getStatusIndex = (status: string) => {
  const statusMap: { [key: string]: number } = {
    'confirmed': 0,
    'processing': 1,
    'shipped': 2,
    'delivered': 3,
  };
  return statusMap[status] || 0;
};

export function OrderTrackingPage({ orderData, onBackToHome }: OrderTrackingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (orderData) {
      setCurrentStep(getStatusIndex(orderData.status));
      
      // Simulate status updates
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < 3) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [orderData]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Order Found</h2>
            <p className="text-gray-600 mb-6">Please place an order to view tracking information.</p>
            <Button onClick={onBackToHome}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBackToHome} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order #{orderData.id}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {trackingSteps[currentStep]?.title}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {format(new Date(orderData.estimatedDelivery), 'EEEE, MMMM dd, yyyy')}
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="space-y-6">
                  {trackingSteps.map((step, index) => {
                    const IconComponent = step.icon;
                    const status = getStepStatus(index);
                    
                    return (
                      <div key={step.id} className="flex items-start space-x-4">
                        <div className={`relative flex items-center justify-center w-12 h-12 rounded-full ${
                          status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : status === 'current'
                            ? 'bg-blue-500 text-white animate-pulse'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                          {index < trackingSteps.length - 1 && (
                            <div className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 ${
                              status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>
                        
                        <div className="flex-1 pb-8">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className={`font-semibold ${
                              status === 'completed' ? 'text-green-800' :
                              status === 'current' ? 'text-blue-800' : 'text-gray-500'
                            }`}>
                              {step.title}
                            </h3>
                            {status === 'current' && (
                              <div className="flex items-center text-blue-600">
                                <Clock className="w-4 h-4 mr-1" />
                                <span className="text-sm">In Progress</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          {status === 'completed' && (
                            <p className="text-xs text-green-600 mt-1">
                              ✓ Completed on {format(new Date(), 'MMM dd, yyyy HH:mm')}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{orderData.customer.firstName} {orderData.customer.lastName}</p>
                      <p>{orderData.customer.address}</p>
                      <p>{orderData.customer.city}, {orderData.customer.postalCode}</p>
                      <p className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {orderData.customer.phone}
                      </p>
                      {orderData.customer.email && (
                        <p className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {orderData.customer.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tracking Details</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Tracking Number: <span className="font-mono">{orderData.trackingNumber}</span></p>
                      <p>Payment Method: {orderData.paymentMethod}</p>
                      <p>Order Date: {format(new Date(orderData.createdAt), 'MMM dd, yyyy')}</p>
                      {orderData.customer.notes && (
                        <p>Notes: {orderData.customer.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share Tracking
              </Button>
              {currentStep === 3 && (
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                  <Star className="w-4 h-4 mr-2" />
                  Rate & Review
                </Button>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {orderData.items.map((item: any) => (
                    <div key={`${item.id}-${item.selectedSize || 'default'}`} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium">{item.quantity}x</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        NPR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>NPR {orderData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>
                      {orderData.deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `NPR ${orderData.deliveryFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total Paid</span>
                  <span>NPR {orderData.total.toLocaleString()}</span>
                </div>

                {/* Need Help */}
                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Contact our customer support for any questions about your order.
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}