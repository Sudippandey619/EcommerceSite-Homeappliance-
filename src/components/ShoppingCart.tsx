import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useCart } from '../contexts/CartContext';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function ShoppingCart({ isOpen, onClose, onCheckout }: ShoppingCartProps) {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, selectedSize: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { id, selectedSize },
      });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, selectedSize, quantity },
      });
    }
  };

  const removeItem = (id: number, selectedSize: string | undefined) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id, selectedSize },
    });
  };

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 200;
  const total = subtotal + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shopping Cart
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="overflow-y-auto flex-1">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart Items */}
              {state.items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize || 'default'}`}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {item.name}
                    </h3>
                    {item.selectedSize && (
                      <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                    )}
                    <p className="text-lg font-bold text-gray-900">
                      NPR {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, item.selectedSize, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, item.selectedSize, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id, item.selectedSize)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Separator />

              {/* Order Summary */}
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

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>NPR {total.toLocaleString()}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 rounded-xl"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}