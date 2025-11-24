import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  User, 
  Bell, 
  LogOut,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useSeller } from '../../contexts/SellerContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface SellerLayoutProps {
  children: React.ReactNode;
}

export const SellerLayout: React.FC<SellerLayoutProps> = ({ children }) => {
  const { seller, logout } = useSeller();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const navItems = [
    { path: '/seller/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/seller/products', icon: Package, label: 'Products' },
    { path: '/seller/orders', icon: ShoppingBag, label: 'Orders', badge: 5 },
    { path: '/seller/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <Link to="/seller/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#27AE60] to-[#F2994A] flex items-center justify-center">
                <span className="text-white">H</span>
              </div>
              <div className="hidden sm:block">
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Seller Dashboard</div>
                <div className="text-xs text-gray-500">{seller?.storeName}</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="relative"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#F2994A] text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200">
              {seller?.avatar ? (
                <img src={seller.avatar} alt={seller.name} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#27AE60] to-[#F2994A] flex items-center justify-center text-white text-sm">
                  {seller?.name.charAt(0)}
                </div>
              )}
              <div className="hidden md:block">
                <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{seller?.name}</div>
                <div className="text-xs text-gray-500">{seller?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-64 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border-r z-30 lg:z-0`}
            >
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#27AE60] to-[#F2994A] text-white shadow-lg'
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge className="bg-[#F2994A]">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}

                <button
                  onClick={logout}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    darkMode
                      ? 'text-red-400 hover:bg-gray-700'
                      : 'text-red-600 hover:bg-red-50'
                  } mt-8`}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
