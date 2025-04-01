import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';

interface FarmingMethodFilterProps {
  farmingMethods: string[];
  selectedMethods: string[];
  onChange: (method: string, selected: boolean) => void;
}

const FarmingMethodFilter: React.FC<FarmingMethodFilterProps> = ({
  farmingMethods,
  selectedMethods,
  onChange,
}) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(true);
  
  // Toggle expansion of the filter section
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  // Check if a method is selected
  const isSelected = (method: string) => {
    return selectedMethods.includes(method);
  };
  
  // Handle method selection
  const handlePress = (method: string) => {
    onChange(method, !isSelected(method));
  };
  
  // Get appropriate icon for farming method
  const getMethodIcon = (method: string): string => {
    const methodLower = method.toLowerCase();
    
    if (methodLower.includes('organic')) return 'leaf-outline';
    if (methodLower.includes('hydroponic')) return 'water-outline';
    if (methodLower.includes('greenhouse')) return 'home-outline';
    if (methodLower.includes('traditional')) return 'sunny-outline';
    if (methodLower.includes('permaculture')) return 'flower-outline';
    if (methodLower.includes('biodynamic')) return 'moon-outline';
    
    return 'earth-outline'; // Default icon
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        accessibilityRole="button"
        accessibilityLabel={`${expanded ? 'Collapse' : 'Expand'} farming method filter`}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Farming Methods
        </Text>
        
        <View style={styles.expandSection}>
          {selectedMethods.length > 0 && (
            <View style={[styles.countBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.countText}>
                {selectedMethods.length}
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
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.methodsContainer}
        >
          {farmingMethods.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.text + '60' }]}>
              No farming methods available
            </Text>
          ) : (
            farmingMethods.map((method) => {
              const selected = isSelected(method);
              const icon = getMethodIcon(method);
              
              return (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.methodChip,
                    {
                      borderColor: selected ? colors.primary : colors.border,
                      backgroundColor: selected ? colors.primary + '20' : colors.background,
                    }
                  ]}
                  onPress={() => handlePress(method)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: selected }}
                >
                  <Ionicons
                    name={icon as any}
                    size={16}
                    color={selected ? colors.primary : colors.text}
                    style={styles.methodIcon}
                  />
                  
                  <Text
                    style={[
                      styles.methodText,
                      { color: selected ? colors.primary : colors.text }
                    ]}
                  >
                    {method}
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
            })
          )}
        </ScrollView>
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
  methodsContainer: {
    paddingBottom: 8,
    paddingRight: 16,
  },
  methodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  methodIcon: {
    marginRight: 4,
  },
  methodText: {
    fontSize: 14,
  },
  checkIcon: {
    marginLeft: 6,
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
    padding: 12,
  },
});

export default FarmingMethodFilter;