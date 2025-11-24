import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61569832496494&mibextid=ZbWKwL', name: 'Facebook' },
  { icon: Twitter, href: 'tiktok.com/@happierhome01', name: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/happierhome1?igsh=MTFkY2F3NGl1emYzbg==', name: 'Instagram' },
  { icon: Youtube, href: '#', name: 'YouTube' }
];

const footerLinks = {
  'Products': [
    'Kitchen Appliances',
    'Cleaning Solutions',
    'Living Room',
    'Smart Home',
    'All Products',
    'New Arrivals'
  ],
  'Support': [
    'Customer Service',
    'Installation',
    'Warranty',
    'Returns',
    'FAQ',
    'Contact Us'
  ],
  'Company': [
    'About Us',
    'Careers',
    'Press',
    'Blog',
    'Investors',
    'Sustainability'
  ]
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand & Newsletter */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-3xl mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Happier Home
            </motion.h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your home with intelligent appliances that make everyday 
              life effortless, efficient, and extraordinary. Join our community 
              of smart living enthusiasts.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-lg mb-3 text-blue-200">Stay Updated</h4>
              <div className="flex space-x-3">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 rounded-full"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSubscribe}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 rounded-full px-6"
                  >
                    {subscribed ? '✓' : <Send className="w-4 h-4" />}
                  </Button>
                </motion.div>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-300 text-sm mt-2"
                >
                  Thank you for subscribing! 🎉
                </motion.p>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 5, color: '#60A5FA' }}
              >
                <Phone className="w-5 h-5 text-blue-400" />
                <span>9841146926 / 9846089085 </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 5, color: '#60A5FA' }}
              >
                <Mail className="w-5 h-5 text-green-400" />
                <span>Happierhome7@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 5, color: '#60A5FA' }}
              >
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>koteshwor Kathmandu, Nepal 44600</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg mb-4 text-blue-200">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <motion.li key={link}>
                    <motion.a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 block"
                      whileHover={{ x: 5, color: '#FFFFFF' }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Social Icons */}
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="relative group"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                    whileHover={{
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                    }}
                  >
                    <IconComponent className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </motion.div>
                  
                  {/* Glowing effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-green-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Copyright & Links */}
          <motion.div
            className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-8 text-center lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm">
              © 2024 Happier Home. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Cookie Policy
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-8 right-8 w-2 h-2 bg-blue-400/40 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-8 left-8 w-3 h-3 bg-green-400/40 rounded-full"
          animate={{
            x: [0, 15, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </footer>
  );
}