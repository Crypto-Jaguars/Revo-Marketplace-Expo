import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';
import { SortOption } from '@/store/useProductsStore';

interface SortOptionItem {
  value: SortOption;
  label: string;
  icon: string;
}

const sortOptions: SortOptionItem[] = [
  { value: 'price-asc', label: 'Price: Low to High', icon: 'arrow-up-outline' },
  { value: 'price-desc', label: 'Price: High to Low', icon: 'arrow-down-outline' },
  { value: 'date-desc', label: 'Newest First', icon: 'calendar-outline' },
  { value: 'popularity-desc', label: 'Most Popular', icon: 'star-outline' },
];

interface ProductsSortSelectorProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  containerStyle?: ViewStyle;
}

const ProductsSortSelector: React.FC<ProductsSortSelectorProps> = ({
  currentSort,
  onSortChange,
  containerStyle,
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  // Find current sort option object
  const currentSortOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  const handleSelect = (option: SortOptionItem) => {
    onSortChange(option.value);
    setModalVisible(false);
  };

  const renderOption = ({ item }: { item: SortOptionItem }) => {
    const isSelected = item.value === currentSort;
    
    return (
      <TouchableOpacity
        style={[
          styles.optionItem,
          isSelected && { backgroundColor: colors.primary + '20' }
        ]}
        onPress={() => handleSelect(item)}
        accessibilityState={{ selected: isSelected }}
      >
        <Ionicons 
          name={item.icon as any} 
          size={20} 
          color={isSelected ? colors.primary : colors.text} 
        />
        
        <Text 
          style={[
            styles.optionLabel, 
            { color: isSelected ? colors.primary : colors.text }
          ]}
        >
          {item.label}
        </Text>
        
        {isSelected && (
          <Ionicons name="checkmark" size={20} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.sortButton,
          { 
            borderColor: colors.border,
            backgroundColor: colors.background
          }
        ]}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Sort products"
        accessibilityHint="Opens a menu to select sorting options"
      >
        <Ionicons name="swap-vertical" size={20} color={colors.text} />
        <Text style={[styles.sortButtonText, { color: colors.text }]}>
          Sort: {currentSortOption.label}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.text} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View 
            style={[
              styles.modalContent,
              { backgroundColor: colors.background }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Sort Products
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={sortOptions}
              renderItem={renderOption}
              keyExtractor={(item) => item.value}
              contentContainerStyle={styles.optionsList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1, // To ensure the dropdown appears above other elements
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  sortButtonText: {
    marginHorizontal: 8,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    borderRadius: 12,
    paddingVertical: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  optionsList: {
    paddingHorizontal: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },
  optionLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
});

export default ProductsSortSelector;