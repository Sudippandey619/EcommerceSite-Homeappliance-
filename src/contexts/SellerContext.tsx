import React, { createContext, useContext, useState, useEffect } from 'react';

interface Seller {
  id: string;
  name: string;
  email: string;
  storeName: string;
  phone: string;
  address: string;
  avatar?: string;
}

interface SellerContextType {
  seller: Seller | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Seller>) => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  storeName: string;
  phone: string;
  address: string;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

export const SellerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seller, setSeller] = useState<Seller | null>(null);

  // Load seller from localStorage on mount
  useEffect(() => {
    const savedSeller = localStorage.getItem('seller');
    if (savedSeller) {
      setSeller(JSON.parse(savedSeller));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    // For demo, accept any email/password combination
    const mockSeller: Seller = {
      id: 'seller-123',
      name: 'Rajesh Sharma',
      email: email,
      storeName: 'Sharma Electronics',
      phone: '+977 9841234567',
      address: 'Thamel, Kathmandu',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
    };
    
    setSeller(mockSeller);
    localStorage.setItem('seller', JSON.stringify(mockSeller));
    return true;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    // Mock signup
    const newSeller: Seller = {
      id: `seller-${Date.now()}`,
      name: data.name,
      email: data.email,
      storeName: data.storeName,
      phone: data.phone,
      address: data.address,
    };
    
    setSeller(newSeller);
    localStorage.setItem('seller', JSON.stringify(newSeller));
    return true;
  };

  const logout = () => {
    setSeller(null);
    localStorage.removeItem('seller');
  };

  const updateProfile = (data: Partial<Seller>) => {
    if (seller) {
      const updatedSeller = { ...seller, ...data };
      setSeller(updatedSeller);
      localStorage.setItem('seller', JSON.stringify(updatedSeller));
    }
  };

  return (
    <SellerContext.Provider
      value={{
        seller,
        isAuthenticated: !!seller,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => {
  const context = useContext(SellerContext);
  if (context === undefined) {
    throw new Error('useSeller must be used within a SellerProvider');
  }
  return context;
};
