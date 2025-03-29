import type React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface ProductHeaderProps {
  name: string;
  price: number;
  rating: number;
  quantity: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  name, 
  price, 
  rating,
  quantity 
}) => {
  const totalPrice = price * quantity;

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{name}</Text>
      
      <View style={styles.priceRatingContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
          {quantity > 1 && (
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceLabel}>Total: </Text>
              <Text style={styles.totalPriceValue}>${totalPrice.toFixed(2)}</Text>
            </View>
          )}
        </View>
        <View style={styles.rating}>
          <AntDesign name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57', // Forest green
  },
  totalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  totalPriceLabel: {
    fontSize: 16,
    color: '#555',
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
});

export default ProductHeader;