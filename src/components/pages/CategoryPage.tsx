import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCart } from '../../contexts/CartContext';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Grid, 
  List,
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal
} from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CategoryPageProps {
  category: string;
  onBackToHome: () => void;
}

// Extended product data for different categories
const categoryProducts = {
  'refrigerator': [
    { id: 1, name: 'Samsung Double Door Refrigerator', price: 89000, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop', rating: 4.8, reviews: 124, brand: 'Samsung', capacity: '340L', energyRating: '5 Star' },
    { id: 2, name: 'LG Smart Inverter Fridge', price: 95000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.7, reviews: 89, brand: 'LG', capacity: '360L', energyRating: '4 Star' },
    { id: 3, name: 'Whirlpool French Door Refrigerator', price: 125000, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop', rating: 4.9, reviews: 156, brand: 'Whirlpool', capacity: '450L', energyRating: '5 Star' },
    { id: 4, name: 'Haier Bottom Freezer Refrigerator', price: 75000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.5, reviews: 67, brand: 'Haier', capacity: '320L', energyRating: '3 Star' },
    { id: 5, name: 'Godrej Double Door Refrigerator', price: 65000, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop', rating: 4.4, reviews: 92, brand: 'Godrej', capacity: '290L', energyRating: '4 Star' },
    { id: 6, name: 'Panasonic Inverter Refrigerator', price: 82000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.6, reviews: 78, brand: 'Panasonic', capacity: '335L', energyRating: '5 Star' },
  ],
  'washing-machine': [
    { id: 7, name: 'Samsung Front Load Washer', price: 55000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', rating: 4.7, reviews: 134, brand: 'Samsung', capacity: '7kg', type: 'Front Load' },
    { id: 8, name: 'LG Top Load Washing Machine', price: 42000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.5, reviews: 98, brand: 'LG', capacity: '6.5kg', type: 'Top Load' },
    { id: 9, name: 'Whirlpool Semi-Automatic Washer', price: 28000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', rating: 4.3, reviews: 76, brand: 'Whirlpool', capacity: '8kg', type: 'Semi-Automatic' },
    { id: 10, name: 'Bosch Front Load Washer-Dryer', price: 89000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.8, reviews: 112, brand: 'Bosch', capacity: '7kg', type: 'Washer-Dryer' },
    { id: 11, name: 'Haier Automatic Washing Machine', price: 38000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', rating: 4.4, reviews: 85, brand: 'Haier', capacity: '6kg', type: 'Fully Automatic' },
    { id: 12, name: 'IFB Front Load Washing Machine', price: 48000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.6, reviews: 91, brand: 'IFB', capacity: '6.5kg', type: 'Front Load' },
  ],
  'air-conditioner': [
    { id: 13, name: 'Daikin Split AC 1.5 Ton', price: 52000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.8, reviews: 167, brand: 'Daikin', capacity: '1.5 Ton', type: 'Split AC' },
    { id: 14, name: 'Mitsubishi Window AC 1 Ton', price: 38000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.5, reviews: 89, brand: 'Mitsubishi', capacity: '1 Ton', type: 'Window AC' },
    { id: 15, name: 'LG Dual Inverter AC 2 Ton', price: 68000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.7, reviews: 143, brand: 'LG', capacity: '2 Ton', type: 'Split AC' },
    { id: 16, name: 'Samsung AR7000 Split AC', price: 45000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.6, reviews: 112, brand: 'Samsung', capacity: '1.5 Ton', type: 'Split AC' },
    { id: 17, name: 'Voltas Window AC 1.5 Ton', price: 35000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.3, reviews: 78, brand: 'Voltas', capacity: '1.5 Ton', type: 'Window AC' },
    { id: 18, name: 'Panasonic Inverter AC 1 Ton', price: 42000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.5, reviews: 95, brand: 'Panasonic', capacity: '1 Ton', type: 'Split AC' },
  ],
  'television': [
    { id: 19, name: 'Samsung 55" 4K Smart TV', price: 89000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.8, reviews: 234, brand: 'Samsung', size: '55"', resolution: '4K UHD' },
    { id: 20, name: 'LG 43" OLED TV', price: 125000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.9, reviews: 187, brand: 'LG', size: '43"', resolution: '4K OLED' },
    { id: 21, name: 'Sony 65" Bravia TV', price: 165000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.8, reviews: 156, brand: 'Sony', size: '65"', resolution: '4K HDR' },
    { id: 22, name: 'TCL 50" Android TV', price: 58000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.5, reviews: 123, brand: 'TCL', size: '50"', resolution: '4K UHD' },
    { id: 23, name: 'Mi 32" Smart TV', price: 28000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.4, reviews: 198, brand: 'Xiaomi', size: '32"', resolution: 'Full HD' },
    { id: 24, name: 'Panasonic 40" LED TV', price: 42000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.6, reviews: 89, brand: 'Panasonic', size: '40"', resolution: 'Full HD' },
  ],
  'microwave': [
    { id: 25, name: 'Samsung 28L Convection Microwave', price: 18500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.7, reviews: 134, brand: 'Samsung', capacity: '28L', type: 'Convection' },
    { id: 26, name: 'LG 21L Solo Microwave', price: 12000, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.5, reviews: 89, brand: 'LG', capacity: '21L', type: 'Solo' },
    { id: 27, name: 'Whirlpool 25L Grill Microwave', price: 15500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.6, reviews: 112, brand: 'Whirlpool', capacity: '25L', type: 'Grill' },
    { id: 28, name: 'Panasonic 27L Convection Oven', price: 22000, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.8, reviews: 78, brand: 'Panasonic', capacity: '27L', type: 'Convection' },
    { id: 29, name: 'IFB 20L Solo Microwave', price: 9500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.4, reviews: 95, brand: 'IFB', capacity: '20L', type: 'Solo' },
    { id: 30, name: 'Bajaj 17L Grill Microwave', price: 8500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.2, reviews: 67, brand: 'Bajaj', capacity: '17L', type: 'Grill' },
  ],
  'kitchen': [
    { id: 31, name: 'Philips Air Fryer 4.1L', price: 15500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.8, reviews: 267, brand: 'Philips', type: 'Air Fryer' },
    { id: 32, name: 'Preethi Mixer Grinder 3 Jar', price: 8500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.6, reviews: 189, brand: 'Preethi', type: 'Mixer Grinder' },
    { id: 33, name: 'Bajaj Induction Cooktop', price: 3500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.4, reviews: 145, brand: 'Bajaj', type: 'Induction Cooktop' },
    { id: 34, name: 'Butterfly Electric Kettle', price: 1800, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.3, reviews: 98, brand: 'Butterfly', type: 'Electric Kettle' },
    { id: 35, name: 'Prestige Rice Cooker 1.8L', price: 4200, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.5, reviews: 156, brand: 'Prestige', type: 'Rice Cooker' },
    { id: 36, name: 'Morphy Richards OTG 28L', price: 12500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.7, reviews: 123, brand: 'Morphy Richards', type: 'OTG' },
  ],
};

const categoryNames: { [key: string]: string } = {
  'refrigerator': 'Refrigerators',
  'washing-machine': 'Washing Machines',
  'air-conditioner': 'Air Conditioners',
  'television': 'Smart TVs',
  'microwave': 'Microwaves',
  'kitchen': 'Kitchen Appliances',
};

export function CategoryPage({ category, onBackToHome }: CategoryPageProps) {
  const { dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const products = categoryProducts[category as keyof typeof categoryProducts] || [];
  const categoryName = categoryNames[category] || category;

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.reviews - a.reviews;
      }
    });

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    });
    toast.success(`${product.name} added to cart!`);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`group hover:shadow-lg transition-all duration-300 ${
                viewMode === 'list' ? 'flex overflow-hidden' : ''
              }`}
            >
              <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                    }`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                    {product.brand}
                  </Badge>
                </div>
              </div>

              <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Product Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Product Specs */}
                  <div className="text-xs text-gray-500 space-y-1">
                    {(product as any).capacity && (
                      <p>Capacity: {(product as any).capacity}</p>
                    )}
                    {(product as any).energyRating && (
                      <p>Energy Rating: {(product as any).energyRating}</p>
                    )}
                    {(product as any).type && (
                      <p>Type: {(product as any).type}</p>
                    )}
                    {(product as any).size && (
                      <p>Size: {(product as any).size}</p>
                    )}
                    {(product as any).resolution && (
                      <p>Resolution: {(product as any).resolution}</p>
                    )}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      NPR {product.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}