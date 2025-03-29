import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  image: any;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  image: any;
}

interface CartState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  
  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist actions
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  wishlist: [],
  
  // Cart actions
  addToCart: (item) => set((state) => {
    const existingItemIndex = state.cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    
    if (existingItemIndex >= 0) {
      // If item already exists, update quantity
      const updatedCart = [...state.cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      return { cart: updatedCart };
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return { cart: [...state.cart, item] };
    }
  }),
  
  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== itemId)
  })),
  
  updateQuantity: (itemId, quantity) => set((state) => {
    if (quantity <= 0) {
      return { cart: state.cart.filter((item) => item.id !== itemId) };
    }
    
    return {
      cart: state.cart.map((item) => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      )
    };
  }),
  
  clearCart: () => set({ cart: [] }),
  
  // Wishlist actions
  addToWishlist: (item) => set((state) => {
    if (state.wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      return state; // Item already in wishlist
    }
    return { wishlist: [...state.wishlist, item] };
  }),
  
  removeFromWishlist: (itemId) => set((state) => ({
    wishlist: state.wishlist.filter((item) => item.id !== itemId)
  })),
  
  isInWishlist: (itemId) => {
    return get().wishlist.some((item) => item.id === itemId);
  }
}));

export default useCartStore;