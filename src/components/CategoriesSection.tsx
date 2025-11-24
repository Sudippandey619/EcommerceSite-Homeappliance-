import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Refrigerator, 
  WashingMachine, 
  AirVent, 
  Microwave, 
  Tv, 
  Coffee,
  ChevronRight,
  Zap
} from 'lucide-react';

interface CategoriesSectionProps {
  onCategoryClick: (category: string) => void;
}

const categories = [
  {
    id: 'refrigerator',
    name: 'Refrigerators',
    icon: Refrigerator,
    description: 'Smart cooling solutions',
    productCount: 25,
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    id: 'washing-machine',
    name: 'Washing Machines',
    icon: WashingMachine,
    description: 'Advanced laundry care',
    productCount: 18,
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
  },
  {
    id: 'air-conditioner',
    name: 'Air Conditioners',
    icon: AirVent,
    description: 'Perfect climate control',
    productCount: 22,
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
  },
  {
    id: 'microwave',
    name: 'Microwaves',
    icon: Microwave,
    description: 'Quick cooking solutions',
    productCount: 15,
    gradient: 'from-orange-500 to-orange-600',
    bgGradient: 'from-orange-50 to-orange-100',
  },
  {
    id: 'television',
    name: 'Smart TVs',
    icon: Tv,
    description: 'Entertainment redefined',
    productCount: 30,
    gradient: 'from-red-500 to-red-600',
    bgGradient: 'from-red-50 to-red-100',
  },
  {
    id: 'kitchen',
    name: 'Kitchen Appliances',
    icon: Coffee,
    description: 'Modern kitchen essentials',
    productCount: 40,
    gradient: 'from-yellow-500 to-yellow-600',
    bgGradient: 'from-yellow-50 to-yellow-100',
  },
];

export function CategoriesSection({ onCategoryClick }: CategoriesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Shop by Category
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find What You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of home appliances organized by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                onClick={() => onCategoryClick(category.id)}
              >
                <CardContent className={`p-0 bg-gradient-to-br ${category.bgGradient} relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20"></div>
                  </div>

                  <div className="p-8 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {category.productCount} products available
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 group-hover:text-gray-900 p-0 h-auto hover:bg-transparent"
                      >
                        Explore Category
                      </Button>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular Categories */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Most Popular This Week</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Smart TVs', 'Refrigerators', 'Air Conditioners'].map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => onCategoryClick(category.toLowerCase().replace(' ', '-'))}
                className="rounded-full border-2 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}