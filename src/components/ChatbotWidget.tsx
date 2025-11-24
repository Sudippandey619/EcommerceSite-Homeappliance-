import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart, formatNPR } from '../contexts/CartContext';

const chatMessages = [
  {
    id: 1,
    type: 'bot',
    message: "Namaste! I'm HappyBot 🤖 Welcome to Happier Home Nepal! How can I help you find the perfect appliance for your Kathmandu home today?",
    timestamp: new Date()
  },
  {
    id: 2,
    type: 'bot',
    message: "I can help you with:\n• Product recommendations in NPR\n• Technical specifications\n• Warranty information\n• Delivery in Kathmandu Valley\n• Budget-friendly options",
    timestamp: new Date()
  }
];

const quickReplies = [
  "Show me refrigerators",
  "What's under NPR 25,000?",
  "Kitchen appliances",
  "Best energy efficient"
];

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

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(chatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      message: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot' as const,
        message: getBotResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const recommendProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => {
      if (lowerQuery.includes("kitchen") && p.category.toLowerCase() === "kitchen") return true;
      if (lowerQuery.includes("cleaning") && p.category.toLowerCase() === "cleaning") return true;
      if (lowerQuery.includes("living") && p.category.toLowerCase() === "living room") return true;
      if (lowerQuery.includes("refrigerator") || lowerQuery.includes("fridge")) {
        return p.name.toLowerCase().includes("refrigerator");
      }
      if (lowerQuery.includes("under") || lowerQuery.includes("budget")) {
        const priceMatch = query.match(/(\d+)/);
        if (priceMatch) {
          const budget = parseInt(priceMatch[1]) * (priceMatch[1].length <= 2 ? 1000 : 1); // handle "25" as 25000
          return p.price <= budget;
        }
      }
      if (lowerQuery.includes("energy") || lowerQuery.includes("efficient")) {
        return p.features.some(f => f.toLowerCase().includes("energy"));
      }
      return false;
    });
  };

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    
    // Try product recommendations first
    const recommendations = recommendProducts(userMessage);
    if (recommendations.length > 0) {
      return `Here are some great options for you:\n\n${recommendations.map(p => 
        `🏠 ${p.name}\n💰 Price: ${formatNPR(p.price)}\n⭐ Rating: ${p.rating}/5 (${p.reviews} reviews)\n✨ Features: ${p.features.slice(0, 2).join(", ")}\n`
      ).join("\n")}Would you like me to add any of these to your cart?`;
    }
    
    if (msg.includes('refrigerator') || msg.includes('fridge')) {
      return "Great choice! Our Happier Home Smart Refrigerator is very popular in Kathmandu! It features AI temperature control, energy efficiency, and smart home integration. Price: NPR 65,999. Would you like me to add it to your cart?";
    } else if (msg.includes('sale') || msg.includes('offer') || msg.includes('discount')) {
      return "We have amazing deals right now! 🎉\n• Smart Refrigerator: Save NPR 10,000\n• AI Air Purifier: 18% off\n• Free installation in Kathmandu Valley\n• 2-year warranty on all products\n\nWhich category interests you most?";
    } else if (msg.includes('smart home') || msg.includes('smart')) {
      return "Our smart home collection includes:\n• Smart Refrigerator (NPR 65,999)\n• AI Air Purifier (NPR 16,999)\n• Smart Microwave (NPR 20,999)\n• Smart Washing Machine (NPR 41,999)\n\nAll can be controlled via our HappierHome app and work great in Nepal's climate! Which one interests you?";
    } else if (msg.includes('delivery') || msg.includes('shipping')) {
      return "🚚 Delivery Information:\n• FREE delivery in Kathmandu Valley\n• Same-day delivery available in major areas\n• Installation service included\n• Call +977-01-4567890 for other cities\n\nIs there a specific product you'd like delivered?";
    } else if (msg.includes('track') || msg.includes('order')) {
      return "I can help you track your order! Please provide your order number or registered email address, and I'll get the latest status for you. You can also call +977-01-4567890 for immediate assistance.";
    } else if (msg.includes('namaste') || msg.includes('hello') || msg.includes('hi')) {
      return "Namaste! Welcome to Happier Home Nepal! 🏠 I'm here to help you find the perfect appliances for your home in Kathmandu. What are you looking for today?";
    } else {
      return "Thanks for your message! I'm here to help you find the perfect appliances for your Nepal home. You can ask me about:\n• Product recommendations\n• Prices in NPR\n• Delivery in Kathmandu\n• Energy-efficient options\n\nOr call us at +977-01-4567890. What would you like to know?";
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1 
        }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full shadow-2xl flex items-center justify-center group perspective-1000"
          whileHover={{ 
            scale: 1.1,
            rotateY: 15,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-green-400 opacity-50 blur-lg"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Icon */}
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>

          {/* Notification badge */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-white text-xs">1</span>
          </motion.div>

          {/* Floating particles */}
          <motion.div
            className="absolute -top-1 -left-1 w-2 h-2 bg-white/60 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>

        {/* HappyBot label */}
        <motion.div
          className="absolute bottom-full right-0 mb-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-sm text-gray-700 whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          Chat with HappyBot! 🤖
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/90"></div>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-96 h-[500px] z-50"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Glassmorphism Chat Container */}
            <motion.div
              className="relative w-full h-full bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
              whileHover={{ 
                boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
              }}
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 border-b border-white/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center"
                    animate={{
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-gray-900">HappyBot</h3>
                    <p className="text-sm text-green-600">• Online</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </motion.div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 h-64 overflow-y-auto">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <motion.div
                        className={`max-w-xs px-4 py-3 rounded-2xl shadow-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                            : 'bg-white/70 backdrop-blur-sm text-gray-800 border border-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {message.type === 'bot' && (
                          <div className="flex items-center mb-2">
                            <Bot className="w-4 h-4 mr-2 text-blue-500" />
                            <span className="text-xs text-gray-500">HappyBot</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-line">{message.message}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/70 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/20">
                        <div className="flex items-center space-x-1">
                          <Bot className="w-4 h-4 text-blue-500" />
                          <div className="flex space-x-1 ml-2">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{
                                  y: [0, -8, 0],
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Replies */}
              <motion.div
                className="px-4 py-2 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1 bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-700 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Input */}
              <motion.div
                className="p-4 border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/40 backdrop-blur-sm border-white/20 rounded-full px-4 py-2 text-gray-800 placeholder-gray-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage(inputValue);
                      }
                    }}
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 p-0"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}