import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart, formatNPR } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';

const products = [
  {
    id: 1,
    name: "Happier Home Smart Refrigerator",
    price: 65999,
    originalPrice: 75999,
    image: "https://images.unsplash.com/photo-1690310588533-6043216b0b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZWZyaWdlcmF0b3IlMjBraXRjaGVuJTIwYXBwbGlhbmNlfGVufDF8fHx8MTc1NTUzNzEyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Energy Efficient", "WiFi Enabled", "Smart Cooling", "Touch Display"],
    category: "Kitchen",
    rating: 4.8,
    reviews: 245,
    tag: "Best Seller",
    description: "Transform your kitchen with our smart refrigerator featuring AI temperature control and energy-efficient cooling technology."
  },
  {
    id: 2,
    name: "Happier Home Smart Washing Machine",
    price: 41999,
    originalPrice: 48999,
    image: "https://images.unsplash.com/photo-1754732693535-7ffb5e1a51d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMGxhdW5kcnklMjBhcHBsaWFuY2V8ZW58MXx8fHwxNzU1NTM3MTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["10kg Load", "Quick Wash", "Smart Sensors", "Energy Star"],
    category: "Cleaning",
    rating: 4.7,
    reviews: 189,
    tag: "Energy Star",
    description: "Intelligent washing machine with advanced sensors and eco-friendly wash cycles for perfect laundry care."
  },
  {
    id: 3,
    name: "Happier Home AI Air Purifier",
    price: 16999,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1730299788623-12cded84cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBwdXJpZmllciUyMGhvbWUlMjBhcHBsaWFuY2V8ZW58MXx8fHwxNzU1NTM3MTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["HEPA Filter", "Low Noise", "Mobile App Control", "Air Quality Monitor"],
    category: "Living Room",
    rating: 4.9,
    reviews: 312,
    tag: "New Launch",
    description: "Advanced air purification system with HEPA filtration and smart monitoring for healthier indoor air."
  },
  {
    id: 4,
    name: "Happier Home Smart Microwave Oven",
    price: 20999,
    originalPrice: 24999,
    image: "https://images.unsplash.com/photo-1608384156808-418b5c079968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3dhdmUlMjBvdmVuJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTU1MjU3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Touch Control", "Pre-set Cooking Modes", "Child Lock", "Voice Control"],
    category: "Kitchen",
    rating: 4.6,
    reviews: 156,
    tag: "Smart Home",
    description: "Voice-controlled microwave with intelligent cooking presets and child safety features."
  },
  {
    id: 5,
    name: "Happier Home Power Blender X1",
    price: 8999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGVuZGVyJTIwa2l0Y2hlbiUyMGFwcGxpYW5jZXxlbnwxfHx8fDE3NTU1MzcxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["1200W Motor", "BPA-Free", "Multiple Speeds", "Self-Cleaning"],
    category: "Kitchen",
    rating: 4.5,
    reviews: 98,
    tag: "Top Rated",
    description: "High-performance blender with powerful motor and self-cleaning technology for effortless food preparation."
  },
  {
    id: 6,
    name: "Happier Home Robot Vacuum Pro",
    price: 35999,
    originalPrice: 42999,
    image: "https://images.unsplash.com/photo-1653990480360-31a12ce9723e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWN1dW0lMjBjbGVhbmVyJTIwaG9tZXxlbnwxfHx8fDE3NTU1MzcxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Smart Navigation", "Auto-Empty", "App Control", "Multi-Surface"],
    category: "Cleaning",
    rating: 4.8,
    reviews: 167,
    tag: "Smart Clean",
    description: "Intelligent robot vacuum with advanced navigation and auto-empty technology for hands-free cleaning."
  }
];

export function FeaturedProducts() {
  const { dispatch } = useCart();

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
    toast.success(`${product.name} added to cart! 🛒`, {
      description: `Price: ${formatNPR(product.price)}`,
      duration: 3000,
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium appliances designed to transform your home
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group perspective-1000"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm transform hover:scale-105">
                {/* Product Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-green-600 text-white text-sm rounded-full shadow-lg">
                    {product.tag}
                  </span>
                </div>

                {/* Product Image */}
                <motion.div 
                  className="relative h-64 overflow-hidden"
                  whileHover={{ rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Add to Cart */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="bg-white/90 text-gray-900 hover:bg-white rounded-full p-2 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl mb-2 text-gray-900">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl text-gray-900">
                        {formatNPR(product.price)}
                      </span>
                      <span className="ml-2 text-lg text-gray-500 line-through">
                        {formatNPR(product.originalPrice)}
                      </span>
                    </div>
                    <div className="text-green-600">
                      Save {formatNPR(product.originalPrice - product.price)}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Add to Cart
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}