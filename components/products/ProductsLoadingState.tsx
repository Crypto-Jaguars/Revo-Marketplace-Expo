import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle 
} from 'react-native';
import { useTheme } from '@/theme/theme-context';
import { ProductFilters, SortOption } from '@/store/useProductsStore';

interface ProductsLoadingStateProps {
  isInitialLoad?: boolean;
  filters?: ProductFilters;
  sortBy?: SortOption;
  containerStyle?: ViewStyle;
}

const ProductsLoadingState: React.FC<ProductsLoadingStateProps> = ({
  isInitialLoad = true,
  filters,
  sortBy,
  containerStyle,
}) => {
  const { colors } = useTheme();

  // Helper to build loading message based on filters and sort option
  const getLoadingMessage = (): string => {
    if (isInitialLoad) {
      return 'Loading products...';
    }

    let message = 'Loading';

    // Add message about search if present
    if (filters?.searchQuery) {
      message += ` results for "${filters.searchQuery}"`;
    } else {
      message += ' products';
    }

    // Add message about sort option if present
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          message += ' by lowest price';
          break;
        case 'price-desc':
          message += ' by highest price';
          break;
        case 'date-desc':
          message += ' by newest first';
          break;
        case 'popularity-desc':
          message += ' by popularity';
          break;
      }
    }

    // Add message about active filters if present
    const activeFilterCount = getActiveFilterCount();
    if (activeFilterCount > 0) {
      message += ` with ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''}`;
    }

    return message + '...';
  };

  // Helper to count active filters
  const getActiveFilterCount = (): number => {
    if (!filters) return 0;
    
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.farmingMethods.length > 0) count++;
    if (filters.onlyAvailable) count++;
    
    // Check if price range is different from default
    const isPriceRangeActive = 
      filters.priceRange.min > 0 || 
      filters.priceRange.max < 1000; // Assuming default max is 1000
    
    if (isPriceRangeActive) count++;
    
    return count;
  };

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: colors.background },
        containerStyle
      ]}
    >
      <ActivityIndicator 
        size="large" 
        color={colors.primary} 
        style={styles.indicator}
      />
      
      <Text style={[styles.message, { color: colors.text }]}>
        {getLoadingMessage()}
      </Text>
      
      {!isInitialLoad && (
        <Text style={[styles.subMessage, { color: colors.text + '60' }]}>
          This might take a moment
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  indicator: {
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProductsLoadingState;