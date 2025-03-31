import React from 'react';
import { Stack } from 'expo-router';
import ProductDetailScreen from '@/components/products/ProductDetailScreen';

export default function ProductDetailRoute() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
           title: "Products"
        }} 
      />
      <ProductDetailScreen />
    </>
  );
}