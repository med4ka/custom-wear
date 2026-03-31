import { create } from 'zustand';

export interface CartItem {
  id: string; 
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  asset: string;
}

interface WearState {
  category: 'tops' | 'outerwear' | 'bottoms' | 'all';
  productId: string;
  color: string;
  size: 'S' | 'M' | 'L' | 'XL';
  cart: CartItem[]; 
  
  setCategory: (category: 'tops' | 'outerwear' | 'bottoms' | 'all') => void;
  setProductId: (id: string) => void;
  setColor: (color: string) => void;
  setSize: (size: 'S' | 'M' | 'L' | 'XL') => void;
  
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useWearStore = create<WearState>((set) => ({
  category: 'all',
  productId: 'tshirt1',
  color: '#F3F4F6',
  size: 'L',
  cart: [], 
  
  setCategory: (category) => set({ category }),
  setProductId: (productId) => set({ productId }),
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  
  addToCart: (item) => set((state) => ({
    cart: [...state.cart, { ...item, id: Date.now().toString() }] // Kasih ID unik dari waktu
  })),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
  clearCart: () => set({ cart: [] })
}));