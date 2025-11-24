import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { useCart } from '../../contexts/CartContext';
import { 
  ArrowLeft, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Building2,
  Truck,
  MapPin,
  User,
  Phone,
  Mail,
  Shield,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutPageProps {
  onOrderPlaced: (order: any) => void;
  onBackToHome: () => void;
}

const paymentMethods = [
  {
    id: 'khalti',
    name: 'Khalti',
    description: 'Digital wallet payment',
    icon: Smartphone,
    color: 'from-purple-500 to-purple-600',
    popular: true,
  },
  {
    id: 'esewa',
    name: 'eSewa',
    description: 'Nepal\'s digital wallet',
    icon: Smartphone,
    color: 'from-green-500 to-green-600',
    popular: true,
  },
  {
    id: 'ime',
    name: 'IME Pay',
    description: 'Secure mobile payment',
    icon: Smartphone,
    color: 'from-blue-500 to-blue-600',
    popular: false,
  },
  {
    id: 'fonepay',
    name: 'FonePay',
    description: 'Mobile banking solution',
    icon: Smartphone,
    color: 'from-red-500 to-red-600',
    popular: false,
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Direct bank payment',
    icon: Building2,
    color: 'from-gray-500 to-gray-600',
    popular: false,
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: Banknote,
    color: 'from-orange-500 to-orange-600',
    popular: true,
  },
];

export function CheckoutPage({ onOrderPlaced, onBackToHome }: CheckoutPageProps) {
  const { state, dispatch } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('khalti');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Kathmandu',
    postalCode: '',
    notes: '',
  });

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 200; // Free delivery over NPR 5000
  const total = subtotal + deliveryFee;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'phone', 'address', 'city'];
    return required.every(field => formData[field].trim() !== '');
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const order = {
        id: `HH${Date.now()}`,
        items: state.items,
        customer: formData,
        paymentMethod: selectedPayment,
        subtotal,
        deliveryFee,
        total,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
        trackingNumber: `TRK${Date.now()}`,
        createdAt: new Date(),
      };

      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      
      toast.success('Order placed successfully!');
      onOrderPlaced(order);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your full address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Kathmandu"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="44600"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special instructions for delivery"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div key={method.id} className="relative">
                          <Label
                            htmlFor={method.id}
                            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedPayment === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center mr-3`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="font-medium text-gray-900">{method.name}</span>
                                {method.popular && (
                                  <Badge variant="secondary" className="ml-2 text-xs">Popular</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                            {selectedPayment === method.id && (
                              <CheckCircle className="w-5 h-5 text-blue-500" />
                            )}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>

                {/* Payment Info */}
                {selectedPayment === 'cod' && (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center text-orange-800">
                      <Shield className="w-5 h-5 mr-2" />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                    <p className="text-sm text-orange-700 mt-1">
                      Please keep exact change ready. Our delivery person will collect payment upon delivery.
                    </p>
                  </div>
                )}

                {['khalti', 'esewa', 'ime', 'fonepay'].includes(selectedPayment) && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center text-blue-800">
                      <Shield className="w-5 h-5 mr-2" />
                      <span className="font-medium">Digital Payment</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      You will be redirected to {paymentMethods.find(m => m.id === selectedPayment)?.name} to complete your payment securely.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
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
                  {state.items.map((item) => (
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
                    <span>NPR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `NPR ${deliveryFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {deliveryFee === 0 && (
                    <p className="text-xs text-green-600">🎉 Free delivery on orders over NPR 5,000</p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>NPR {total.toLocaleString()}</span>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || state.items.length === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 rounded-xl font-medium"
                >
                  {isProcessing ? 'Processing...' : `Place Order - NPR ${total.toLocaleString()}`}
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
                  <Shield className="w-4 h-4 mr-1" />
                  Secure checkout protected by SSL encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}