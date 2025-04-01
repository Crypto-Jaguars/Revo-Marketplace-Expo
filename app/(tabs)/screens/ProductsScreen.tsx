import React, { useEffect, useState, useCallback, ReactElement } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';
import useProductsStore, { ProductFilters } from '@/store/useProductsStore';
import ProductsService from '@/service/ProductsService';

// Import the actual components instead of using placeholders
import ProductGrid from '@/components/products/ProductGrid';
import ProductList from '@/components/products/ProductList';
import ProductsEmptyState from '@/components/products/ProductsEmptyState';
import ProductSearchBar from '@/components/products/ProductSearchBar';
import ProductsViewToggle from '@/components/products/ProductsViewToggle';
import ProductsSortSelector from '@/components/products/ProductsSortSelector';
import ProductsFilterButton from '@/components/products/ProductsFilterButton';
import FiltersModal from '@/components/products/filters/FiltersModal';

const ProductsScreen = () => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get state and actions from products store
  const { 
    products,
    isLoading,
    hasError,
    viewMode,
    filters,
    sortBy,
    pagination,
    hasMoreProducts,
    categories,
    farmingMethods,
    minPrice,
    maxPrice,
    setProducts,
    appendProducts,
    setCategories,
    setFarmingMethods,
    setPriceRange,
    setLoading,
    setError,
    setViewMode,
    setFilter,
    resetFilters,
    setSortBy,
    setPage,
    setHasMoreProducts,
    resetPagination
  } = useProductsStore();

  // Function to load products
  const loadProducts = useCallback(async (refresh = false) => {
    try {
      setLoading(true);
      setError(false);

      // If refreshing, reset pagination
      if (refresh) {
        resetPagination();
      }

      const currentPagination = refresh 
        ? { page: 1, limit: pagination.limit }
        : pagination;

      // Fetch products from API
      const response = await ProductsService.getProducts(
        currentPagination,
        filters,
        sortBy
      );

      // If refreshing or first page, replace products
      // Otherwise append to existing list
      if (refresh || currentPagination.page === 1) {
        setProducts(response.data);
      } else {
        appendProducts(response.data);
      }

      // Check if there are more products to load
      const currentPage = response.meta?.currentPage ?? 1;
      const totalPages = response.meta?.totalPages ?? 1;
      setHasMoreProducts(currentPage < totalPages);
    } catch (error) {
      setError(true, 'Failed to load products');
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
      if (refresh) {
        setRefreshing(false);
      }
    }
  }, [filters, sortBy, pagination]);

  // Load initial filter options (categories, farming methods, price range)
  const loadFilterOptions = useCallback(async () => {
    try {
      // Load categories
      const categories = await ProductsService.getCategories();
      setCategories(categories);

      // Load farming methods
      const farmingMethods = await ProductsService.getFarmingMethods();
      setFarmingMethods(farmingMethods);

      // Load price range
      const priceRange = await ProductsService.getPriceRange();
      setPriceRange(priceRange.min, priceRange.max);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  }, []);

  // Debounced search function
  const handleSearch = useCallback(async (text: string) => {
    setFilter('searchQuery', text);
  }, []);

  // Load more products when reaching end of list
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMoreProducts) {
      setPage(pagination.page + 1);
    }
  }, [isLoading, hasMoreProducts, pagination.page]);

  // Pull to refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadProducts(true);
  }, [loadProducts]);

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  // Handle filter apply
  const handleApplyFilters = (newFilters: ProductFilters) => {
    // Update all filters at once
    (Object.keys(newFilters) as Array<keyof ProductFilters>).forEach(key => {
      setFilter(key, newFilters[key]);
    });
  };

  // Effect to load products when filters, sorting, or pagination changes
  useEffect(() => {
    loadProducts();
  }, [filters, sortBy, pagination.page]);

  // Effect to load initial data
  useEffect(() => {
    loadFilterOptions();
    loadProducts();
  }, []);

  // Delayed search after typing stops
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText !== filters.searchQuery) {
        handleSearch(searchText);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchText]);

  // Render loading indicator component
  const renderFooterComponent = (): ReactElement | undefined => {
    if (isLoading && !refreshing) {
      return (
        <ActivityIndicator
          color={colors.primary}
          size="large"
          style={styles.loadingIndicator}
        />
      );
    }
    return undefined;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Products</Text>
        
        {/* Search bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.background }]}>
          <Ionicons name="search" size={20} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search products..."
            placeholderTextColor={colors.text + '80'}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color={colors.text} />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {/* Toolbar */}
        <View style={styles.toolbar}>
          <TouchableOpacity 
            style={styles.toolbarButton} 
            onPress={() => setShowFilters(true)}
          >
            <Ionicons name="filter" size={22} color={colors.primary} />
            <Text style={[styles.toolbarButtonText, { color: colors.primary }]}>
              Filter
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.toolbarButton} 
            onPress={toggleViewMode}
          >
            <Ionicons 
              name={viewMode === 'grid' ? 'list' : 'grid'} 
              size={22} 
              color={colors.primary} 
            />
            <Text style={[styles.toolbarButtonText, { color: colors.primary }]}>
              {viewMode === 'grid' ? 'List' : 'Grid'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.toolbarButton}
            onPress={() => {
              // Show sort options
              // This will be implemented with a modal
            }}
          >
            <Ionicons name="swap-vertical" size={22} color={colors.primary} />
            <Text style={[styles.toolbarButtonText, { color: colors.primary }]}>
              Sort
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        {products.length === 0 && !isLoading ? (
          <ProductsEmptyState 
            onReset={resetFilters}
            message="No products found"
            subMessage="Try adjusting your filters or search criteria"
          />
        ) : (
          <>
            {viewMode === 'grid' ? (
              <ProductGrid
                products={products}
                onEndReached={handleLoadMore}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[colors.primary]}
                  />
                }
                ListFooterComponent={renderFooterComponent()}
              />
            ) : (
              <ProductList
                products={products}
                onEndReached={handleLoadMore}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[colors.primary]}
                  />
                }
                ListFooterComponent={renderFooterComponent()}
              />
            )}
          </>
        )}
      </View>

      {/* Error banner */}
      {hasError && (
        <View style={[styles.errorBanner, { backgroundColor: colors.danger }]}>
          <Text style={styles.errorText}>Failed to load products. Pull to refresh.</Text>
        </View>
      )}

      {/* Filters modal */}
      <FiltersModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleApplyFilters}
        onReset={resetFilters}
        filters={filters}
        categories={categories}
        farmingMethods={farmingMethods}
        priceRange={{ min: minPrice, max: maxPrice }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  toolbarButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  gridContainer: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
  },
  loadingIndicator: {
    padding: 16,
  },
  errorBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default ProductsScreen;
