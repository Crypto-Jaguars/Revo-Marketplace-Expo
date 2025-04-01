/**
 * Product interface - represents a product in the marketplace
 */
export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    image: string;
    gallery?: string[];
    category: string;
    farmingMethod: string;
    availableQuantity: number;
    createdAt: string;
    updatedAt?: string;
    popularity: number;
    weight?: number;
    weightUnit?: string;
    attributes?: { [key: string]: string };
    tags?: string[];
    discount?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    rating?: number;
    reviewCount?: number;
    farmerName?: string;
    farmId?: string;
    farmLocation?: string;
    harvestDate?: string;
  }
  
  /**
   * Product filter options
   */
  export interface ProductFilters {
    categories: string[];
    farmingMethods: string[];
    priceRange: {
      min: number;
      max: number;
    };
    onlyAvailable: boolean;
    searchQuery: string;
    rating?: number;
    tags?: string[];
    farmerIds?: string[];
    harvestDateRange?: {
      start: string;
      end: string;
    };
  }
  
  /**
   * Sorting options for products
   */
  export type SortOption = 
    | 'price-asc'     // Price: Low to High
    | 'price-desc'    // Price: High to Low
    | 'date-desc'     // Newest First
    | 'popularity-desc' // Most Popular
    | 'rating-desc'   // Highest Rated
    | 'name-asc';     // Name: A to Z
  
  /**
   * View mode options
   */
  export type ViewMode = 'grid' | 'list';
  
  /**
   * Pagination parameters
   */
  export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  /**
   * API response format
   */
  export interface ApiResponse<T> {
    data: T;
    meta?: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
      limit: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    error?: {
      code: string;
      message: string;
    };
  }
  
  /**
   * Product stock status
   */
  export enum ProductStockStatus {
    IN_STOCK = 'IN_STOCK',
    LOW_STOCK = 'LOW_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
    BACK_ORDER = 'BACK_ORDER',
    PRE_ORDER = 'PRE_ORDER'
  }
  
  /**
   * Product rating
   */
  export interface ProductRating {
    average: number;
    count: number;
    distribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  }
  
  /**
   * Product category with optional subcategories
   */
  export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    subcategories?: ProductCategory[];
    productCount?: number;
  }
  
  /**
   * Farming method interface
   */
  export interface FarmingMethod {
    id: string;
    name: string;
    description?: string;
    icon?: string;
  }
  
  /**
   * Product review interface
   */
  export interface ProductReview {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title?: string;
    comment: string;
    createdAt: string;
    updatedAt?: string;
    helpfulCount?: number;
    isVerifiedPurchase?: boolean;
    images?: string[];
    replies?: ProductReviewReply[];
  }
  
  /**
   * Reply to a product review
   */
  export interface ProductReviewReply {
    id: string;
    reviewId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    isSeller?: boolean;
    comment: string;
    createdAt: string;
    updatedAt?: string;
  }