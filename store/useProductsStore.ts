import { create } from 'zustand';

// Define product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  category: string;
  farmingMethod: string;
  availableQuantity: number;
  createdAt: string;
  popularity: number;
}

// Define filter types
export interface ProductFilters {
  categories: string[];
  farmingMethods: string[];
  priceRange: {
    min: number;
    max: number;
  };
  onlyAvailable: boolean;
  searchQuery: string;
}

// Define sorting options
export type SortOption = 'price-asc' | 'price-desc' | 'date-desc' | 'popularity-desc';

// Define view mode
export type ViewMode = 'grid' | 'list';

// Define pagination parameters
export interface PaginationParams {
  page: number;
  limit: number;
}

// Define store state
interface ProductsState {
  // Data
  products: Product[];
  categories: string[];
  farmingMethods: string[];
  minPrice: number;
  maxPrice: number;
  
  // UI States
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  viewMode: ViewMode;
  
  // Filters and Sorting
  filters: ProductFilters;
  sortBy: SortOption;
  
  // Pagination
  pagination: PaginationParams;
  hasMoreProducts: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  appendProducts: (products: Product[]) => void;
  setCategories: (categories: string[]) => void;
  setFarmingMethods: (farmingMethods: string[]) => void;
  setPriceRange: (min: number, max: number) => void;
  
  setLoading: (isLoading: boolean) => void;
  setError: (hasError: boolean, message?: string) => void;
  setViewMode: (mode: ViewMode) => void;
  
  setFilter: <K extends keyof ProductFilters>(
    filterKey: K,
    value: ProductFilters[K]
  ) => void;
  resetFilters: () => void;
  setSortBy: (sortOption: SortOption) => void;
  
  setPage: (page: number) => void;
  setHasMoreProducts: (hasMore: boolean) => void;
  resetPagination: () => void;
}

// Initial filters
const defaultFilters: ProductFilters = {
  categories: [],
  farmingMethods: [],
  priceRange: {
    min: 0,
    max: 1000,
  },
  onlyAvailable: false,
  searchQuery: '',
};

// Create store with zustand
const useProductsStore = create<ProductsState>((set) => ({
  // Initial data
  products: [],
  categories: [],
  farmingMethods: [],
  minPrice: 0,
  maxPrice: 1000,
  
  // Initial UI states
  isLoading: false,
  hasError: false,
  errorMessage: '',
  viewMode: 'grid',
  
  // Initial filters and sorting
  filters: defaultFilters,
  sortBy: 'popularity-desc',
  
  // Initial pagination
  pagination: {
    page: 1,
    limit: 10,
  },
  hasMoreProducts: true,
  
  // Actions for data
  setProducts: (products) => set({ products }),
  appendProducts: (newProducts) => 
    set((state) => ({ 
      products: [...state.products, ...newProducts] 
    })),
  setCategories: (categories) => set({ categories }),
  setFarmingMethods: (farmingMethods) => set({ farmingMethods }),
  setPriceRange: (min, max) => 
    set({ 
      minPrice: min, 
      maxPrice: max,
      filters: {
        ...defaultFilters,
        priceRange: { min, max }
      }
    }),
  
  // Actions for UI states
  setLoading: (isLoading) => set({ isLoading }),
  setError: (hasError, message = '') => set({ hasError, errorMessage: message }),
  setViewMode: (viewMode) => set({ viewMode }),
  
  // Actions for filters and sorting
  setFilter: (filterKey, value) => 
    set((state) => ({
      filters: {
        ...state.filters,
        [filterKey]: value
      },
      // Reset pagination when filters change
      pagination: {
        ...state.pagination,
        page: 1
      }
    })),
  resetFilters: () => 
    set((state) => ({ 
      filters: {
        ...defaultFilters,
        priceRange: {
          min: state.minPrice,
          max: state.maxPrice
        }
      },
      // Reset pagination when filters reset
      pagination: {
        ...state.pagination,
        page: 1
      }
    })),
  setSortBy: (sortOption) => 
    set({ 
      sortBy: sortOption,
      // Reset pagination when sort changes
      pagination: {
        page: 1,
        limit: 10
      }
    }),
  
  // Actions for pagination
  setPage: (page) => 
    set((state) => ({ 
      pagination: {
        ...state.pagination,
        page
      }
    })),
  setHasMoreProducts: (hasMoreProducts) => set({ hasMoreProducts }),
  resetPagination: () => 
    set({ 
      pagination: {
        page: 1,
        limit: 10
      },
      hasMoreProducts: true
    }),
}));

export default useProductsStore;