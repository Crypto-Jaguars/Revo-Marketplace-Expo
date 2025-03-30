import React, { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/theme/theme-context';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'blue'; 
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'full';
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  style,
  textStyle,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const getButtonStyles = () => {
    switch (variant) {
      case 'destructive':
        return { backgroundColor: colors.destructive, borderColor: colors.destructive };
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.gray };
      case 'secondary':
        return { backgroundColor: colors.secondary };
      case 'ghost':
        return { backgroundColor: 'transparent' };
      case 'link':
        return { backgroundColor: 'transparent', textDecorationLine: 'underline' };
        case 'blue': 
        return { backgroundColor: colors.blue, borderColor: colors.blue };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getTextColor = () => {
    if (variant === 'outline' || variant === 'ghost' || variant === 'link') {
      return colors.text;
    }
    return colors.white;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyles(), style]}
      {...props}
    >
      <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Button;
