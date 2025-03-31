import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailsScreen from './screens/stack/ProductDetailsScreen'; 
import CheckoutScreen from './screens/stack/CheckoutScreen'; 
import AuthScreen from './screens/stack/AuthScreen';


const Stack = createStackNavigator();

const ProductsStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={AuthScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProductsStack;
