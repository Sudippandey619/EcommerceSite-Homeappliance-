import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    review: "The smart refrigerator has completely transformed our kitchen experience. The AI features are incredible and it's so energy efficient. Best purchase we've made this year!",
    image: "https://images.unsplash.com/photo-1666113604293-d34734339acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMGhhcHB5JTIwY3VzdG9tZXJ8ZW58MXx8fHwxNzU1NTM3MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    product: "Smart Refrigerator Pro",
    purchaseDate: "3 months ago"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi, NCR",
    rating: 5,
    review: "Outstanding quality and excellent customer service. The washing machine is whisper quiet and the smart features save so much time. Highly recommend Happier Home!",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NTUzNzMwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    product: "Smart Washing Machine",
    purchaseDate: "2 months ago"
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore, Karnataka",
    rating: 5,
    review: "The air purifier is amazing! My family has allergies and this has made such a difference. The app control is super convenient and the design is beautiful.",
    image: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1NTUyMzE2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    product: "AI Air Purifier",
    purchaseDate: "1 month ago"
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune, Maharashtra",
    rating: 5,
    review: "Exceptional build quality and innovative features. The robot vacuum has been a game changer for our busy household. Worth every rupee!",
    image: "https://images.unsplash.com/photo-1666113604293-d34734339acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMGhhcHB5JTIwY3VzdG9tZXJ8ZW58MXx8fHwxNzU1NTM3MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    product: "Robot Vacuum Pro",
    purchaseDate: "4 months ago"
  }
];

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-32 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-3 h-3 bg-green-400/30 rounded-full"
          animate={{
            scale: [2, 1, 2],
            opacity: [0.8, 0.3, 0.8],
            x: [0, 20, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their homes with our smart appliances
          </p>
        </motion.div>

        {/* Review Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -300, rotateY: -90 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Main Review Card */}
              <motion.div
                className="relative bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 backdrop-blur-sm"
                whileHover={{ 
                  y: -5,
                  rotateX: 5,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.15)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Floating Quote Icon */}
                <motion.div
                  className="absolute -top-6 left-8"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {/* Customer Photo & Info */}
                  <motion.div
                    className="text-center lg:text-left"
                    whileHover={{ z: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      className="relative inline-block mb-4"
                      whileHover={{ 
                        rotateY: 15,
                        scale: 1.05
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl ring-4 ring-white/50">
                        <ImageWithFallback
                          src={reviews[currentIndex].image}
                          alt={reviews[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Floating glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-green-400/20 blur-lg"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    
                    <h4 className="text-xl text-gray-900 mb-1">
                      {reviews[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {reviews[currentIndex].location}
                    </p>
                    <p className="text-sm text-blue-600">
                      {reviews[currentIndex].product}
                    </p>
                    <p className="text-xs text-gray-500">
                      {reviews[currentIndex].purchaseDate}
                    </p>
                  </motion.div>

                  {/* Review Content */}
                  <div className="lg:col-span-2">
                    {/* Rating */}
                    <motion.div
                      className="flex justify-center lg:justify-start mb-6"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ rotateY: -180 }}
                          animate={{ rotateY: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.1 * i 
                          }}
                        >
                          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Review Text */}
                    <motion.blockquote
                      className="text-xl text-gray-700 leading-relaxed italic mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      "{reviews[currentIndex].review}"
                    </motion.blockquote>
                  </div>
                </div>

                {/* Floating speech bubble elements */}
                <motion.div
                  className="absolute top-8 right-8 w-6 h-6 bg-blue-100/60 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-8 right-12 w-4 h-4 bg-green-100/60 rounded-full"
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>

          <motion.button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}