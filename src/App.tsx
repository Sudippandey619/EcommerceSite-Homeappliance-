import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { SellerProvider, useSeller } from './contexts/SellerContext';
import { HomePage } from './components/pages/HomePage';
import { CategoryPage } from './components/pages/CategoryPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { SearchResultsPage } from './components/pages/SearchResultsPage';
import { SellerAuthPage } from './components/pages/SellerAuthPage';
import { SellerDashboardPage } from './components/pages/SellerDashboardPage';
import { SellerProductsPage } from './components/pages/SellerProductsPage';
import { SellerOrdersPage } from './components/pages/SellerOrdersPage';
import { SellerProfilePage } from './components/pages/SellerProfilePage';
import { Toaster } from './components/ui/sonner';

// Protected route component for seller pages
const ProtectedSellerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSeller();
  return isAuthenticated ? <>{children}</> : <Navigate to="/seller/auth" replace />;
};

// Component to handle Figma preview redirects
const RouteHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Redirect preview_page.html to home
    if (location.pathname === '/preview_page.html') {
      window.history.replaceState(null, '', '/');
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <SellerProvider>
          <RouteHandler />
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-tracking" element={<OrderTrackingPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              
              {/* Seller Routes */}
              <Route path="/seller/auth" element={<SellerAuthPage />} />
              <Route 
                path="/seller/dashboard" 
                element={
                  <ProtectedSellerRoute>
                    <SellerDashboardPage />
                  </ProtectedSellerRoute>
                } 
              />
              <Route 
                path="/seller/products" 
                element={
                  <ProtectedSellerRoute>
                    <SellerProductsPage />
                  </ProtectedSellerRoute>
                } 
              />
              <Route 
                path="/seller/orders" 
                element={
                  <ProtectedSellerRoute>
                    <SellerOrdersPage />
                  </ProtectedSellerRoute>
                } 
              />
              <Route 
                path="/seller/profile" 
                element={
                  <ProtectedSellerRoute>
                    <SellerProfilePage />
                  </ProtectedSellerRoute>
                } 
              />
              
              {/* Catch-all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </SellerProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
