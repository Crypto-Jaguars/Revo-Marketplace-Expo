import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (category: string, selected: boolean) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onChange,
}) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(true);
  
  // Determine screen width to calculate how many chips per row
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2; // 2 columns with padding
  
  // Toggle expansion of the filter section
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  // Check if a category is selected
  const isSelected = (category: string) => {
    return selectedCategories.includes(category);
  };
  
  // Handle category selection
  const handlePress = (category: string) => {
    onChange(category, !isSelected(category));
  };
  
  // Render each category as a chip
  const renderCategory = ({ item }: { item: string }) => {
    const selected = isSelected(item);
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryChip,
          {
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? colors.primary + '20' : colors.background,
          }
        ]}
        onPress={() => handlePress(item)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: selected }}
      >
        <Text
          style={[
            styles.categoryText,
            { color: selected ? colors.primary : colors.text }
          ]}
          numberOfLines={1}
        >
          {item}
        </Text>
        
        {selected && (
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={colors.primary}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        accessibilityRole="button"
        accessibilityLabel={`${expanded ? 'Collapse' : 'Expand'} category filter`}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Categories
        </Text>
        
        <View style={styles.expandSection}>
          {selectedCategories.length > 0 && (
            <View style={[styles.countBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.countText}>
                {selectedCategories.length}
              </Text>
            </View>
          )}
          
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.text}
          />
        </View>
      </TouchableOpacity>
      
      {expanded && (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          numColumns={2}
          contentContainerStyle={styles.categoriesContainer}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: colors.text + '60' }]}>
              No categories available
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  expandSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    paddingHorizontal: 4,
  },
  countText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingBottom: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    width: '48%',
  },
  categoryText: {
    fontSize: 14,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 16,
  },
});

export default CategoryFilter;