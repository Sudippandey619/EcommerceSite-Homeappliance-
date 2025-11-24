import { motion } from 'motion/react';
import { Zap, Cpu, DollarSign, Headphones } from 'lucide-react';

const benefits = [
  {
    id: 1,
    icon: Zap,
    title: "Energy Efficient",
    description: "Save up to 40% on electricity bills with our eco-friendly smart appliances",
    color: "from-green-400 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    id: 2,
    icon: Cpu,
    title: "Smart Tech",
    description: "AI-powered features that learn your habits and optimize performance automatically",
    color: "from-blue-400 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 3,
    icon: DollarSign,
    title: "Affordable Luxury",
    description: "Premium quality appliances at competitive prices with flexible payment options",
    color: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service and technical support for your peace of mind",
    color: "from-orange-400 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-green-200/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 6,
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
            Why Choose Happier Home?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to bringing you the future of home living with innovative technology, 
            sustainable solutions, and exceptional service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group perspective-1000"
              >
                <motion.div
                  className="relative h-80 p-8 rounded-3xl backdrop-blur-lg bg-white/70 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  whileHover={{ 
                    rotateY: 5,
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.85)"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Glassmorphism background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-50`} />
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)`,
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* 3D Icon */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ 
                      rotateX: 15,
                      z: 30
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      animate={{
                        rotateY: [0, 10, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      whileHover={{
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    {/* Floating glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.color} opacity-20 blur-lg`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl mb-4 text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Interactive particles */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                  <motion.div
                    className="absolute bottom-8 left-4 w-1.5 h-1.5 bg-white/40 rounded-full"
                    animate={{
                      x: [0, 15, 0],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  />

                  {/* Hover shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { number: "50K+", label: "Happy Customers" },
            { number: "99.8%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support Available" },
            { number: "2 Years", label: "Warranty" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}