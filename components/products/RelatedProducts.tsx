import type React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  type ImageSourcePropType,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProductThumbnail from './ProductThumbnail';

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: ImageSourcePropType;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  onSeeAll?: () => void;
  onSelectProduct: (productId: string) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  products, 
  onSeeAll,
  onSelectProduct 
}) => {
  const router = useRouter();

  if (products.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Related Products</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productsContainer}
      >
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productItem}
            onPress={() => onSelectProduct(product.id)}
            activeOpacity={0.7}
          >
            <View style={styles.productImageContainer}>
              <ProductThumbnail image={product.image} />
            </View>
            <Text style={styles.productName} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '500',
  },
  productsContainer: {
    marginTop: 12,
  },
  productItem: {
    width: 140,
    marginRight: 16,
  },
  productImageContainer: {
    width: 140,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#666666',
  },
});

export default RelatedProducts;