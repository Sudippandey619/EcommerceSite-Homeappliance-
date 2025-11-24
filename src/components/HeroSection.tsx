import { Button } from './ui/button';
import { ChevronRight, Star, Zap, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-green-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Nepal's #1 Home Appliance Store
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Happier Home
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg">
                Discover premium home appliances with cutting-edge technology. 
                Quality guaranteed, delivered across Nepal.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Energy Efficient</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700">5 Year Warranty</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onShopNow}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-3 rounded-xl transition-all duration-300"
              >
                View Catalog
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">75+</div>
                <div className="text-sm text-gray-600">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Static Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 lg:p-12">
              {/* Product Showcase */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=200&h=200&fit=crop&crop=center"
                      alt="Washing Machine"
                      className="w-full h-32 object-cover rounded-xl mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800">Smart Washer</p>
                    <p className="text-xs text-gray-600">NPR 45,000</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop&crop=center"
                      alt="Refrigerator"
                      className="w-full h-32 object-cover rounded-xl mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800">Smart Fridge</p>
                    <p className="text-xs text-gray-600">NPR 85,000</p>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200&h=200&fit=crop&crop=center"
                      alt="Air Conditioner"
                      className="w-full h-32 object-cover rounded-xl mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800">Smart AC</p>
                    <p className="text-xs text-gray-600">NPR 35,000</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=center"
                      alt="Microwave"
                      className="w-full h-32 object-cover rounded-xl mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800">Microwave</p>
                    <p className="text-xs text-gray-600">NPR 15,000</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                Free Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}