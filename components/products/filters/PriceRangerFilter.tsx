import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import { useTheme } from '@/theme/theme-context';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onChange,
}) => {
  const { colors } = useTheme();
  
  // Local state for input values
  const [minValue, setMinValue] = useState(currentMin.toString());
  const [maxValue, setMaxValue] = useState(currentMax.toString());
  
  // Update local state when props change
  useEffect(() => {
    setMinValue(currentMin.toString());
    setMaxValue(currentMax.toString());
  }, [currentMin, currentMax]);
  
  // Handle min value change
  const handleMinChange = (value: string) => {
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setMinValue(value);
    }
  };
  
  // Handle max value change
  const handleMaxChange = (value: string) => {
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setMaxValue(value);
    }
  };
  
  // Apply min value changes
  const applyMinChange = () => {
    const numValue = parseInt(minValue, 10);
    
    if (isNaN(numValue)) {
      // Reset to min price if empty or invalid
      setMinValue(minPrice.toString());
      onChange(minPrice, currentMax);
    } else {
      // Ensure min is not greater than max or less than minPrice
      const validMin = Math.max(minPrice, Math.min(currentMax, numValue));
      setMinValue(validMin.toString());
      onChange(validMin, currentMax);
    }
  };
  
  // Apply max value changes
  const applyMaxChange = () => {
    const numValue = parseInt(maxValue, 10);
    
    if (isNaN(numValue)) {
      // Reset to max price if empty or invalid
      setMaxValue(maxPrice.toString());
      onChange(currentMin, maxPrice);
    } else {
      // Ensure max is not less than min or greater than maxPrice
      const validMax = Math.min(maxPrice, Math.max(currentMin, numValue));
      setMaxValue(validMax.toString());
      onChange(currentMin, validMax);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.rangeDisplay}>
        <Text style={[styles.rangeText, { color: colors.text }]}>
          Current Range: ${currentMin} - ${currentMax}
        </Text>
      </View>
      
      <View style={styles.inputsContainer}>
        <View style={styles.inputWrapper}>
          <Text style={[styles.inputLabel, { color: colors.text + '80' }]}>
            Min
          </Text>
          <View
            style={[
              styles.inputContainer,
              { borderColor: colors.border, backgroundColor: colors.background }
            ]}
          >
            <Text style={[styles.currencySymbol, { color: colors.text }]}>
              $
            </Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={minValue}
              onChangeText={handleMinChange}
              onBlur={applyMinChange}
              onSubmitEditing={applyMinChange}
              keyboardType="number-pad"
              placeholder={minPrice.toString()}
              placeholderTextColor={colors.text + '40'}
              returnKeyType="done"
              selectTextOnFocus
            />
          </View>
        </View>
        
        <View style={styles.separator}>
          <Text style={[styles.separatorText, { color: colors.text }]}>
            -
          </Text>
        </View>
        
        <View style={styles.inputWrapper}>
          <Text style={[styles.inputLabel, { color: colors.text + '80' }]}>
            Max
          </Text>
          <View
            style={[
              styles.inputContainer,
              { borderColor: colors.border, backgroundColor: colors.background }
            ]}
          >
            <Text style={[styles.currencySymbol, { color: colors.text }]}>
              $
            </Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={maxValue}
              onChangeText={handleMaxChange}
              onBlur={applyMaxChange}
              onSubmitEditing={applyMaxChange}
              keyboardType="number-pad"
              placeholder={maxPrice.toString()}
              placeholderTextColor={colors.text + '40'}
              returnKeyType="done"
              selectTextOnFocus
            />
          </View>
        </View>
      </View>
      
      <View style={styles.rangeInfo}>
        <Text style={[styles.rangeInfoText, { color: colors.text + '60' }]}>
          Price range: ${minPrice} - ${maxPrice}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  rangeDisplay: {
    marginBottom: 16,
  },
  rangeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  currencySymbol: {
    fontSize: 16,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },
  separator: {
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  separatorText: {
    fontSize: 20,
  },
  rangeInfo: {
    marginTop: 8,
  },
  rangeInfoText: {
    fontSize: 12,
  },
});

export default PriceRangeFilter;