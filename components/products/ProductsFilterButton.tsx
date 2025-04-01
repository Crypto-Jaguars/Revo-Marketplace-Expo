import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View,
  ViewStyle,
  TextStyle 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';
import { ProductFilters } from '@/store/useProductsStore';

interface ProductsFilterButtonProps {
  filters: ProductFilters;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ProductsFilterButton: React.FC<ProductsFilterButtonProps> = ({
  filters,
  onPress,
  containerStyle,
  textStyle,
}) => {
  const { colors } = useTheme();

  // Calculate the number of active filters
  const getActiveFiltersCount = (): number => {
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

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: colors.border },
        activeFiltersCount > 0 ? { borderColor: colors.primary } : {},
        containerStyle,
      ]}
      onPress={onPress}
      accessibilityLabel="Filter products"
      accessibilityHint="Opens options to filter products by various criteria"
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name="filter-outline" 
          size={20} 
          color={activeFiltersCount > 0 ? colors.primary : colors.text} 
        />
        {activeFiltersCount > 0 && (
          <View 
            style={[
              styles.badge,
              { backgroundColor: colors.primary }
            ]}
          >
            <Text style={styles.badgeText}>
              {activeFiltersCount}
            </Text>
          </View>
        )}
      </View>
      
      <Text 
        style={[
          styles.text,
          { color: activeFiltersCount > 0 ? colors.primary : colors.text },
          textStyle
        ]}
      >
        Filter
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 8,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProductsFilterButton;