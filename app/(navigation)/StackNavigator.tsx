import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailsScreen from '../(tabs)/screens/stack/ProductDetailsScreen';
import CheckoutScreen from '../(tabs)/screens/stack/CheckoutScreen';
import AuthScreen from '../(tabs)/screens/stack/AuthScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Authentication" component={AuthScreen} />
    </Stack.Navigator>
  );
} 