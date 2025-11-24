import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Home, Store } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart } from '../contexts/CartContext';
import { Badge } from './ui/badge';
import { ShoppingCart as ShoppingCartComponent } from './ShoppingCart';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemsCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleShopClick = () => {
    if (location.pathname === '/') {
      const productsSection = document.querySelector('[data-products-section]');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const productsSection = document.querySelector('[data-products-section]');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navItems = [
    { label: 'Home', onClick: () => navigate('/'), active: location.pathname === '/' },
    { label: 'Shop', onClick: handleShopClick, active: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Happier Home</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  item.active ? 'text-blue-600 font-medium' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-r-none border-r-0"
                />
              </div>
              <Button type="submit" variant="outline" className="rounded-l-none border-l-0">
                Search
              </Button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/seller/auth')}
              title="Seller Dashboard"
            >
              <Store className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex px-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-r-none border-r-0"
                />
              </div>
              <Button type="submit" variant="outline" className="rounded-l-none border-l-0">
                Search
              </Button>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 text-gray-700 hover:text-blue-600 transition-colors ${
                    item.active ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center justify-center space-x-4 px-4 pt-4 border-t mt-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  navigate('/seller/auth');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Store className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Shopping Cart */}
      <ShoppingCartComponent 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('/checkout');
        }}
      />
    </header>
  );
}