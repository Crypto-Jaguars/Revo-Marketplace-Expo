import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';
import { ProductFilters } from '@/store/useProductsStore';
import CategoryFilter from './CategoryFilter';
import FarmingMethodFilter from './FarmingMethodFilter';
import PriceRangeFilter from './PriceRangerFilter';

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: ProductFilters) => void;
  onReset: () => void;
  filters: ProductFilters;
  categories: string[];
  farmingMethods: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  visible,
  onClose,
  onApply,
  onReset,
  filters,
  categories,
  farmingMethods,
  priceRange,
}) => {
  const { colors } = useTheme();
  const [localFilters, setLocalFilters] = useState<ProductFilters>({ ...filters });
  
  // Update local filters when props change
  useEffect(() => {
    if (visible) {
      setLocalFilters({ ...filters });
    }
  }, [visible, filters]);
  
  // Calculate the number of active filters
  const getActiveFiltersCount = (): number => {
    let count = 0;
    
    if (localFilters.categories.length > 0) count++;
    if (localFilters.farmingMethods.length > 0) count++;
    if (localFilters.onlyAvailable) count++;
    
    // Check if price range is different from default
    const isPriceRangeActive = 
      localFilters.priceRange.min > priceRange.min || 
      localFilters.priceRange.max < priceRange.max;
    
    if (isPriceRangeActive) count++;
    
    return count;
  };
  
  // Update local filter values
  const updateFilter = <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Handle category selection/deselection
  const handleCategoryChange = (category: string, selected: boolean) => {
    if (selected) {
      updateFilter('categories', [...localFilters.categories, category]);
    } else {
      updateFilter(
        'categories',
        localFilters.categories.filter(c => c !== category)
      );
    }
  };
  
  // Handle farming method selection/deselection
  const handleFarmingMethodChange = (method: string, selected: boolean) => {
    if (selected) {
      updateFilter('farmingMethods', [...localFilters.farmingMethods, method]);
    } else {
      updateFilter(
        'farmingMethods',
        localFilters.farmingMethods.filter(m => m !== method)
      );
    }
  };
  
  // Handle price range changes
  const handlePriceRangeChange = (min: number, max: number) => {
    updateFilter('priceRange', { min, max });
  };
  
  // Handle availability toggle
  const handleAvailabilityChange = (value: boolean) => {
    updateFilter('onlyAvailable', value);
  };
  
  // Handle apply filters
  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };
  
  // Handle reset filters
  const handleReset = () => {
    const resetFilters: ProductFilters = {
      categories: [],
      farmingMethods: [],
      priceRange: { ...priceRange },
      onlyAvailable: false,
      searchQuery: localFilters.searchQuery, // Preserve search query
    };
    
    setLocalFilters(resetFilters);
    onReset();
  };
  
  const activeFiltersCount = getActiveFiltersCount();

  // If not visible, return null to prevent layout calculations
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
              accessibilityLabel="Close filters"
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
            
            <Text style={[styles.title, { color: colors.text }]}>
              Filters
            </Text>
            
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleReset}
              disabled={activeFiltersCount === 0}
              accessibilityLabel="Reset all filters"
            >
              <Text 
                style={[
                  styles.resetText, 
                  { 
                    color: activeFiltersCount > 0 
                      ? colors.primary 
                      : colors.text + '40'
                  }
                ]}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Content */}
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Categories */}
            <CategoryFilter
              categories={categories}
              selectedCategories={localFilters.categories}
              onChange={handleCategoryChange}
            />
            
            {/* Farming Methods */}
            <FarmingMethodFilter
              farmingMethods={farmingMethods}
              selectedMethods={localFilters.farmingMethods}
              onChange={handleFarmingMethodChange}
            />
            
            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Price Range
              </Text>
              <PriceRangeFilter
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
                currentMin={localFilters.priceRange.min}
                currentMax={localFilters.priceRange.max}
                onChange={handlePriceRangeChange}
              />
            </View>
            
            {/* Availability */}
            <View style={styles.filterSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Availability
              </Text>
              <TouchableOpacity
                style={styles.availabilityOption}
                onPress={() => handleAvailabilityChange(!localFilters.onlyAvailable)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: localFilters.onlyAvailable }}
              >
                <View 
                  style={[
                    styles.checkbox, 
                    { 
                      borderColor: colors.primary,
                      backgroundColor: localFilters.onlyAvailable 
                        ? colors.primary 
                        : 'transparent' 
                    }
                  ]}
                >
                  {localFilters.onlyAvailable && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
                <Text style={[styles.optionText, { color: colors.text }]}>
                  Show only in-stock items
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={[
                styles.applyButton,
                { backgroundColor: colors.primary }
              ]}
              onPress={handleApply}
              accessibilityLabel="Apply filters"
            >
              <Text style={styles.applyButtonText}>
                Apply Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  resetButton: {
    padding: 4,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  availabilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        paddingBottom: 16 + (Platform.OS === 'ios' ? 8 : 0), // Extra padding for iOS
      },
    }),
  },
  applyButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FiltersModal;