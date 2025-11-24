import { useState, useMemo } from 'react';
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
  SlidersHorizontal,
  X,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SearchResultsPageProps {
  query: string;
  onBackToHome: () => void;
}

// All products combined for search
const allProducts = [
  // Refrigerators
  { id: 1, name: 'Samsung Double Door Refrigerator', price: 89000, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop', rating: 4.8, reviews: 124, brand: 'Samsung', category: 'Refrigerators', tags: ['cooling', 'double door', 'energy efficient'] },
  { id: 2, name: 'LG Smart Inverter Fridge', price: 95000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.7, reviews: 89, brand: 'LG', category: 'Refrigerators', tags: ['smart', 'inverter', 'energy saving'] },
  { id: 3, name: 'Whirlpool French Door Refrigerator', price: 125000, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop', rating: 4.9, reviews: 156, brand: 'Whirlpool', category: 'Refrigerators', tags: ['french door', 'premium', 'large capacity'] },

  // Washing Machines
  { id: 7, name: 'Samsung Front Load Washer', price: 55000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', rating: 4.7, reviews: 134, brand: 'Samsung', category: 'Washing Machines', tags: ['front load', 'automatic', 'energy efficient'] },
  { id: 8, name: 'LG Top Load Washing Machine', price: 42000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.5, reviews: 98, brand: 'LG', category: 'Washing Machines', tags: ['top load', 'affordable', 'reliable'] },
  { id: 10, name: 'Bosch Front Load Washer-Dryer', price: 89000, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', rating: 4.8, reviews: 112, brand: 'Bosch', category: 'Washing Machines', tags: ['washer dryer', 'premium', 'german engineering'] },

  // Air Conditioners
  { id: 13, name: 'Daikin Split AC 1.5 Ton', price: 52000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.8, reviews: 167, brand: 'Daikin', category: 'Air Conditioners', tags: ['split ac', 'cooling', 'energy efficient'] },
  { id: 15, name: 'LG Dual Inverter AC 2 Ton', price: 68000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.7, reviews: 143, brand: 'LG', category: 'Air Conditioners', tags: ['dual inverter', 'powerful cooling', 'smart'] },
  { id: 16, name: 'Samsung AR7000 Split AC', price: 45000, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop', rating: 4.6, reviews: 112, brand: 'Samsung', category: 'Air Conditioners', tags: ['split ac', 'affordable', 'reliable'] },

  // Smart TVs
  { id: 19, name: 'Samsung 55" 4K Smart TV', price: 89000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.8, reviews: 234, brand: 'Samsung', category: 'Smart TVs', tags: ['4k', 'smart tv', 'large screen'] },
  { id: 20, name: 'LG 43" OLED TV', price: 125000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.9, reviews: 187, brand: 'LG', category: 'Smart TVs', tags: ['oled', 'premium', 'perfect colors'] },
  { id: 23, name: 'Mi 32" Smart TV', price: 28000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', rating: 4.4, reviews: 198, brand: 'Xiaomi', category: 'Smart TVs', tags: ['budget', 'smart tv', 'android tv'] },

  // Microwaves
  { id: 25, name: 'Samsung 28L Convection Microwave', price: 18500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.7, reviews: 134, brand: 'Samsung', category: 'Microwaves', tags: ['convection', 'large capacity', 'versatile'] },
  { id: 26, name: 'LG 21L Solo Microwave', price: 12000, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.5, reviews: 89, brand: 'LG', category: 'Microwaves', tags: ['solo', 'compact', 'affordable'] },
  { id: 28, name: 'Panasonic 27L Convection Oven', price: 22000, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.8, reviews: 78, brand: 'Panasonic', category: 'Microwaves', tags: ['convection oven', 'premium', 'baking'] },

  // Kitchen Appliances
  { id: 31, name: 'Philips Air Fryer 4.1L', price: 15500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.8, reviews: 267, brand: 'Philips', category: 'Kitchen Appliances', tags: ['air fryer', 'healthy cooking', 'oil free'] },
  { id: 32, name: 'Preethi Mixer Grinder 3 Jar', price: 8500, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.6, reviews: 189, brand: 'Preethi', category: 'Kitchen Appliances', tags: ['mixer grinder', 'indian cooking', 'powerful motor'] },
  { id: 34, name: 'Butterfly Electric Kettle', price: 1800, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.3, reviews: 98, brand: 'Butterfly', category: 'Kitchen Appliances', tags: ['electric kettle', 'budget', 'quick boiling'] },
];

const priceRanges = [
  { label: 'Under NPR 10,000', min: 0, max: 10000 },
  { label: 'NPR 10,000 - 25,000', min: 10000, max: 25000 },
  { label: 'NPR 25,000 - 50,000', min: 25000, max: 50000 },
  { label: 'NPR 50,000 - 100,000', min: 50000, max: 100000 },
  { label: 'Above NPR 100,000', min: 100000, max: Infinity },
];

const brands = Array.from(new Set(allProducts.map(p => p.brand))).sort();
const categories = Array.from(new Set(allProducts.map(p => p.category))).sort();

export function SearchResultsPage({ query, onBackToHome }: SearchResultsPageProps) {
  const { dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState(query);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{min: number, max: number} | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = allProducts.filter(product => {
      const matchesQuery = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = !selectedPriceRange || 
        (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max);

      return matchesQuery && matchesBrand && matchesCategory && matchesPrice;
    });

    // Sort results
    return results.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviews - a.reviews;
        case 'relevance':
        default:
          // Simple relevance: exact matches first, then partial matches
          const aExact = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
          const bExact = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
          return bExact - aExact || b.reviews - a.reviews;
      }
    });
  }, [searchQuery, selectedBrands, selectedCategories, selectedPriceRange, sortBy]);

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

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedPriceRange(null);
  };

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + (selectedPriceRange ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBackToHome} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max}
                          onChange={() => setSelectedPriceRange(range)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
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
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2">{activeFiltersCount}</Badge>
                    )}
                  </Button>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
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

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                  {selectedBrands.map((brand) => (
                    <Badge key={brand} variant="secondary" className="cursor-pointer" onClick={() => toggleBrand(brand)}>
                      {brand}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="cursor-pointer" onClick={() => toggleCategory(category)}>
                      {category}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedPriceRange && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedPriceRange(null)}>
                      {priceRanges.find(r => r.min === selectedPriceRange.min)?.label}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
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
                      <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>

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

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

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
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}