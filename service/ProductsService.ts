import { Product, ProductFilters, SortOption, PaginationParams } from '@/store/useProductsStore';

// Mock data for development
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Kale Bunch',
    price: 3.99,
    description: 'Fresh organic kale grown with sustainable farming practices',
    image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Vegetables',
    farmingMethod: 'Organic',
    availableQuantity: 45,
    createdAt: '2025-01-15T14:30:00Z',
    popularity: 95,
  },
  {
    id: '2',
    name: 'Red Delicious Apples',
    price: 1.99,
    description: 'Sweet and crunchy apples picked at peak ripeness',
    image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Fruits',
    farmingMethod: 'Traditional',
    availableQuantity: 120,
    createdAt: '2025-01-13T09:45:00Z',
    popularity: 87,
  },
  {
    id: '3',
    name: 'Hydroponic Lettuce',
    price: 2.49,
    description: 'Crisp lettuce grown using advanced hydroponic technology',
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGV0dHVjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Vegetables',
    farmingMethod: 'Hydroponic',
    availableQuantity: 80,
    createdAt: '2025-01-20T11:15:00Z',
    popularity: 75,
  },
  {
    id: '4',
    name: 'Heirloom Tomatoes',
    price: 4.25,
    description: 'Colorful mix of heirloom tomato varieties with exceptional flavor',
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Vegetables',
    farmingMethod: 'Biodynamic',
    availableQuantity: 35,
    createdAt: '2025-01-18T15:30:00Z',
    popularity: 92,
  },
  {
    id: '5',
    name: 'Greenhouse Cucumbers',
    price: 1.75,
    description: 'Tender cucumbers grown in controlled greenhouse environments',
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VjdW1iZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Vegetables',
    farmingMethod: 'Greenhouse',
    availableQuantity: 65,
    createdAt: '2025-01-16T10:20:00Z',
    popularity: 78,
  },
  {
    id: '6',
    name: 'Wild Strawberries',
    price: 5.99,
    description: 'Sweet and aromatic wild strawberries with intense flavor',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXdiZXJyaWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    category: 'Fruits',
    farmingMethod: 'Organic',
    availableQuantity: 0,
    createdAt: '2025-01-12T08:45:00Z',
    popularity: 96,
  },
  {
    id: '7',
    name: 'Permaculture Blueberries',
    price: 6.49,
    description: 'Nutrient-rich blueberries from permaculture farming systems',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZWJlcnJpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Fruits',
    farmingMethod: 'Permaculture',
    availableQuantity: 25,
    createdAt: '2025-01-21T16:10:00Z',
    popularity: 89,
  },
  {
    id: '8',
    name: 'Organic Carrots Bundle',
    price: 2.25,
    description: 'Sweet, crunchy carrots perfect for snacking or cooking',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Vegetables',
    farmingMethod: 'Organic',
    availableQuantity: 55,
    createdAt: '2025-01-14T12:15:00Z',
    popularity: 82,
  },
  {
    id: '9',
    name: 'Biodynamic Avocados',
    price: 2.99,
    description: 'Creamy avocados grown using holistic biodynamic methods',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2Fkb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Fruits',
    farmingMethod: 'Biodynamic',
    availableQuantity: 0,
    createdAt: '2025-01-19T14:25:00Z',
    popularity: 94,
  },
  {
    id: '10',
    name: 'Traditional Sweet Potatoes',
    price: 1.45,
    description: 'Versatile sweet potatoes grown with traditional farming methods',
    image: 'https://images.unsplash.com/photo-1596289942679-1c3242867d5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dlZXQlMjBwb3RhdG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Vegetables',
    farmingMethod: 'Traditional',
    availableQuantity: 90,
    createdAt: '2025-01-17T09:30:00Z',
    popularity: 71,
  },
  {
    id: '11',
    name: 'Greenhouse Bell Peppers',
    price: 3.25,
    description: 'Colorful bell peppers with perfect texture and flavor',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVsbCUyMHBlcHBlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Vegetables',
    farmingMethod: 'Greenhouse',
    availableQuantity: 40,
    createdAt: '2025-01-22T13:00:00Z',
    popularity: 85,
  },
  {
    id: '12',
    name: 'Organic Fresh Herbs Set',
    price: 7.99,
    description: 'Assorted fresh herbs: basil, cilantro, mint, and rosemary',
    image: 'https://images.unsplash.com/photo-1558874001-eb01f14af0d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVyYnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Herbs',
    farmingMethod: 'Organic',
    availableQuantity: 20,
    createdAt: '2025-01-23T15:45:00Z',
    popularity: 88,
  },
  {
    id: '13',
    name: 'Hydroponic Spinach',
    price: 3.49,
    description: 'Nutrient-rich spinach grown in hydroponic vertical farms',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Vegetables',
    farmingMethod: 'Hydroponic',
    availableQuantity: 60,
    createdAt: '2025-01-24T10:10:00Z',
    popularity: 80,
  },
  {
    id: '14',
    name: 'Permaculture Honey Jar',
    price: 8.99,
    description: 'Pure, unfiltered honey from permaculture farm pollinators',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Specialty',
    farmingMethod: 'Permaculture',
    availableQuantity: 15,
    createdAt: '2025-01-11T11:30:00Z',
    popularity: 93,
  },
  {
    id: '15',
    name: 'Traditional Fresh Eggs',
    price: 4.75,
    description: 'Farm-fresh eggs from free-range hens',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdnc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    category: 'Dairy & Eggs',
    farmingMethod: 'Traditional',
    availableQuantity: 30,
    createdAt: '2025-01-10T08:15:00Z',
    popularity: 91,
  },
];

