import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/theme-context';

interface AvailabilityFilterProps {
  onlyAvailable: boolean;
  onChange: (value: boolean) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({
  onlyAvailable,
  onChange,
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Availability
      </Text>
      
      <TouchableOpacity
        style={styles.option}
        onPress={() => onChange(!onlyAvailable)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: onlyAvailable }}
        accessibilityLabel="Show only in-stock items"
      >
        <View 
          style={[
            styles.checkbox, 
            { 
              borderColor: colors.primary,
              backgroundColor: onlyAvailable 
                ? colors.primary 
                : 'transparent'
            }
          ]}
        >
          {onlyAvailable && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
        
        <Text style={[styles.optionText, { color: colors.text }]}>
          Show only in-stock items
        </Text>
      </TouchableOpacity>
      
      <Text style={[styles.helperText, { color: colors.text + '60' }]}>
        Only show products that are currently available
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  option: {
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
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 32,
  },
});

export default AvailabilityFilter;