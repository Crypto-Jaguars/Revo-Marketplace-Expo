import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MultiStepCheckout } from './checkout';
import type { CartItem } from '../types/checkout';

const CartScreen = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Organic Apples',
      price: 2.99,
      quantity: 1,
    },
  ]);

  const handleCheckoutComplete = (orderId: string) => {
    console.log('Order completed:', orderId);
    setShowCheckout(false);
    // Navigate to success page or clear cart
  };

  if (showCheckout) {
    return (
      <MultiStepCheckout
        cartItems={cartItems}
        onClose={() => setShowCheckout(false)}
        onOrderComplete={handleCheckoutComplete}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {/* Your existing cart UI */}
      
      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={() => setShowCheckout(true)}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;