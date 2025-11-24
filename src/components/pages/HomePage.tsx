import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import { HeroSection } from '../HeroSection';
import { CategoriesSection } from '../CategoriesSection';
import { FeaturedProducts } from '../FeaturedProducts';
import { WhyChooseUs } from '../WhyChooseUs';
import { CustomerReviews } from '../CustomerReviews';
import { Footer } from '../Footer';
import { ChatbotWidget } from '../ChatbotWidget';

export function HomePage() {
  const navigate = useNavigate();
  const productsRef = useRef<HTMLDivElement>(null);

  const handleShopNow = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <HeroSection onShopNow={handleShopNow} />
      
      {/* Categories Section */}
      <CategoriesSection onCategoryClick={handleCategoryClick} />
      
      {/* Featured Products */}
      <div ref={productsRef}>
        <FeaturedProducts />
      </div>
      
      {/* Why Choose Us */}
      <WhyChooseUs />
      
      {/* Customer Reviews */}
      <CustomerReviews />
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
