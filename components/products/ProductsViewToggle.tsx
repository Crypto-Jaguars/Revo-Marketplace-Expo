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
import { ViewMode } from '@/store/useProductsStore';

interface ProductsViewToggleProps {
  currentView: ViewMode;
  onToggle: (mode: ViewMode) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ProductsViewToggle: React.FC<ProductsViewToggleProps> = ({
  currentView,
  onToggle,
  containerStyle,
  textStyle,
}) => {
  const { colors } = useTheme();

  return (
    <View 
      style={[
        styles.container,
        containerStyle
      ]}
    >
      <TouchableOpacity
        style={[
          styles.toggleButton,
          { 
            borderColor: colors.border,
            backgroundColor: currentView === 'grid' ? colors.primary : colors.background
          }
        ]}
        onPress={() => onToggle('grid')}
        accessibilityLabel="Grid View"
        accessibilityHint="Switch to grid view for products"
      >
        <Ionicons 
          name="grid-outline" 
          size={20} 
          color={currentView === 'grid' ? 'white' : colors.text} 
        />
        <Text 
          style={[
            styles.toggleText,
            { color: currentView === 'grid' ? 'white' : colors.text },
            currentView === 'grid' && styles.activeText,
            textStyle
          ]}
        >
          Grid
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.toggleButton,
          { 
            borderColor: colors.border,
            backgroundColor: currentView === 'list' ? colors.primary : colors.background
          }
        ]}
        onPress={() => onToggle('list')}
        accessibilityLabel="List View"
        accessibilityHint="Switch to list view for products"
      >
        <Ionicons 
          name="list-outline" 
          size={20} 
          color={currentView === 'list' ? 'white' : colors.text} 
        />
        <Text 
          style={[
            styles.toggleText,
            { color: currentView === 'list' ? 'white' : colors.text },
            currentView === 'list' && styles.activeText,
            textStyle
          ]}
        >
          List
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
  },
  // Renombrado de activeButton a activeText ya que es un estilo para el texto, no para el botón
  activeText: {
    fontWeight: '500',
  },
  toggleText: {
    marginLeft: 4,
    fontSize: 14,
  },
});

export default ProductsViewToggle;