// Mock categories
const MOCK_CATEGORIES = [
  'Vegetables', 
  'Fruits', 
  'Herbs', 
  'Specialty', 
  'Dairy & Eggs', 
  'Grains'
];

// Mock farming methods
const MOCK_FARMING_METHODS = [
  'Organic', 
  'Traditional', 
  'Hydroponic', 
  'Greenhouse', 
  'Permaculture', 
  'Biodynamic'
];

// Interface for API responses
interface ApiResponse<T> {
  data: T;
  meta?: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}

// Products API service with mock data for development
class ProductsService {
  /**
   * Get products with pagination, filtering and sorting
   */
  async getProducts(
    pagination: PaginationParams,
    filters?: ProductFilters,
    sortBy?: SortOption
  ): Promise<ApiResponse<Product[]>> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter products based on criteria
    let filteredProducts = [...MOCK_PRODUCTS];
    
    // Apply search filter
    if (filters?.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (filters?.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Apply farming method filter
    if (filters?.farmingMethods && filters.farmingMethods.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.farmingMethods.includes(product.farmingMethod)
      );
    }
    
    // Apply price range filter
    if (filters?.priceRange) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
      );
    }
    
    // Apply availability filter
    if (filters?.onlyAvailable) {
      filteredProducts = filteredProducts.filter(product => 
        product.availableQuantity > 0
      );
    }
    
    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'date-desc':
          filteredProducts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'popularity-desc':
          filteredProducts.sort((a, b) => b.popularity - a.popularity);
          break;
      }
    }
    
    // Apply pagination
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Calculate pagination metadata
    const totalCount = filteredProducts.length;
    const totalPages = Math.ceil(totalCount / pagination.limit);
    
    return {
      data: paginatedProducts,
      meta: {
        totalCount,
        totalPages,
        currentPage: pagination.page
      }
    };
  }

  /**
   * Get all available categories
   */
  async getCategories(): Promise<string[]> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return MOCK_CATEGORIES;
  }

  /**
   * Get all available farming methods
   */
  async getFarmingMethods(): Promise<string[]> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return MOCK_FARMING_METHODS;
  }

  /**
   * Get price range (min and max prices)
   */
  async getPriceRange(): Promise<{ min: number; max: number }> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Find min and max prices from mock data
    const prices = MOCK_PRODUCTS.map(product => product.price);
    
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  /**
   * Search products (simple endpoint for quick searches)
   */
  async searchProducts(query: string): Promise<Product[]> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query) {
      return [];
    }
    
    const searchLower = query.toLowerCase();
    return MOCK_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description?.toLowerCase().includes(searchLower)
    );
  }
}

// Export as singleton
export default new ProductsService();