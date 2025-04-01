import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';

interface ProductsEmptyStateProps {
  onReset?: () => void;
  message?: string;
  subMessage?: string;
  showResetButton?: boolean;
  resetButtonText?: string;
  icon?: string;
  containerStyle?: ViewStyle;
}

const ProductsEmptyState: React.FC<ProductsEmptyStateProps> = ({
  onReset,
  message = 'No products found',
  subMessage = 'Try adjusting your filters or search criteria',
  showResetButton = true,
  resetButtonText = 'Reset Filters',
  icon = 'leaf-outline',
  containerStyle,
}) => {
  const { colors } = useTheme();

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: colors.background },
        containerStyle
      ]}
    >
      <Ionicons 
        name={icon as any} 
        size={64} 
        color={colors.text + '40'} 
      />
      
      <Text style={[styles.message, { color: colors.text }]}>
        {message}
      </Text>
      
      <Text style={[styles.subMessage, { color: colors.text + '80' }]}>
        {subMessage}
      </Text>
      
      {showResetButton && onReset && (
        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: colors.primary }]}
          onPress={onReset}
          accessibilityLabel={resetButtonText}
          accessibilityHint="Resets all filters to show all products"
        >
          <Text style={styles.resetButtonText}>
            {resetButtonText}
          </Text>
        </TouchableOpacity>
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
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    marginHorizontal: 24,
  },
  resetButton: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ProductsEmptyState;