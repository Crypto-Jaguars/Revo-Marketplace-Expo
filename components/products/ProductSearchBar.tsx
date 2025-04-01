import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';

interface ProductSearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  debounceTime?: number;
  containerStyle?: ViewStyle;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  onSearch,
  initialValue = '',
  placeholder = 'Search products...',
  debounceTime = 500,
  containerStyle,
}) => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search function
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchText);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchText, debounceTime, onSearch]);

  // Clear search text
  const handleClear = useCallback(() => {
    setSearchText('');
    onSearch('');
  }, [onSearch]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: isFocused ? colors.primary : colors.border,
        },
        containerStyle,
      ]}
    >
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? colors.primary : colors.text + '80'}
      />

      <TextInput
        style={[
          styles.input,
          { color: colors.text },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.text + '50'}
        value={searchText}
        onChangeText={setSearchText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        clearButtonMode="while-editing" // iOS only
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Android clear button (iOS uses built-in clearButtonMode) */}
      {Platform.OS === 'android' && searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={18} color={colors.text + '80'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 8,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
});

export default ProductSearchBar;