import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/theme/theme-context';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'error' | 'success' | 'disabled';
  label?: string;
  errorMessage?: string;
  successMessage?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  messageStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  variant = 'default',
  label,
  errorMessage,
  successMessage,
  containerStyle,
  inputStyle,
  labelStyle,
  messageStyle,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const getBorderColor = () => {
    switch (variant) {
      case 'error':
        return colors.danger;
      case 'success':
        return colors.success;
      case 'disabled':
        return colors.gray;
      default:
        return colors.border;
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color: colors.text }, labelStyle]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          { borderColor: getBorderColor(), color: colors.text },
          inputStyle,
          style,
        ]}
        editable={variant !== 'disabled'}
        {...props}
      />
      {variant === 'error' && errorMessage && (
        <Text style={[styles.message, { color: colors.danger }, messageStyle]}>{errorMessage}</Text>
      )}
      {variant === 'success' && successMessage && (
        <Text style={[styles.message, { color: colors.success }, messageStyle]}>{successMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  message: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
